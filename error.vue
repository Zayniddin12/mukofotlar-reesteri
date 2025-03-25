<template>
  <div>
    <LayoutsHeader />
    <div class="h-[calc(100vh-140px)] relative container flex-center">
      <img
        src="/images/gerb.png"
        alt="gerb"
        class="w-full h-full absolute top-0 left-0 aspect-[1/1] z-0"
      />
      <div class="relative z-10 size-fit max-w-[540px] text-center">
        <h1 class="md:text-172 text-80 font-bold leading-130 text-primary mb-5">
          {{ error.statusCode }}
        </h1>
        <p
          class="text-primary text-base font-normal leading-130 font-Inter text-center"
        >
          {{ t('no_found_page') }}
        </p>
        <BaseButton
          variant="bg-primary"
          :text="t('main_page')"
          class="mx-auto mt-6"
          @click="navigateTo('/')"
        />
      </div>
    </div>
    <LayoutsFooter />
  </div>
</template>
<script setup lang="ts">
import { NuxtError } from '#app'

interface Props {
  error: NuxtError
}
defineProps<Props>()

const { t } = useI18n()
</script>
