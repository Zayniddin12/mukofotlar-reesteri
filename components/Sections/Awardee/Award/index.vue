<template>
  <div class="rounded border-gray-200 border bg-white p-4 flex gap-4">
    <div class="size-[62px] flex-center bg-gray-400 rounded">
      <img :src="award" alt="award" class="size-[46px]" />
    </div>

    <div class="!flex-col justify-between w-full !flex">
      <p class="text-primary text-base font-semibold">{{ name }}</p>
      <div class="flex justify-between w-full">
        <p class="text-gray-100 font-normal leading-130 text-sm">
          {{
            dayjs(date)
              .locale(locale === 'uz' ? 'uz-latn' : locale)
              .format('DD-MMMM YYYY, hh:mm')
          }}
        </p>
        <a
          :href="`${link || '#'}`"
          class="text-blue text-sm font-medium flex-center"
          ><span>{{ t('decision') }}</span>
          <span class="icon-external-link text-lg ml-1"
        /></a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'dayjs/locale/ar'
import 'dayjs/locale/en'
import 'dayjs/locale/uz-latn'

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

interface Props {
  award: string
  name: string
  date: string
  link: string
}
defineProps<Props>()
const { t, locale } = useI18n()
</script>
