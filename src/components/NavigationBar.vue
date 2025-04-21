<template>
  <nav class="nav">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.nav-link {
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
  font-size: 18px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
