<template>
  <div style="padding: 20px;">

    <!-- 顶部标题（始终显示） -->
    <h1>我的网站</h1>

    <!-- 按钮区（始终显示） -->
    <div style="margin-bottom: 20px;">
      <router-link to="/">
        <button style="margin-right: 10px;">主页</button>
      </router-link>
      <router-link to="/about">
        <button style="margin-right: 10px;">关于页面</button>
      </router-link>
      <router-link to="/contact">
        <button>联系页面</button>
      </router-link>
    </div>

    <!-- 页面内容区（根据路由变化） -->
    <router-view />
    
  </div>
</template>

<script setup>
// Composition API 方式，暂时没有逻辑
</script>

<style scoped>
/* 暂时不加样式 */
</style>
