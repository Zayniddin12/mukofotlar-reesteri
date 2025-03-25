<template>
  <div class="bg-white rounded-lg p-3 pr-45 h-fit w-full">
    <div class="flex gap-2 items-stretch w-full">
      <span
        class="!w-[82px] !h-[82px] shrink-0 rounded border border-gray-200 shimmer"
      />
      <div class="flex flex-col justify-between w-full">
        <span class="h-[15px] rounded shimmer w-[80%]" />
        <div class="flex gap-1.5 mt-5 w-full">
          <div
            v-for="item in 3"
            :key="item"
            class="p-1 rounded w-7 h-7 flex-center bg-gray-200 shimmer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
