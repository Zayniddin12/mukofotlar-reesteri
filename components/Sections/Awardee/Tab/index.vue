<template>
  <div class="flex gap-2">
    <BaseButton
      :variant="activeTab == 1 ? 'secondary' : 'primary'"
      :text="t('bio')"
      button-class="flex gap-2 items-center"
      @click="toggleTab(1)"
    >
      <template #preffix
        ><span class="icon-poetry text-2xl text-primary" />
      </template>
    </BaseButton>
    <BaseButton
      :variant="activeTab == 2 ? 'secondary' : 'primary'"
      :text="t('awards')"
      button-class="flex gap-2 items-center"
      class="group"
      @click="toggleTab(2)"
    >
      <template #preffix
        ><span class="icon-award text-2xl text-primary" />
      </template>
      <template #suffix
        ><div
          :class="{
            'group-hover:bg-white': activeTab == 1,
            'bg-white': activeTab == 2,
          }"
          class="min-h-6 min-w-6 shrink-0 p-1 bg-gray-200 text-primary/90 text-xs font-medium rounded-sm transition-300"
        >
          {{ awardsCount }}
        </div>
      </template></BaseButton
    >
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
interface props {
  activeTab: number
  awardsCount: number
}
defineProps<props>()

const emit = defineEmits<{
  (e: 'toggleTab', value: number): void
}>()

function toggleTab(item: number) {
  emit('toggleTab', item)
}
</script>
