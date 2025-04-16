<template>
	<div class="p-10">
		<h1 class='font-bold text-3xl mb-10'>CRM SYSTEM</h1>
		<div v-if="isLoading">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-5 gap-16">
				<div v-for="column in data" :key="column.id">

					<div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center whitespace-nowrap">
						{{ column.name }}
					</div>
					<KanbanCreateDeal :refetch='refetch' :status='column.id' />
					<!-- Карточки сделок -->
					<Card v-for='card in column.items' :key='card.id' class="mb-3" draggable="true">
						<CardHeader role="button">
							<CardTitle>{{ card.name }}</CardTitle>

							<CardDescription class="mt-2 block">{{
								convertCurrency(card.price)
							}}</CardDescription>
						</CardHeader>
						<CardContent class="text-xs">
							{{ card.companyName }}
						</CardContent>
						<CardFooter> {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</CardFooter>
					</Card>
				</div>

			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>
import { KanbanCreateDeal } from '#components'
import dayjs from 'dayjs'
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { convertCurrency } from '~/lib/convertCurrency'

useHead({
	title: 'Home | CRM SYSTEM'
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

const { data, isLoading, refetch } = useKanbanQuery()
</script>