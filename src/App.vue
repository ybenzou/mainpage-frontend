<template>
  <div class="app-container">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'
</script>

<style scoped>
.app-container {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 20px;
}
</style>
