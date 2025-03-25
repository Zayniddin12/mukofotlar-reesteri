<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1>Playground</h1>
    <div>
      <div class="flex gap-2">
        <FormCheckbox
          v-model="checked"
          :checked="checkedOptions.length === options.length"
          :partial="
            checkedOptions.length > 0 && checkedOptions.length < options.length
          "
          label="Check All"
        />
      </div>
      <div>
        <FormCheckbox
          v-for="option in options"
          :key="option.value"
          :model-value="option.value"
          :label="option.label"
          :checked="checkedOptions.includes(option.value)"
          @update:model-value="changeId(option.value)"
        />
        <p>{{ checkedOptions }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const checked = ref(false)

watch(checked, (value) => {
  console.log('Checked:', value)
})

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const checkedOptions = ref<any>([])

function changeId(id: number) {
  if (checkedOptions.value?.includes(id)) {
    checkedOptions.value = checkedOptions.value.filter(
      (item: any) => item !== id
    )
  } else {
    checkedOptions.value = [...checkedOptions.value, id]
  }
}
watch(checked, (value) => {
  if (value === true) {
    checkedOptions.value = options.value.map((vendor: any) => vendor.value)
  } else {
    checkedOptions.value = []
  }
})

watch(checkedOptions, (value) => {
  if (value.length === options.value.length) {
    checked.value = true
  } else if (value.length === 0) {
    checked.value = false
  }
})
</script>
