<template>
  <div>
    <Transition mode="out-in">
      <div :key="loading">
        <div v-if="loading">
          <div v-for="key in 10" :key class="w-full shimmer h-[15px] rounded" />
        </div>
        <div
          v-else
          class="text-primary sm:text-sm text-xs font-normal text-justify"
        >
          <div v-if="biography" class="bio" v-html="biography" />
          <div v-else>{{ $t('no_information') }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
interface Props {
  biography: string | undefined
  loading: boolean
}
defineProps<Props>()
</script>
