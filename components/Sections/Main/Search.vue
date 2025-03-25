<template>
  <div class="flex items-center gap-x-2">
    <!-- Search Input with Conditional Display -->
    <div
      class="relative bg-white rounded-lg border border-white w-full focus-within:!border-primary transition-300"
      :class="{ '!border-primary': switcherVal === 'filter' }"
    >
      <Transition name="fade-slide" mode="out-in">
        <template v-if="switcherVal === 'search'">
          <FormInputSearch
            ref="searchInput"
            v-model="form.values.search"
            v-bind="{ loading }"
            :placeholder="t('enter_awardee_name')"
            @focus="openResult"
            @focusout="closeResult"
          >
            <template v-if="!route.fullPath.includes('/search')" #prefix>
              <i class="icon-search ml-3 text-2xl text-gray" />
            </template>
            <template v-else #suffix>
              <i
                class="icon-search ml-3 text-2xl text-gray hover:text-primary transition-300 cursor-pointer mr-3"
                @click="handleSearch"
              />
            </template>
          </FormInputSearch>
        </template>
        <template v-else>
          <SectionsFilter :form="form" />
        </template>
      </Transition>

      <!-- Search Results Dropdown -->
      <Transition name="dropdown">
        <div
          v-if="showResult && !route.fullPath.includes('/search')"
          class="relative"
        >
          <!-- Loading State -->
          <template v-if="loading">
            <div
              v-for="i in 3"
              :key="i"
              class="search-result bg-white rounded-lg absolute top-[calc(100%+12px)] max-h-[280px] w-full h-fit z-10 overflow-hidden"
            >
              <div
                v-for="i in 3"
                :key="i"
                class="shimmer w-full h-[76px] overflow-y-auto flex items-center justify-center"
              />
            </div>
          </template>

          <!-- Results List -->
          <template v-else-if="searchResult.length > 0">
            <SearchResult
              :search-result="searchResult"
              :search="form.values.search"
              @handle-search="handleSearch"
            />
          </template>

          <!-- No Data State -->
          <template v-else>
            <div
              class="search-result bg-white rounded-lg absolute top-[calc(100%+12px)] w-full min-h-[76px] overflow-y-auto z-10 flex items-center justify-center"
            >
              <div class="p-8 flex flex-col items-center justify-center">
                <img src="/images/no-data/search.svg" alt="no-data" />
                <p class="text-primary text-sm font-semibold text-center mt-2">
                  {{ t('no_search_results') }}
                </p>
                <p class="text-gray-100 text-xs font-normal text-center mt-2">
                  {{ t('no_search_results_text') }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </Transition>
    </div>

    <!-- Switcher Button -->
    <div
      class="max-sm:hidden p-2.5 border border-gray-400 rounded-lg flex-center text-primary hover:bg-primary hover:text-white transition-300 cursor-pointer"
      @click="switcher"
    >
      <Transition name="fade">
        <i
          class="text-3xl transition-transform duration-300"
          :class="[
            switcherVal === 'search'
              ? 'icon-adjustment rotate-0'
              : 'icon-close rotate-90',
          ]"
        />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { required } from '@vuelidate/validators'

import { debounce } from '~/helpers'

const { t } = useI18n()

// Reactive Variables
const search = ref('')
const loading = ref(false)
const searchResult = ref<any[]>([])
const switcherVal = ref<'search' | 'filter'>('search')
const showResult = ref(false)
const router = useRouter()
const route = useRoute()
const form = useForm(
  {
    selectedYear: '',
    docNumber: '',
    docType: [],
    search: '',
  },
  {
    selectedYear: {
      required,
    },
    docNumber: {
      required,
    },
    search: {
      required,
    },
    docType: {
      required,
    },
  }
)

const searchInput = ref()

// Function to Switch Between 'search' and 'filter'
function switcher() {
  switcherVal.value = switcherVal.value === 'search' ? 'filter' : 'search'
}

// Clear Search Input
function handleSearch() {
  showResult.value = false
  router.push(`/search?search=${form.values.search}`)
}

watch(
  () => form.values.search,
  () => {
    if (route.fullPath.includes('/search')) {
      debounce('search-search', () => {
        handleSearch()
      })
    } else {
      debounce('search-search', () => {
        openResult()
      })
    }
  }
)

// Open Search Results Dropdown
function openResult() {
  if (!form.values.search.trim()) {
    showResult.value = false
    searchResult.value = []
    return
  }
  showResult.value = true
  searchResult.value = []
  fetchProducts()
}

// Close Search Dropdown (with a delay to prevent flicker)
function closeResult() {
  setTimeout(() => {
    showResult.value = false
  }, 200)
}

// Fetch Products from API
async function fetchProducts() {
  loading.value = true
  try {
    const response = await useApi().$get('/search-users', {
      params: {
        name: form.values.search,
        page_size: 200,
      },
    })

    const { items } = response
    searchResult.value = [...searchResult.value, ...items]
  } catch (error) {
    console.error('Error fetching search results:', error)
  } finally {
    loading.value = false
  }
}

watch(
  route.query,
  () => {
    if (route.query.search) {
      form.values.search = route.query.search
    }
    if (route.query.date) {
      form.values.selectedYear = route.query.date
    }
    if (route.query.doc_number) {
      form.values.docNumber = route.query.doc_number
    }
    if (route.query.doc_type) {
      form.values.docType = route.query.doc_type.split(',').map(Number)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.search-result {
  box-shadow: 0 4px 13px rgba(56, 56, 56, 0.08);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
