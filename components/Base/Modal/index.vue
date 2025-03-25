<template>
  <Teleport to="body">
    <div class="max-w-phone">
      <Transition mode="out-in" name="fade">
        <div
          v-if="isOpen"
          class="w-full fixed left-0 bottom-0 h-screen bg-[#111217D4] z-[110]"
          @click="close"
        />
      </Transition>
      <Transition mode="out-in" name="dropdown">
        <div
          v-if="isOpen"
          :class="($attrs.class, isFlow ? 'overflow-y-auto' : '')"
          class="fixed smth bottom-0 left-0 z-[110] bg-[#F3F3F3] dark:bg-dark w-full min-h-40 max-h-[95%] rounded-t-2xl px-4 pb-4"
        >
          <!-- MODAL --- HEADER -->
          <div v-if="hasHeader" class="flex-center-between py-4">
            <div
              v-if="hasBack"
              class="flex gap-x-1 items-center group cursor-pointer"
              @click="emits('back')"
            >
              <i
                class="icon-chevron rotate-90 text-2xl text-primary group-hover:-translate-x-1 transition-300"
              />
              <span class="text-base text-dark dark:text-white font-medium">
                {{ title }}
              </span>
            </div>
            <span
              v-else
              class="text-base text-dark dark:text-white font-medium"
            >
              {{ title }}
            </span>
            <button
              class="icon-close text-dark dark:text-white text-2xl"
              @click="close"
            />
          </div>
          <!-- MODAL --- BODY -->
          <slot name="body" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { defineModel, watch } from 'vue'

interface Props {
  title: string
  hasHeader?: boolean
  isOpen: boolean
  hasBack?: boolean
  isFlow?: boolean
}

interface Emits {
  (e: 'close', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'back'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

function close() {
  emits('close')
}

watch(
  () => props.isOpen,
  (open) => (document.body.style.overflowY = open ? 'hidden' : 'auto')
)
</script>
