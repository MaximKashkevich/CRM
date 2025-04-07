<template>
	<aside class='px-5 py-8 bg-sidebar  relative h-full'>
		<nuxt-link to="/" class='mb-10 block'>
			<NuxtImg src='/logo.svg' width='100px' class='mx-auto' />
		</nuxt-link>
		<!-- <Button>Click me</Button> -->
		<button class="absolute top-2 right-3 transition-colors hover:text-primary">
			<Icon name="line-md:logout" class='text-white' size="20" />
		</button>
		<LayoutMenu />
	</aside>
</template>

<style scoped></style>

<script setup lang='ts'></script>