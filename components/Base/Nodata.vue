<template>
  <div
    class="search-result bg-white rounded-lg w-full min-h-[76px] overflow-y-auto z-10 flex items-center justify-center"
  >
    <div class="p-8 flex flex-col items-center justify-center">
      <img :src="photo" alt="no-data" />
      <p class="text-primary text-sm font-semibold text-center mt-2">
        {{ title }}
      </p>
      <p class="text-gray-100 text-xs font-normal text-center mt-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
  description: string
  photo: string
}
defineProps<Props>()
</script>
