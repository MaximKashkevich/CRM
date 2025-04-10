<template>
	<aside class='px-5 py-8 bg-sidebar  relative h-full'>
		<nuxt-link to="/" class='mb-10 block'>
			<NuxtImg src='/logo.svg' width='100px' class='mx-auto' />
		</nuxt-link>
		<!-- <Button>Click me</Button> -->
		<button @click='logout' class="absolute top-2 right-3 transition-colors hover:text-primary">
			<Icon name="line-md:logout" class='text-white' size="20" />
		</button>
		<LayoutMenu />
	</aside>
</template>

<style scoped></style>

<script setup lang='ts'>
import { account } from '~/lib/appwrite'
import { useAuthStore, useIsLoading } from '~/store/auth.store'


const isLoadingStore = useIsLoading()
const store = useAuthStore()
const router = useRouter()

const logout = async () => {
	isLoadingStore.set(true)
	await account.deleteSession('current')
	store.clear()
	await router.push('/login')
	isLoadingStore.set(false)
}

</script>