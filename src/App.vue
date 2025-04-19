<template>
  <div style="padding: 20px;">
    <h1>我的主页</h1>

    <!-- 展示框 -->
    <div style="border: 1px solid gray; padding: 20px; margin-bottom: 20px;">
      <h2>展示框</h2>
      <p>这里将来展示后端的数据</p>
    </div>

    <!-- 按钮区 -->
    <div>
      <h2>跳转按钮</h2>
      <router-link to="/about">
        <button style="margin-right: 10px;">关于页面</button>
      </router-link>
      <router-link to="/contact">
        <button>联系页面</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Composition API 方式，暂时没有逻辑
</script>

<style scoped>
/* 暂时不用加样式 */
</style>
