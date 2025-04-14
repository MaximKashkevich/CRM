<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn(
    'rounded-lg bg-card text-card-foreground border border-transparent transition-colors hover:border-[#a252c83d]',
    props.class
  )" class="animate-show">
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    border-color: rgba(162, 82, 200, 0.24);
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }

  90% {
    border-color: rgba(162, 82, 200, 0.24);
  }

  to {
    border-color: transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-show {
  animation: show 0.3s ease-in-out;
}
</style>