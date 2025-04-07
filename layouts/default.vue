<template>
	<section class='grid' style='min-height: 100vh'>
		<LayoutSidebar />
		<div>
			<slot />
		</div>

	</section>
</template>

<script setup lang='ts'>
console.log('Loaded')
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 1.5fr 6fr;
}
</style>