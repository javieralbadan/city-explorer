<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref<number>(new Date().getFullYear());
</script>

<template>
  <footer
    class="fixed bottom-0 left-0 w-full bg-gray-800 text-white px-4 py-1 sm:py-2 flex justify-between items-center"
  >
    <div class="text-sm">&copy; {{ currentYear }}</div>
    <div class="text-sm">@javier.albadan</div>
  </footer>
</template>
