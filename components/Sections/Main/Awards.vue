<template>
  <div class="flex justify-center gap-x-2">
    <template v-if="loading">
      <BaseOrderLoading v-for="i in 6" :key="i" />
    </template>
    <template v-else>
      <TransitionGroup
        name="scale"
        tag="div"
        class="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-7"
      >
        <BaseOrder
          v-for="award in computedAwards"
          :id="award.id"
          :key="award.id"
          :image="award.image_url"
          :name="award.name"
          :number="award.number"
        />
        <div
          v-if="remainedAwardsNumber > 0 && show === false"
          :key="show"
          class="group cursor-pointer flex flex-col items-center pt-3"
          @click="show = true"
        >
          <div class="p-3 rounded-lg border w-fit border-primary/20">
            <div class="p-2 bg-primary rounded-md w-10 h-10">
              <i class="icon-grid-add text-2xl text-white" />
            </div>
          </div>
          <div class="flex flex-col items-center justify-center mt-2">
            <p class="text-xs font-semibold text-gray-100">
              {{ $t('more_count', { count: remainedAwardsNumber }) }}
            </p>
            <div class="flex items-center gap-x-1">
              <p class="text-xs font-bold text-primary">{{ $t('all') }}</p>
              <i
                class="icon-arrow-right text-sm text-primary group-hover:translate-x-1 transition-300"
              />
            </div>
          </div>
        </div>
        <div
          v-if="show === true"
          :key="show"
          class="group cursor-pointer flex flex-col items-center gap-y-2 pt-3"
          @click="show = false"
        >
          <div class="p-2 bg-gray/50 rounded-md flex-center-between">
            <i class="icon-close text-2xl text-primary" />
          </div>
          <p class="text-primary text-xs font-bold">{{ $t('close') }}</p>
        </div>
      </TransitionGroup>
    </template>
  </div>
</template>

<script setup lang="ts">
const awards = ref([])
const loading = ref(false)
const show = ref(false)

function fetchAwards() {
  loading.value = true
  useApi()
    .$get('/awards', {
      params: {
        page_size: 200,
      },
    })
    .then((response) => {
      awards.value = response.items
    })
    .finally(() => (loading.value = false))
}

fetchAwards()

const computedAwards = computed(() => {
  if (show.value === false) return awards.value.slice(0, 6)
  else return awards.value
})
const remainedAwardsNumber = computed(() => awards.value.length - 6)
</script>

<style>
/* Fade transition classes */
.scale-enter-active {
  animation: scale-in 0.1s ease-out;
}

.scale-leave-active {
  animation: scale-out 0.3s ease-in;
}

@keyframes scale-in {
  0% {
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
  }
}

@keyframes scale-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
