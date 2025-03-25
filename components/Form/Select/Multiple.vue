<template>
  <CommonDropdown
    ref="languageSelect"
    :above="showDropdown"
    list-style="!top-[calc(100%_+_25px)] max-h-[200px] !h-fit overflow-y-auto"
    class="bg-white rounded-lg w-40 cursor-pointer flex items-center justify-between transition-300"
    :class="{ '!border-red': error }"
    @change="handleToggle"
  >
    <template #head>
      <div class="flex-center-between w-full">
        <div
          v-if="!names?.length"
          class="text-dark font-medium text-sm !leading-130"
        >
          {{ placeholder }}
        </div>
        <span
          v-else
          class="text-primary font-medium text-sm !leading-130 truncate max-w-96 text-left"
        >
          {{
            screenWidth < 960
              ? names.slice(0, 1)?.join(', ')
              : names.slice(0, 2)?.join(', ')
          }}
          <span
            v-if="names?.length > (screenWidth < 960 ? 1 : 2)"
            class="p-0.5 text-sm text-primary bg-gray-200 rounded-md"
          >
            +{{ names?.length - (screenWidth < 960 ? 1 : 2) }}</span
          >
        </span>

        <slot name="chevron">
          <span
            :class="{ '-rotate-180': showDropdown }"
            class="icon-chevron transition-all duration-200 inline-block text-primary"
          ></span>
        </slot>
      </div>
    </template>
    <div v-if="loading.list" class="h-[100px] flex-center">
      <CommonLoader class="mx-auto" />
    </div>
    <template v-else-if="options?.length">
      <div class="transition-all cursor-pointer flex flex-col">
        <FormCheckbox
          v-model="allChecked"
          :checked="checkedOptions.length === options.length"
          :partial="
            checkedOptions.length > 0 && checkedOptions.length < options.length
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

    <div v-else class="text-center py-2 text-sm text-dark">
      {{ $t('no_data') }}
    </div>
    <div v-if="loading.more" class="flex-center">
      <CommonLoader />
    </div>
    <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
  </CommonDropdown>
</template>
<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

interface Props {
  modelValue: string[]
  options: any[]
  labelKey?: string
  valueKey?: string
  placeholder?: string
  error?: boolean
  infiniteScroll?: boolean
  loading?: {
    list: boolean
    more: boolean
  }
  pagination?: {
    next?: string | null
    count: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select an option',
  loading: () => ({
    list: false,
    more: false,
  }),
  pagination: () => ({
    next: undefined,
    count: 0,
  }),
})

interface Emits {
  (e: 'update:modelValue', val: string[]): void
  (e: 'load'): void
}
const emit = defineEmits<Emits>()

const showDropdown = ref(false)

const screenWidth = computed(() => window.innerWidth)

const allChecked = ref(false)
const checkedOptions = ref<any>([])

let modelv = reactive<string[]>([...props?.modelValue])

const fullValues = computed(() => {
  return props.options?.filter((item) =>
    checkedOptions.value?.includes(item[props.valueKey])
  )
})

const names = computed(() =>
  fullValues.value?.map((item) => item[props.labelKey])
)

watch(
  () => props.modelValue,
  () => {
    modelv = props.modelValue
  }
)

function handleToggle(val: boolean) {
  showDropdown.value = val
}
const showX = ref(false)
function select(item: string) {
  if (modelv.includes(item)) {
    modelv.splice(modelv.indexOf(item), 1)
    showX.value = false
  } else {
    modelv.push(item)
  }
  emit('update:modelValue', modelv)
  showX.value = true
}

function clear() {
  showDropdown.value = false
  modelv = []
  emit('update:modelValue', modelv)
  showX.value = false
}

const languageSelect = ref<HTMLElement | null>(null)
onClickOutside(languageSelect, () => {
  showDropdown.value = false
})

const target = ref(null)
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    (props.pagination.next || props.pagination?.next === undefined) &&
    !props.loading.list &&
    !props.loading.more
  ) {
    emit('load')
  }
})

function changeId(id: number) {
  if (checkedOptions.value?.includes(id)) {
    checkedOptions.value = checkedOptions.value.filter(
      (item: any) => item !== id
    )
  } else {
    checkedOptions.value = [...checkedOptions.value, id]
  }
  emit('update:modelValue', checkedOptions.value)
}

watch(allChecked, (value) => {
  if (value === true) {
    checkedOptions.value = props.options.map((vendor: any) => vendor.value)
  } else {
    checkedOptions.value = []
  }
  emit('update:modelValue', checkedOptions.value)
})

watch(checkedOptions, (value) => {
  if (value.length === props.options.length) {
    allChecked.value = true
  } else if (value.length === 0) {
    allChecked.value = false
  }
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.length) {
      checkedOptions.value = props.modelValue
    }
  },
  { immediate: true, deep: true }
)
</script>
