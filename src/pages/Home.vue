<template>
  <section style="margin-top: 40px;">
    <h2 style="text-align: center;">My Resume</h2>
    <div style="display: flex; justify-content: center; margin-top: 20px;">
      <iframe src="/myresume.pdf" width="800" height="1000" style="border: none;"></iframe>
    </div>

    <section style="margin-top: 40px;">
      <h2>Projects</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
        <router-link to="/distributed-task-queue">
          <button class="nav-button">Distributed Task Queue</button>
        </router-link>
        <!-- 未来可以继续添加其他项目 -->
      </div>
    </section>
  </section>
</template>

<script setup>
// 暂无逻辑
</script>

<style scoped>
.nav-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #2980b9;
}
</style>
