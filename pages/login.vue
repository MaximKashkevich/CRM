<template>
	<div class="flex items-center justify-center min-h-screen w-full">
		<div class="rounded bg-sidebar w-1/4 p-5">
			<h1 class="text-2xl font-bold text-center mb-5">Login</h1>

			<form>
				<Input placeholder='Email' type='email' class='mb-3' v-model='form.emailRef' />

				<Input placeholder='Password' type='password' class='mb-3' v-model='form.passwordRef' />

				<Input placeholder='Name' type='text' class='mb-3' v-model='form.nameRef' />

				<div class="flex items-center justify-center gap-5">
					<Button type="button">Login</Button>
					<Button type="button">Register</Button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang='ts' setup>
import { v7 as uuid } from 'uuid'
import { account } from '~/lib/appwrite'
import { useAuthStore, useIsLoading } from '~/store/auth.store'


useHead({
	title: 'Login | CRM SYSTEM'
})

const isLoadingStore = useIsLoading()
const authStore = useAuthStore()

const form = ref({
	emailRef: '',
	passwordRef: '',
	nameRef: ''
})

const router = useRouter()

const login = async () => {
	try {
		isLoadingStore.set(true)
		await account.createEmailPasswordSession(form.value.emailRef, form.value.passwordRef)

		const response = await account.get()
		if (authStore) {
			authStore.set({
				status: response.status,
				name: response.name,
				email: response.email
			})
		}
		await router.push('/')
	} catch (error) {
		console.log(`Error login ${error}`)
		isLoadingStore.set(false)
	} finally {
		isLoadingStore.set(false)
	}
}

const register = async () => {
	try {
		isLoadingStore.set(true)

		await account.create(uuid(), form.value.emailRef, form.value.passwordRef, form.value.nameRef)
		const response = account.get()

		if (response) {
			if (authStore) {
				authStore.set({
					status: response.status,
					name: response.name,
					email: response.email
				})
			}
		}
		await router.push('/')
	} catch (error) {
		console.log(`error register ${error}`)
		isLoadingStore.set(false)
	} finally {
		isLoadingStore.set(false)
	}
}
</script>