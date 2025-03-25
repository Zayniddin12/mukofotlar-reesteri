<template>
  <div class="container">
    <div
      class="max-w-[782px] mx-auto bg-white rounded-lg shadow-card md:p-8 sm:p-6 p-4 flex-col justify-center sm:mb-52 mb-8"
    >
      <img
        :src="userData?.image_url || '/images/defaults/user-default.svg'"
        alt="ordered person"
        class="rounded-lg sm:max-w-[128px] sm:max-h-[128px] max-h-[80px] max-w-[80px] mx-auto"
      />
      <p class="text-xs font-medium leading-130 text-gray-100 text-center mt-4">
        {{ userData?.position }}
      </p>
      <h3
        class="text-lg font-bold leading-130 text-primary text-center mt-[2px]"
      >
        {{ userData?.name }}
      </h3>
      <SectionsAwardeeTab
        :active-tab="activeTab"
        class="mt-9"
        :awards-count="userData.awards_count"
        @toggle-tab="toggleTab"
      />

      <Transition mode="out-in">
        <div :key="activeTab" class="mt-5">
          <template v-if="activeTab == 1">
            <Transition mode="out-in">
              <div :key="loading">
                <div v-if="loading">
                  <div
                    v-for="key in 10"
                    :key
                    class="w-full shimmer h-[15px] rounded"
                  />
                </div>
                <div
                  v-else
                  class="text-primary sm:text-sm text-xs font-normal text-justify"
                >
                  <div
                    v-if="userData?.biography"
                    class="bio"
                    v-html="userData.biography"
                  />
                  <div v-else>{{ $t('no_information') }}</div>
                </div>
              </div>
            </Transition>
          </template>
          <template v-if="activeTab == 2">
            <Transition mode="out-in">
              <div :key="loading">
                <div v-if="!loading" class="flex flex-col gap-3">
                  <SectionsAwardeeAward
                    v-for="(item, key) in userData?.awards"
                    :key
                    :name="item.name"
                    :award="item.image_url"
                    :date="item.date"
                    :link="item.link_url"
                  />
                </div>
                <div v-else class="flex flex-col gap-3">
                  <SectionsAwardeeAwardLoading v-for="key in 5" :key />
                </div>
              </div>
            </Transition>
          </template>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

import { useAsyncData } from '#app'
import { awards } from '~/data'

export type IUser = {
  awards: {
    date: string
    id: number
    image_url: string
    link_url: string
    name: string
  }[]
  awards_count: number
  biography: string
  id: number
  name: string
  position: string
  image_url: string
}

const activeTab = ref<number>(1)
const tab = ref(useRouteQuery('tab', '', { transform: String }))
const route = useRoute()
function toggleTab(item: number) {
  tab.value = item == 1 ? 'bio' : 'awards'
}

const { data, loading, error } = await useAsyncData('get', () =>
  useApi().$get(`user/${useRoute().params.id}`)
)

const userData: IUser | null = data.value

if (error.value) showError({ status: 404 })
watch(
  route,
  () => {
    activeTab.value = 1
    if (route.query.tab == 'awards') {
      activeTab.value = 2
    }
  },
  { deep: true, immediate: true }
)
const richTextPurify = (str: string, count = 120) => {
  const text = str?.replace(/<\/?[^>]+(>|$)|&[^\s]*;/gi, '')
  if (count === 0) {
    return text
  }
  return text?.substring(0, count)
}
useSeoMeta({
  title: data.value?.name ?? 'user',
  ogTitle: data.value?.name ?? 'user',
  ogImage: data.value?.image_url || '/public/OgImage.ico',
  description: richTextPurify(data.value?.bio ?? 'Default Description'),
  ogDescription: richTextPurify(data.value?.bio ?? 'Default Description'),
})
</script>
<style>
.bio {
  color: #172a51;
  text-align: justify;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
