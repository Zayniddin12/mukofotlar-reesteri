<template>
  <div>
    <div class="container">
      <SectionsOrder
        class="sm:-mt-[52px]"
        v-bind="{ data: userData }"
        :loading="loading"
      />
      <div class="flex flex-wrap gap-2 mb-5">
        <BaseButton
          v-for="(item, key) in paginatedYears"
          :key
          :class="{
            '!bg-primary !text-white border-primary': activeYear === item,
          }"
          variant="default-primary"
          :text="`${item}`"
          @click="setActiveYear(+item)"
        />

        <BaseButton
          v-if="paginatedYears?.length < years?.length"
          :text="t('more')"
          variant="default-primary"
          class="group"
          @click="loadYear(14)"
          ><template #suffix
            ><span
              class="icon-chevron text-primary ml-1 mt-[2px] group-hover:rotate-180 transition-300" /></template
        ></BaseButton>
      </div>
      <template v-for="(item, key) in decisions?.items" :key="key">
        <LazySectionsAwardeeSearch
          :data="item"
          :loading="decisionLoading"
          :year="+activeYear"
          class="mb-6"
        />
      </template>
      <BaseNodata
        v-if="!decisions?.items?.length && !decisionLoading"
        photo="/images/no-data/search.svg"
        :title="t('no_search_results')"
        :description="t('no_search_results_text')"
      />
    </div>
    <div ref="target" class="py-0.5 w-full" />
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

import { useAsyncData } from '#app'
import { IAwardee } from '@/types/index'
import { years } from '~/data'
import { richTextPurify } from '~/utils'

export type IDecision = {
  count: number
  current: string
  items: {
    id: number
    name: string
    link: string
    count: number
  }[]
  next: string
  previous: string
}

const { t } = useI18n()
const route = useRoute()
const decisions = ref<IDecision>()
const decisionLoading = ref<boolean>(true)
const page = ref<number>(1)
const pageSize = ref<number>(4)
const target = ref<HTMLElement>(null)
const paginatedYears = ref<string[]>()
const calculatedYears = ref(14)
const activeYear = useRouteQuery<Number>('year', 2024, {
  transform: Number,
})

function setActiveYear(year: number) {
  activeYear.value = year
}
function loadYear(number: number) {
  calculatedYears.value += number
  paginatedYears.value = years.slice(0, calculatedYears.value)
}

let scrollNextTimeOut: ReturnType<typeof setTimeout> | undefined

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (process.client) {
    if (isIntersecting) {
      scrollNextTimeOut = setTimeout(() => {
        if (decisions.value?.next) {
          pageSize.value = pageSize.value + 3
          fetchDecision()
        }
      }, 1000)
    } else {
      clearTimeout(scrollNextTimeOut)
    }
  }
})

const { data, loading, error } = await useAsyncData('get', () =>
  useApi().$get(`awards/${useRoute().params.id}`)
)

const userData: IAwardee | null = data.value

if (error.value) showError({ status: 404 })

function fetchDecision() {
  decisionLoading.value = true
  useApi()
    .$get(`/awards/${useRoute().params.id}/${activeYear.value}/decision?`, {
      params: {
        page: page.value,
        page_size: pageSize.value,
      },
    })
    .then((response) => {
      decisions.value = response
    })
    .finally(() => (decisionLoading.value = false))
}

fetchDecision()
loadYear(14)

watch(
  route,
  () => {
    fetchDecision()
  },
  { deep: true, immediate: true }
)

useSeoMeta({
  title: data.value?.name ?? 'user',
  ogTitle: data.value?.name ?? 'user',
  ogImage: data.value?.image_url || '/public/OgImage.ico',
  description: richTextPurify(data.value?.bio ?? 'Default Description'),
  ogDescription: richTextPurify(data.value?.bio ?? 'Default Description'),
})
</script>
