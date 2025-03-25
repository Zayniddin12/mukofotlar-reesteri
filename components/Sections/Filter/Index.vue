<template>
  <div
    class="p-1 pl-3.5 flex flex-col h-[50px] sm:flex-row gap-x-2.5 gap-y-2.5 items-center"
  >
    <div>
      <FormSelectMultiple
        v-model="form.values.docType"
        :options="documentOptions"
        label-key="label"
        value-key="value"
        :placeholder="$t('form_of_document')"
        class="w-full min-w-[160px]"
      />
    </div>
    <div class="h-px w-full sm:h-5 sm:w-px bg-gray-400" />
    <div>
      <FormInput
        v-model="form.values.docNumber"
        v-maska="moneyMask"
        class="'font-medium text-base text-dark placeholder:text-gray-200 bg-transparent flex-grow outline-none"
        :placeholder="$t('doc_number')"
      />
    </div>
    <div class="h-px w-full sm:h-5 sm:w-px bg-gray-400" />
    <FormDatePicker
      v-model="form.values.selectedYear"
      :placeholder="$t('doc_date')"
    />
    <div class="flex">
      <!--      <button-->
      <!--        class="max-sm:hidden flex-center-between p-1.5 border border-transparent hover:border-primary bg-primary ml-6 rounded-lg group hover:bg-white transition-300 cursor-pointer"-->
      <!--        @click="clearFilter"-->
      <!--      >-->
      <!--        <i-->
      <!--          class="icon-close text-2xl text-white group-hover:text-primary transition-300"-->
      <!--        />-->
      <!--      </button>-->
      <button
        class="max-sm:hidden flex-center-between p-1.5 border border-transparent hover:border-primary bg-primary ml-6 rounded-lg group hover:bg-white transition-300 cursor-pointer"
        @click="filter"
      >
        <i
          class="icon-search text-2xl text-white group-hover:text-primary transition-300"
        />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate, moneyMask } from '~/utils'

interface Props {
  form: any
}

const props = defineProps<Props>()

const { form } = unref(props)

const router = useRouter()

const awards = ref([])

const { t } = useI18n()

function getAwards() {
  useApi()
    .$get('/awards')
    .then((response) => {
      awards.value = response.items
    })
}

getAwards()

const documentOptions = computed(() => {
  return [
    ...awards.value.map((award) => ({
      label: award.name,
      value: award.id,
    })),
  ]
})

function filter() {
  router.push(
    `/search?date=${formatDate(
      form.values.selectedYear.toString() ?? ''
    )}&doc_number=${form.values.docNumber}&doc_type=${form.values.docType}`
  )
}

function clearFilter() {
  form.values.docNumber = ''
  form.values.docType = []
  form.values.selectedYear = ''
  filter()
}
</script>
