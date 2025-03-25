<template>
  <div
    class="inline-flex items-center transition-300 relative bg-white rounded-lg border overflow-hidden w-full"
    :class="[error ? '!border-red' : 'border-transparent']"
  >
    <!-- Prefix Slot -->
    <span :class="[prefixClass]">
      <slot name="prefix">
        <div class="flex-center">
          <i
            class="icon-search-regular text-xl text-gray-100 inline-block pl-2.5"
          />
        </div>
      </slot>
    </span>

    <!-- Input Element -->
    <input
      v-bind="{ type, minlength, maxlength, max, min, disabled, placeholder }"
      :id="id"
      ref="searchInput"
      :value="modelValue"
      :readonly="!autocomplete"
      :class="[inputClass, { 'placeholder:text-red': error }]"
      class="w-full font-medium text-base text-dark placeholder:text-gray-300 bg-transparent flex-grow p-3 outline-none"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    />

    <!-- Suffix Slot -->
    <span :class="[suffixClass]">
      <slot name="suffix">
        <Transition name="fade" mode="out-in">
          <button
            v-if="!loading || search.length > 0"
            :key="loading"
            class="input-clear-btn transition-200 flex-center text-gray-100 hover:text-red opacity-0 invisible group"
            :class="{
              '!opacity-100 !visible': search.length > 0,
              'pointer-events-none': loading,
            }"
            @click="clearSearch"
          >
            <span
              v-if="!loading"
              class="icon-close text-gray-100 transition-200 text-xl inline-block pr-2.5"
            >
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
            <svg
              v-else
              class="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="#EFF0F2"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </Transition>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

export interface Props {
  type?: string
  placeholder?: string
  modelValue: string
  disabled?: boolean
  error?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: boolean
  id?: string
  autoFocus?: boolean
  loading?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
  (e: 'clear'): void
}>()

const search = ref('')
const searchInput = ref()

function clearSearch() {
  search.value = ''
  emit('update:modelValue', search.value)
  emit('clear')
}

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => emit('enter')

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: true,
})

const handleFocus = (e: Event) => {
  emit('focus')
  const target = e.target as HTMLInputElement
  target.removeAttribute('readonly')
}

watch(
  () => props.autoFocus,
  (newValue) =>
    setTimeout(() => {
      if (newValue) {
        searchInput.value?.focus()
      }
    }, 300),
  { immediate: true }
)

defineExpose({ clearSearch, searchInput })
</script>

<style scoped>
/* Common styles */
.input-clear-btn .icon-close-circle-colored span:before {
  transition: all 0.2s ease-in-out;
}

.input-clear-btn:hover .icon-close-circle-colored .path1:before,
.input-clear-btn:hover .icon-close-circle-colored .path2:before {
  color: #f62559;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
