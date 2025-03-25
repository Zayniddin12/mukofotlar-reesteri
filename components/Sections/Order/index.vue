<template>
  <div
    class="flex justify-center items-center gap-3 mb-5 relative w-fit mx-auto"
  >
    <Transition mode="out-in">
      <div :key="loading">
        <div v-if="!loading" class="flex-col justify-center items-center">
          <div
            class="bg-white rounded-lg p-2 max-h-[80px] max-w-[80px] flex-center mx-auto mb-4"
          >
            <img
              :src="
                data?.image_url
                  ? data.image_url
                  : '/images/defaults/default-user.svg'
              "
              alt="order image"
              class="w-[56px] h-[56px]"
            />
          </div>
          <div class="mx-auto flex items-center justify-center gap-2 text-2xl">
            <p class="text-primary font-semibold">
              {{ data.name }}
            </p>
            <span
              class="icon-info-circle text-gray-100 text-2xl transition-300 hover:text-primary cursor-pointer"
              @click="navigateTo(`/awards/${route.params.id}/description`)"
            />
          </div>

          <p
            class="text-center text-sm font-medium text-primary/50 mt-2.5 mb-1"
          >
            <span class="icon-users text-xl" />
            {{ data.partner_count ? formatNumberSpace(data.partner_count) : 0 }}
            {{ $t('count_ordered') }}
          </p>
        </div>
        <SectionsOrderLoading v-else />
      </div>
    </Transition>

    <div
      v-if="data?.description"
      ref="target"
      :class="openDescription ? 'opacity-100' : 'opacity-0'"
      class="p-3 rounded-lg bg-white border border-gray-200 shadow-card !max-w-[309px] !break-all !h-fit description transition-300 absolute right-0 min-[900px]:translate-x-full max-[900px]:-bottom-1/3"
      v-html="data?.description"
    />
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

import { formatNumberSpace } from '~/utils'

interface Props {
  data: {
    image_url: string | boolean
    name: string
    description: string
    code: string
    partner_count: number
  }
  loading: boolean
}
defineProps<Props>()

const route = useRoute()
const openDescription = ref(false)
const target = ref<HTMLDivElement | null>()

onClickOutside(target, () => (openDescription.value = false))
</script>
<style>
.description {
  color: #172a51 !important;
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 130% !important;
}
</style>
