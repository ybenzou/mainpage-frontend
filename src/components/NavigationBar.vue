<template>
  <nav class="nav">
    <router-link
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="nav-link"
      exact-active-class="active-link"
      :class="{ 'disabled-link': !link.available }"
      :tabindex="link.available ? 0 : -1"
    >
      {{ link.name }}
    </router-link>
  </nav>
</template>

<script setup>
const links = [
  { name: 'Home', path: '/', available: true },
  { name: 'Distributed Task Queue', path: '/distributed-task-queue', available: false },
  { name: 'Personal Blog', path: '/personal-blog', available: false },
  { name: 'Privacy-Preserving RAG', path: '/privacy-rag', available: false },
  { name: 'Analyze File Structure', path: '/analyze-structure', available: true },
];
</script>

<style scoped>
.nav {
  width: 220px;
  background-color: #f8f9fa;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #e0e0e0;
  min-height: 100vh;
  box-sizing: border-box;
}

.nav-link {
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
  font-size: 18px;
  transition: color 0.3s, opacity 0.3s;
}

/* 鼠标悬浮效果 */
.nav-link:hover {
  text-decoration: underline;
}

/* 当前高亮页面 */
.active-link {
  color: #e74c3c;
  text-decoration: underline;
}

/* 未上线功能样式 */
.disabled-link {
  color: #bdc3c7;
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
</style>
