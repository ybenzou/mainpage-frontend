<template>
  <div class="home-container">
    <img src="/myphoto.jpg" alt="Avatar" class="avatar" />
    <h1>Yuanben Zou</h1>
    <p class="subtitle">Passionate about AI and Software Development</p>

    <iframe src="/myresume.pdf" width="100%" height="800px" style="border: none;"></iframe>


    <section class="projects">
      <h2>Projects</h2>
      <ul>
        <li>Distributed Task Queue System</li>
        <li>Personal Blog System</li>
        <li>Privacy-Preserving RAG Framework</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.buttons {
  margin-bottom: 40px;
}

.button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2980b9;
}

.projects {
  text-align: left;
  margin-top: 40px;
}

.projects h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.projects ul {
  list-style: disc;
  padding-left: 20px;
}
</style>
