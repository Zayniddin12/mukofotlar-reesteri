<template>
  <div class="container">
    <div
      class="max-w-[782px] bg-white p-6 mx-auto shadow-card rounded-lg flex items-center flex-col gap-4"
    >
      <div
        class="sm:w-80 sm:h-80 w-[60px] h-[60px] mx-auto flex-center shrink-0 bg-gray-700 rounded-20"
      >
        <img
          v-if="!loading"
          class="sm:h-56 sm:w-56 w-[35px] h-[35px]"
          :src="
            userData?.image_url
              ? userData.image_url
              : '/images/defaults/modal.scg'
          "
          alt="order"
        />
        <div
          v-else
          class="sm:h-56 sm:w-56 w-[35px] h-[35px] shimmer rounded-full"
        />
      </div>
      <h1
        v-if="!loading"
        class="text-primary sm:text-2xl text-xl font-bold leading-130"
      >
        {{ userData?.name }}
      </h1>
      <div v-else class="h-6 w-[50%] rounded shimmer" />
      <a
        :href="userData?.link"
        target="_blank"
        class="text-blue flex items-center gap-[2px] hover:text-blue-800/60 transition-300 cursor-pointer mb-6 text-sm"
        ><span>{{ t('decision_president') }}</span>
        <span class="icon-external-link sm:text-xl text-lg"
      /></a>

      <div v-if="!loading" class="description" v-html="userData?.description" />
      <div v-else class="w-full h-40 shimmer" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IAwardee } from '@/types/index'
import { useAsyncData } from '#app'

const { t } = useI18n()
const { data, loading, error } = await useAsyncData('get', () =>
  useApi().$get(`awards/${useRoute().params.id}`)
)
const userData: IAwardee | null = data.value

if (error.value) showError({ status: 404 })
</script>
<style>
.description p {
  color: #172a51 !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  word-break: break-word;
}
.description a {
  color: #1c92e0;
}
.description a:hover {
  text-decoration: underline;
}
.description img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
}

.description blockquote {
  margin: 20px 0;
  padding: 16px 16px 16px 64px;
  position: relative;
  background: #1a2226;
  border-radius: 20px;
}
.description blockquote p {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 8px;
}
.description blockquote p,
.description blockquote {
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #f7f9fa;
  font-style: italic;
}
.description blockquote:after {
  content: '\e947';
  font-family: icomoon;
  position: absolute;
  left: 20px;
  top: 20px;
  color: #1c92e0;
  font-size: 20px;
  line-height: 20px;
}

.description ol li,
.description ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #c2c4c5;
}
.description ul,
.description ol {
  padding-left: 20px;
  margin: 20px 0;
}
.description ul {
  list-style: disc;
}
.description ol {
  list-style: auto;
}

@media screen and (max-width: 768px) {
  .description p,
  .description blockquote {
    font-size: 12px;
    line-height: 140%;
  }
  .description img,
  .description blockquote,
  .description ul,
  .description ol {
    margin: 12px 0;
  }
}
@media (max-width: 640px) {
  .description ol li,
  .description blockquote,
  .description ul li {
    font-size: 14px !important;
  }
}
</style>
