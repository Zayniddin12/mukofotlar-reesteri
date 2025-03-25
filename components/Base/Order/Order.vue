<template>
  <div class="flex-col justify-center items-center w-[133px]">
    <div
      class="bg-white rounded-lg p-2 max-[h-54px] max-w-[54px] flex-center mx-auto"
    >
      <img :src="image" alt="order image" />
    </div>
    <p class="text-center text-xs font-medium text-gray mt-2.5 mb-1">
      {{ number }}
    </p>
    <p class="text-xs font-semibold text-center w-24 mx-auto text-primary">
      {{ name }}
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  image: string
  name: string
  number: string
}
defineProps<Props>()
</script>
