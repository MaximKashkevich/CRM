<script lang="ts" setup>

import { account } from '~/lib/appwrite'
import { useAuthStore, useIsLoading } from '~/store/auth.store'

const isLoadingStore = useIsLoading()
const store = useAuthStore()
const router = useRouter()

onMounted(async () => {
	try {
		const user = await account.get()
		if (user) store.set(user)
	} catch (error) {
		router.push('/login')
	} finally {
		isLoadingStore.set(true)
	}
})
</script>

<template>
	<LayoutLoader v-if="!isLoadingStore.isLoading" />
	<section v-else :class="{ grid: store.isAuth }" style="min-height: 100vh">
		<LayoutSidebar v-if="store.isAuth" />
		<div>
			<slot />
		</div>
	</section>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 1fr 6fr;
}
</style>
