<template>
  <div class="py-2.5 border-t border-gray-100/10">
    <div class="flex-center-between max-sm:flex-col max-sm:gap-2 container">
      <div class="flex gap-5 text-xs text-gray-100 leading-130 transition-300">
        <p>© 1992-{{ currentYear }} {{ t('uza') }}</p>
        <p
          class="hover:text-primary cursor-pointer duration-300 transition-300"
        >
          {{ t('about_agent') }}
        </p>
      </div>
      <div class="flex gap-3">
        <a
          v-for="(item, key) in socialMedias"
          :key
          :class="item.icon"
          class="text-primary text-lg hover:scale-110 transition-300"
          :href="item.link"
          target="_blank"
        />
      </div>
      <div
        class="flex gap-4 text-gray-100 text-xs font-medium leading-130 transition-300"
      >
        <a
          class="hover:text-primary cursor-pointer transition-300 duration-300"
          >{{ t('contact') }}</a
        >
        <a
          class="hover:text-primary cursor-pointer transition-300 duration-300"
          >{{ t('regulatory_docs') }}</a
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { socialMedias } from '@/data'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>
