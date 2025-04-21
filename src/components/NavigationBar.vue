<template>
  <nav class="nav">
    <router-link to="/" class="nav-link" exact-active-class="active-link">Home</router-link>
    <router-link to="/distributed-task-queue" class="nav-link" exact-active-class="active-link">Distributed Task Queue</router-link>
    <router-link to="/personal-blog" class="nav-link" exact-active-class="active-link">Personal Blog</router-link>
    <router-link to="/privacy-rag" class="nav-link" exact-active-class="active-link">Privacy-Preserving RAG</router-link>
  </nav>
</template>

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
  transition: color 0.3s;
}

.nav-link:hover {
  text-decoration: underline;
}

/* 高亮当前页面 */
.active-link {
  color: #e74c3c;
  text-decoration: underline;
}
</style>
