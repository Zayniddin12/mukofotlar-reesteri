<template>
  <div class="">
    <div
      class="flex sm:justify-between sm:items-center max-sm:flex-col max-sm:gap-1 text-sm leading-130 font-medium"
    >
      <p v-if="!loading" class="text-gray-600">
        {{ data?.count }} {{ t('count_of_awards') }}
      </p>
      <span v-else class="shimmer sm:w-40 w-full h-4 rounded" />
      <a
        v-if="!loading"
        :href="data?.link"
        target="_blank"
        class="text-blue flex items-center gap-[2px] hover:text-blue-800/60 transition-300"
        ><span class="transition-300">{{ data?.name }}</span
        ><span class="icon-external-link text-base transition-300"
      /></a>
      <span v-else class="shimmer sm:w-40 w-full h-4 rounded" />
    </div>

    <Transition mode="out-in">
      <div :key="loadBase">
        <div
          v-if="!loadBase && awardees?.length"
          class="grid min-[900px]:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-3"
        >
          <LazyBaseOrdered
            v-for="(item, key) in awardees"
            :id="item.id"
            :key
            :name="item.name"
            :image="item.image_url"
            :orders="item.awards"
          />
        </div>
        <div v-else class="grid grid-cols-3 gap-4 my-3">
          <BaseOrderedLoading v-for="key in 6" :key />
        </div>
      </div>
    </Transition>

    <BaseButton
      v-if="awardees?.length < data?.count"
      class="pl-3.5 pr-[7px] group hover:bg-gray transition-300 active:scale-90"
      :text="t('more')"
      :loading="loadingMore"
      @click="loadMore"
    >
      <template #suffix>
        <span
          class="icon-chevron text-primary text-lg group-hover:rotate-180 transition-300"
        />
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
export type IData = {
  count: number
  id: number
  link: string
  name: string
}
export type IAwardees = {
  id: number
  name: string
  image_url: string
  biography: string
  position: string
  awards_count: number
  awards: {
    id: number
    name: string
    date: string
    image_url: string
    link_url: string
  }[]
}

interface Props {
  data: IData
  year: number
  loading: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()
const route = useRoute()
const loadMoreData = ref(false)
const loadBase = ref(true)
const page = ref<number>(1)
const pageSize = ref<number>(9)
const awardees = ref<IAwardees[]>()
const loadingMore = ref(false)

function loadAwardees(loadMore: boolean) {
  if (awardees.value?.length && !loadMore) {
    loadBase.value = true
  } else if (loadMore) {
    loadingMore.value = true
  }
  useApi()
    .$get(
      `/decision-users/${props?.data?.id}/${props?.year}/${
        useRoute().params.id
      }`,
      {
        params: {
          page: page.value,
          page_size: pageSize.value,
        },
      }
    )
    .then((response: IAwardees) => {
      const results = awardees.value || []
      awardees.value = loadMore
        ? [...results, ...response.items]
        : response.items
    })
    .finally(() => {
      loadBase.value = false
      loadingMore.value = false
    })
}

const loadMore = () => {
  loadMoreData.value = true
  page.value = page.value + 1
  loadAwardees(true)
}

watch(
  route,
  () => {
    loadAwardees(false)
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>
