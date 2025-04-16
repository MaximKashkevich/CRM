<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { defineProps } from 'vue'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import { DB } from '~/lib/appwrite'

const isOpenForm = ref(false)

interface IDealFormState {
	name: string
	price: number
	status: string
	customer: {
		email: string
		name: string
	}
}

const props = defineProps({
	status: {
		type: String,
		default: '',
	},
	refetch: {
		type: Function,
	},
})

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
	initialValues: {
		status: props.status,
		name: '',
		price: 0,
		customer: {
			email: '',
			name: ''
		}
	},
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const { mutate, isPending } = useMutation({
	mutationKey: ['create a new deal'],
	mutationFn: async (data: IDealFormState) => {
		const customer = await DB.createDocument(
			DB_ID,
			'customers',
			uuid(),
			{
				name: data.customer.name,
				email: data.customer.email,
				avatar_url: 'https://cloud.appwrite.io/v1/storage...',
				from_source: 'web-app'
			}
		)

		return await DB.createDocument(
			DB_ID,
			COLLECTION_DEALS,
			uuid(),
			{
				name: data.name,
				price: Number(data.price),
				status: data.status,
				customerId: customer.$id
			}
		)
	},
	onSuccess() {
		props.refetch?.()
		handleReset()
		isOpenForm.value = false
	},
})

const onSubmit = handleSubmit(values => {
	mutate(values)
})
</script>

<template>
	<div class="text-center mb-2">
		<button class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]" @click="isOpenForm = !isOpenForm">
			<Icon v-if="isOpenForm" name="radix-icons:arrow-up" class="fade-in-100 fade-out-0" size="35" />
			<Icon v-else name="radix-icons:plus-circled" class="fade-in-100 fade-out-0" size="35" />
		</button>
	</div>
	<form v-if="isOpenForm" @submit="onSubmit" class="form">
		<Input placeholder="Наименование" v-model="name" v-bind="nameAttrs" type="text" class="input" />
		<Input placeholder="Сумма" v-model="price" v-bind="priceAttrs" type="text" class="input" />
		<Input placeholder="Email" v-model="customerEmail" v-bind="customerEmailAttrs" type="text" class="input" />
		<Input placeholder="Компания" v-model="customerName" v-bind="customerNameAttrs" type="text" class="input" />

		<button class="btn" :disabled="isPending">
			{{ isPending ? 'Загрузка...' : 'Добавить' }}
		</button>
	</form>
</template>

<style scoped>
.input {
	border-color: #161c26;
	margin-bottom: 0.5rem;
	/* mb-2 */
}

.input::placeholder {
	color: #748092;
}

.input:focus {
	border-color: var(--border-color);
	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
}

.btn {
	font-size: 0.75rem;
	/* text-xs */
	border: 1px solid #161c26;
	padding: 0.25rem 0.5rem;
	/* py-1 px-2 */
	border-radius: 0.25rem;
	/* rounded */
	color: #aebed5;
	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
}

.btn:hover {
	border-color: #482c65;
	color: white;
}

.form {
	margin-bottom: 0.75rem;
	/* mb-3 */
	display: block;
	animation: show 0.3s ease-in-out;
}

@keyframes show {
	from {
		border-color: rgba(162, 82, 200, 0.24);
		/* #a252c83d */
		transform: translateY(-35px);
		opacity: 0.4;
	}

	90% {
		border-color: rgba(162, 82, 200, 0.24);
		/* #a252c83d */
	}

	to {
		border-color: transparent;
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
