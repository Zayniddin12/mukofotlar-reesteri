<template>
  <div
    class="bg-white rounded-lg p-3 pr-45 h-fit border shadow-card border-white group hover:border-primary transition-300 cursor-pointer active:scale-95"
    @click="navigateTo(`/user/${id}`)"
  >
    <div class="flex gap-2 items-stretch">
      <img
        :src="image ?? '/images/defaults/default-user.svg'"
        alt="ordered image"
        class="w-[82px] h-[82px] rounded border border-gray-200"
      />
      <div class="flex flex-col justify-between">
        <Highlighter
          class="text-primary text-sm font-semibold leading-130"
          highlight-class-name="bg-[#FFCD55] rounded"
          :search-words="[search ?? '']"
          :text-to-highlight="name"
        />

        <div class="flex gap-1.5 mt-5">
          <div
            v-for="(item, key) in computedOrders"
            :key
            class="p-0.5 rounded w-7 h-7 flex-center group-hover:bg-primary transition-300 bg-gray-200"
          >
            <img
              :src="item?.image_url"
              alt="order"
              class="object-contain size-6"
            />
          </div>
          <div
            v-if="remainedOrdersNUmber"
            class="rounded border border-gray w-7 h-7 flex-center p-1.5 text-primary text-13 font-medium leading-130 flex items-center flex-nowrap"
          >
            +{{ remainedOrdersNUmber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

interface Props {
  id: number
  search?: string
  name: string
  image: string
  orders: {
    id: number
    name: string
    date: string
    image_url: string
    link_url: string
  }[]
}
const props = defineProps<Props>()

const computedOrders = computed(() => props.orders?.splice(0, 4))
const remainedOrdersNUmber = computed(() => +props?.orders?.length)
</script>
