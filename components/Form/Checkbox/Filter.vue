<template>
  <div class="flex-center-between gap-4 py-2">
    <div class="flex-y-center gap-3">
      <p class="text-sm leading-135 font-semibold text-dark dark:text-white">
        {{ item?.name }}
      </p>
    </div>

    <div
      class="w-6 h-6 rounded-md border-2 border-gray-700 transition-300 relative overflow-hidden flex-center"
      :class="{ '!border-transparent border-none': active }"
      @click="$emit('change', item?.id)"
    >
      <div
        class="bg-blue-100 w-full h-full absolute inset-0 opacity-0 transition-300"
        :class="{ '!opacity-100': active }"
      />
      <i
        class="icon-tick text-white relative z-[1] text-xl opacity-0 transition-300"
        :class="{ '!opacity-100': active }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: any
  active: boolean
}

defineProps<Props>()
</script>
