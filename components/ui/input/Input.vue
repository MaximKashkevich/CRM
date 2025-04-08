<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  disabled?: boolean
  placeholder?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div class="relative w-full">
    <input v-model="modelValue" :disabled="disabled" :placeholder="placeholder" data-slot="input" :class="cn(
      'file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary/90 selection:text-primary-foreground',
      'flex h-10 w-full min-w-0 rounded-lg border border-input bg-background px-4 py-2 text-sm shadow-sm transition-all',
      'outline-none ring-offset-background',
      'file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
      props.class,
    )">
    <span v-if="disabled" class="absolute inset-0 rounded-lg bg-muted/20 pointer-events-none" />
  </div>
</template>