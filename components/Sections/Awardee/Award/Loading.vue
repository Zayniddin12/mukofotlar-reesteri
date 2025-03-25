<template>
  <div class="rounded border-gray-200 border bg-white p-4 flex gap-4">
    <div class="size-[62px] bg-gray-400 shimmer rounded" />

    <div class="!flex-col justify-between w-full !flex">
      <p class="h-[18px] w-[50%] shimmer">{{ name }}</p>
      <div class="flex justify-between w-full">
        <p class="shimmer w-[50%] rounded h-[15px]" />
        <a class="flex items-center justify-end w-full gap-1"
          ><span class="w-[60%] h-[15px] shimmer rounded" />
          <span class="size-[20px] shimmer rounded"
        /></a>
      </div>
    </div>
  </div>
</template>
