<template>
	<div class="p-10">
		<h1 class="font-bold text-2xl mb-10">CRM System </h1>
		<div v-if="isLoading">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-5 gap-16">
				<div v-for="(column, index) in data" :key="column.id" class="min-h-screen">
					<div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
						{{ column.name }}
					</div>
					<div>
						<KanbanCreateDeal :refetch="refetch" :status="column.id" />
						<Card v-for="card in column.items" :key="card.id" class="mb-5" draggable="true">
							<CardHeader role="button">
								<CardTitle>12</CardTitle>
							</CardHeader>
							<CardContent class="text-xs">
								<div>Компания</div>
							</CardContent>
							<CardFooter>
								Date
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
			<KanbanSlideover />
		</div>
	</div>
</template>

<script lang='ts' setup>
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'

useHead({
	title: 'Home | CRM SYSTEM'
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

const { data, isLoading, refetch } = useKanbanQuery()


const columns = computed<IColumn[]>(() => data.value ?? [])
</script>