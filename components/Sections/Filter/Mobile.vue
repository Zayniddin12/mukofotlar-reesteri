<template>
  <div>
    <BaseModal
      :is-open="show"
      has-header
      :title="modalStep === 'filter' ? $t('filter') : $t('form_of_document')"
      :has-back="modalStep === 'awards'"
      :is-flow="modalStep === 'awards'"
      @back="modalStep = 'filter'"
      @close="handleClose"
    >
      <template #body>
        <template v-if="modalStep === 'filter'">
          <div class="flex flex-col gap-y-3">
            <div
              class="flex justify-between items-center py-4 px-3 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-300"
              @click="modalStep = 'awards'"
            >
              <p class="text-blue-100 text-sm font-medium">
                {{ $t('form_of_document') }}
              </p>
              <div class="flex items-center gap-x-1">
                <div v-if="names?.length" class="flex gap-x-1 items-center">
                  <span
                    class="text-primary font-medium text-xs truncate max-w-24 text-left"
                  >
                    {{ names.at(1) }}
                  </span>
                  <span
                    v-if="names?.length > 1"
                    class="p-0.5 text-xs text-primary bg-gray-200 rounded-md"
                  >
                    +{{ names.length - 1 }}
                  </span>
                </div>
                <div class="flex gap-x-1 items-center">
                  <p v-if="!names?.length" class="text-xs text-gray-100">
                    {{ $t('all') }}
                  </p>
                  <i class="icon-chevron -rotate-90 text-2xl text-gray-100" />
                </div>
              </div>
            </div>
            <FormInput
              v-model="form.values.docNumber"
              v-maska="moneyMask"
              class="'font-medium text-base text-dark placeholder:text-gray-200 bg-transparent flex-grow outline-none"
              input-class="!px-3 !py-4"
              container-class="!bg-white !rounded-xl"
              :placeholder="$t('doc_number')"
            />
            <FormDatePicker
              v-model="form.values.selectedYear"
              :placeholder="$t('doc_date')"
              container-class="!bg-white !rounded-xl !px-3 !py-4"
            />
            <div class="flex gap-x-3 mt-3 w-full">
              <BaseButton
                variant="secondary"
                class="w-full"
                :text="$t('clear')"
                @click="clearFilter"
              />
              <BaseButton
                variant="tertiary"
                class="w-full"
                text-class="!text-white"
                :text="$t('accept')"
                @click="filter"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="transition-all cursor-pointer flex flex-col">
            <FormCheckbox
              v-model="allChecked"
              :checked="checkedOptions.length === options.length"
              :partial="
                checkedOptions.length > 0 &&
                checkedOptions.length < options.length
              "
              :label="$t('all')"
              class="hover:bg-[#D5D8E066]"
            />
            <FormCheckbox
              v-for="option in options"
              :key="option.value"
              :model-value="option.value"
              :label="option.label"
              :checked="checkedOptions.includes(option.value)"
              class="hover:bg-[#D5D8E066]"
              @update:model-value="changeId(option.value)"
            />
          </div>
        </template>
      </template>
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { formatDate } from '~/utils'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const form = useForm(
  {
    selectedYear: '',
    docNumber: '',
    docType: [],
  },
  {}
)

interface Props {
  show: boolean
  title: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalStep = ref<'filter' | 'awards'>('filter')
const awards = ref([])
const checkedOptions = ref([])
const allChecked = ref(false)

function getAwards() {
  useApi()
    .$get('/awards')
    .then((response) => {
      awards.value = response.items
    })
}

getAwards()

const options = computed(() => {
  return [
    ...awards.value.map((award) => ({
      label: award.name,
      value: award.id,
    })),
  ]
})

const fullValues = computed(() => {
  return options.value?.filter((item) =>
    checkedOptions.value?.includes(item.value)
  )
})

const names = computed(() => fullValues.value?.map((item) => item.label))

function changeId(id: number) {
  if (checkedOptions.value?.includes(id)) {
    checkedOptions.value = checkedOptions.value.filter(
      (item: any) => item !== id
    )
  } else {
    checkedOptions.value = [...checkedOptions.value, id]
  }
}

watch(allChecked, (value) => {
  if (value === true) {
    checkedOptions.value = options.value.map((vendor: any) => vendor.value)
  } else {
    checkedOptions.value = []
  }
  emit('update:modelValue', checkedOptions.value)
})

watch(checkedOptions, (value) => {
  if (value.length === options.value.length) {
    allChecked.value = true
  } else if (value.length === 0) {
    allChecked.value = false
  }
})

watch(checkedOptions, (value) => {
  form.values.docType = value
})

function filter() {
  router.push(
    `/search?${
      route.query.search || route.query.search?.length
        ? `search=${route.query.search}&`
        : ''
    }date=${formatDate(form.values.selectedYear.toString() ?? '')}&doc_number=${
      form.values.docNumber
    }&doc_type=${form.values.docType}`
  )
  emit('close')
}

function clearFilter() {
  form.values.docNumber = ''
  form.values.docType = []
  checkedOptions.value = []
  form.values.selectedYear = ''
  if (router.currentRoute.value.fullPath.includes('/search')) {
    filter()
  }
}

function handleClose() {
  if (
    (!route.query.date?.length || route.query.date === 'undefined') &&
    !route.query.doc_number?.length &&
    !route.query.doc_type?.length
  ) {
    clearFilter()
  }
  modalStep.value = 'filter'
  emit('close')
}

watch(
  route.query,
  () => {
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
  { immediate: true, deep: true }
)
</script>
