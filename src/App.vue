<template>
  <div style="padding: 40px; max-width: 1000px; margin: 0 auto;">

    <!-- 顶部个人信息 -->
    <section style="text-align: center; margin-bottom: 40px;">
    <img src="@/assets/myphoto.jpg" alt="YUANBEN" style="border-radius: 50%; width: 100px; height: 100px;">
      <h1 style="margin-top: 20px;">Hi, I'm Yuanben Zou</h1>
      <p>Passionate about AI and Software.</p>
    </section>
    
    <a href="/assets/myresume.pdf" target="_blank">
      <button class="nav-button">Download Resume</button>
    </a>
    <!-- 项目导航 -->
    <section style="margin-bottom: 40px;">
      <h2>Projects</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
        <router-link to="/distributed-task-queue">
          <button class="nav-button">Distributed Task Queue</button>
        </router-link>
        <!-- 未来可以继续添加其他项目 -->
      </div>
    </section>

    <!-- 其他页面导航 -->
    <section>
      <h2>Site Navigation</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
        <router-link to="/">
          <button class="nav-button">Home</button>
        </router-link>
        <router-link to="/about">
          <button class="nav-button">About</button>
        </router-link>
        <router-link to="/contact">
          <button class="nav-button">Contact</button>
        </router-link>
      </div>
    </section>

  </div>
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
