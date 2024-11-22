<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <div class="flex justify-center items-center mt-2">
    <ClientOnly>
      <LoadingOutlined spin />
    </ClientOnly>
    <span class="ml-2 text-gray-600">Loading...</span>
  </div>
</template>
