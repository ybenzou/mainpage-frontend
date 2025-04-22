<template>
  <nav class="flex flex-col gap-5 p-10 w-56 min-h-screen bg-gray-100 border-r border-gray-300">
    <template v-for="link in links" :key="link.path">
      <router-link
        v-if="link.available"
        :to="link.path"
        class="font-bold text-lg text-blue-600 hover:underline transition-colors duration-300"
        exact-active-class="active-link"
      >
        {{ link.name }}
      </router-link>
    </template>
  </nav>
</template>

<script setup>
const links = [
  { name: 'Home', path: '/', available: true },
  { name: 'Distributed Task Queue', path: '/distributed-task-queue', available: false },
  { name: 'Personal Blog', path: '/personal-blog', available: false },
  { name: 'Privacy-Preserving RAG', path: '/privacy-rag', available: false },
  { name: 'Analyze File Structure', path: '/analyze-structure', available: true },
  { name: 'Prompt Builder', path: '/prompt-builder', available: true },
  { name: 'Tailwind Demo', path: '/tailwind-demo', available: false },
];
</script>

<style scoped>
.active-link {
  @apply text-red-500 underline;
}
</style>
