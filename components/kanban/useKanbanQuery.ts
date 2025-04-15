import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import { DB } from '~/lib/appwrite'
import type { IDeal } from '~/types/deals.types'
import { KANBAN_DATA } from './kanban.data'

export function useKanbanQuery() {
	return useQuery({
		queryKey: ['deals'],
		queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
		select: data => {
			const deals = data.documents as unknown as IDeal[]
			const board = [...KANBAN_DATA]

			deals.forEach(deal => {
				const column = board.find(col => col.id === deal.status)
				column?.items.push({
					$createdAt: deal.$createdAt,
					id: deal.$id,
					name: deal.name,
					price: deal.price,
					companyName: deal.customer?.name || 'No company',
					status: column.name,
				})
			})

			return board
		},
	})
}
