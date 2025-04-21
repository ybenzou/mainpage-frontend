<template>
  <div class="app-layout">
    <NavigationBar />
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 右边主页面区域 */
.page-content {
  flex: 1;
  padding: 40px;
}
</style>
