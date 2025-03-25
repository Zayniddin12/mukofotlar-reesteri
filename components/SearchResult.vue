<template>
  <ul
    class="search-result bg-white rounded-lg absolute top-[calc(100%+12px)] w-full max-h-[330px] overflow-y-auto z-10"
  >
    <li v-for="(result, idx) in searchResult.slice(0, 4)" :key="idx">
      <NuxtLink
        class="transition-200 group relative flex items-center justify-between space-x-9 hover:bg-gray-200 transition-300 px-3 py-2 first:rounded-t-lg last:rounded-b-lg w-full"
        :to="`/user/${result.id}`"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-9 h-9 rounded-lg border border-gray-400 p-[3px] flex-shrink-0"
          >
            <img
              :src="result?.image_url || '/images/defaults/default-user.svg'"
              :alt="result?.title"
              class="h-full w-full object-contain"
            />
          </div>
          <div>
            <Highlighter
              class="text-sm leading-130 text-primary font-semibold"
              highlight-class-name="bg-[#F7DD31] rounded"
              :search-words="[search ?? '']"
              :text-to-highlight="result?.name"
            />
            <div class="flex gap-1.5 mt-2.5">
              <div
                v-for="(item, key) in result.awards.slice(0, 4)"
                :key
                class="p-0.5 rounded size-5 flex-center bg-gray-200"
              >
                <img
                  :src="item?.image_url"
                  alt="order"
                  class="object-contain size-4"
                />
              </div>
              <div
                v-if="result.awards.length > 4"
                class="rounded border border-gray size-5 flex-center p-0.5 text-primary text-13 font-medium leading-130 flex items-center flex-nowrap"
              >
                +{{ result.awards.length - 4 }}
              </div>
            </div>
          </div>
        </div>
        <i
          class="icon-chevron -rotate-90 transition-300 text-xl text-gray-300 group-hover:translate-x-1"
        />
        <span
          v-if="idx !== 3"
          class="absolute w-[calc(100%-52px)] left-4 right-0 h-px block bottom-0 bg-gray-200"
        />
      </NuxtLink>
    </li>
    <li v-if="searchResult?.length > 4" class="p-4">
      <BaseButton
        variant="secondary"
        class="w-full"
        :text="$t('see_all')"
        button-class="flex items-center justify-center"
        :disabled="!searchResult?.length"
        @click="emit('handleSearch')"
      >
        <template #suffix>
          <i class="icon-arrow-right text-primary text-xl my-auto" />
        </template>
      </BaseButton>
    </li>
  </ul>
</template>
<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

interface Props {
  searchResult: any[]
  search: string
}

defineProps<Props>()

const emit = defineEmits(['handleSearch'])
</script>
