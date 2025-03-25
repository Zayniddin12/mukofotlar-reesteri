<template>
  <div
    :class="{ 'sm:!justify-end': !showBackButton }"
    class="container py-8 flex justify-between"
  >
    <BaseButton
      v-if="showBackButton"
      :text="t('back_main')"
      from-left
      class="!hidden sm:!flex group"
      @click="navigateTo('/')"
    >
      <template #preffix>
        <div
          class="grid place-items-center w-8 -ml-[17px] h-8 border border-gray rounded-full bg-white mr-3 transition-300 group-hover:bg-gray group-hover:border-gray-300"
        >
          <i class="icon-chevron align-middle text-primary rotate-90" />
        </div>
      </template>
    </BaseButton>
    <BaseLanguage />
    <div class="sm:hidden">
      <button
        class="p-2.5 border border-gray-400 rounded-lg flex-center hover:bg-primary group transition-300 cursor-pointer"
        @click="showMobileFilter = !showMobileFilter"
      >
        <i
          class="icon-adjustment text-2xl text-primary group-hover:text-white transition-300"
        />
      </button>
      <SectionsFilterMobile
        :show="showMobileFilter"
        @close="showMobileFilter = false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const showBackButton = ref<boolean>(false)
const showMobileFilter = ref<boolean>(false)
watch(
  route,
  () => {
    showBackButton.value =
      route.matched[0]?.path !== '/' &&
      route.matched[0]?.path !== '/uzc' &&
      route.matched[0]?.path !== '/uz' &&
      route.matched[0]?.path !== '/en' &&
      route.matched[0]?.path !== '/fr' &&
      route.matched[0]?.path !== '/de' &&
      route.matched[0]?.path !== '/ar' &&
      route.matched[0]?.path !== '/ru' &&
      route.matched[0]?.path !== '/kaz' &&
      route.matched[0]?.path !== '/es' &&
      route.matched[0]?.path !== '/kaa'
  },
  { deep: true, immediate: true }
)
</script>
