<template>
  <div
    ref="target"
    class="cursor-pointer relative z-30 select-none w-fit"
    @click="open = !open"
  >
    <BaseButton
      :text="currentLanguage?.name ? currentLanguage.name : ''"
      from-right
      class="min-w-[120px] group relative z-30"
    >
      <template #suffix>
        <div
          class="grid place-items-center w-8 -mr-[17px] h-8 border border-gray rounded-full bg-white absolute right-0 -translate-x-1/2 group-hover:bg-gray group-hover:border-gray-300 transition-300"
        >
          <i
            class="icon-chevron align-middle text-primary transition-300"
            :class="{ 'rotate-180': open }"
          />
        </div>
      </template>
    </BaseButton>
    <Transition mode="out-in" name="move">
      <div
        v-if="open"
        class="flex flex-col absolute min-w-[120px] z-20 -mt-7 pt-7 bg-white border border-gray rounded-xl w-full truncate"
      >
        <div
          v-for="(lang, key) of languagesList"
          :key
          :class="{
            '!font-bold': lang.code === currentLanguage?.code,
            'border-transparent rounded-b-lg': key === languagesList.length - 1,
          }"
          class="px-4 py-1 text-sm text-primary font-medium hover:bg-gray transition-300 flex justify-between items-center"
          @click="changeLocale(lang.code)"
        >
          <p>{{ lang?.name }}</p>
          <span
            v-if="lang.code == currentLanguage?.code"
            class="icon-check text-green text-base"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

import { useLanguageSwitcher } from '~/composables/useLanguageSwitcher'

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()
const open = ref(false)
const target = ref<HTMLDivElement | null>()

onClickOutside(target, () => (open.value = false))
</script>
