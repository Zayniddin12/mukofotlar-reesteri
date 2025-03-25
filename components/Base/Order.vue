<template>
  <div
    class="flex-col justify-center rounded-xl items-center w-[133px] py-3 cursor-pointer transition-300 hover:bg-primary/10"
    @click="router.push(`/awards/${id}`)"
  >
    <div
      class="bg-white rounded-lg p-2 max-h-[56px] max-w-[56px] flex-center mx-auto"
    >
      <img
        :src="image || '/images/defaults/medal.svg'"
        :alt="name"
        class="size-10 object-contain"
      />
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
  id: number
  name: string
  number: string
}
defineProps<Props>()

const router = useRouter()
</script>
