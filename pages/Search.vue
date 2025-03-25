<template>
  <div class="container mb-4">
    <div class="sm:w-fit mx-auto">
      <SectionsMainSearch class="sm:hidden w-full mx-auto" />
      <SectionsMainSearch
        class="mt-5 max-sm:hidden w-fit sm:min-w-[620px] mx-auto"
      />
      <p class="mt-2 text-gray-350 text-xs font-medium">
        {{ $t('count_awardees', { count: searchResults.length }) }}
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
      <template v-if="loading">
        <BaseOrderedLoading v-for="i in 12" :key="i" />
      </template>
      <template v-else-if="searchResults.length">
        <BaseOrdered
          v-for="item in searchResults"
          :id="item.id"
          :key="item.id"
          :image="item.image_url"
          :search="route.query.search"
          :name="item.name"
          :number="item.number"
          :orders="item?.awards"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const searchResults = ref([])
const loading = ref(false)

function onSearch() {
  loading.value = true
  if (route.query.search?.length) {
    useApi()
      .$get('/search-users', {
        params: {
          name: route.query.search,
          page_size: 200,
        },
      })
      .then((res) => {
        searchResults.value = [...res?.items]
      })
      .finally(() => {
        loading.value = false
      })
  }
  if (
    (route.query.date?.length && route.query.date !== 'undefined') ||
    route.query.doc_number?.length ||
    route.query.doc_type?.length
  ) {
    useApi()
      .$post('/user-filter?page_size=200', {
        body: {
          date: route.query.date === 'undefined' ? '' : route.query.date,
          award_code: route.query.doc_number,
          award_ids: route.query.doc_type
            ? route.query.doc_type.split(',').map(Number)
            : [],
        },
      })
      .then((res) => {
        searchResults.value = [...res?.items]
      })
      .finally(() => {
        loading.value = false
      })
  }
  if (
    !route.query.search?.length &&
    (!route.query.date?.length || route.query.date === 'undefined') &&
    !route.query.doc_number?.length &&
    !route.query.doc_type?.length
  ) {
    useApi()
      .$get('/search-users', {
        params: {
          name: '',
          page_size: 200,
        },
      })
      .then((res) => {
        searchResults.value = [...res?.items]
      })
      .finally(() => {
        loading.value = false
      })
  }
}

watch(
  () => route.query,
  () => {
    onSearch()
  },
  { immediate: true, deep: true }
)
</script>
