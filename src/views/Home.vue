<template>
  <div class="max-w-3xl mx-auto text-center p-8">
    <!-- 头像 -->
    <img src="/myphoto.jpg" alt="Avatar" class="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md" />

    <!-- 名字 -->
    <h1 class="text-4xl font-bold text-gray-800 mb-2">Yuanben Zou</h1>

    <!-- 一句话介绍 -->
    <p class="text-gray-500 text-lg mb-4">Passionate about AI and Software Development</p>

    <!-- 邮箱展示 -->
    <p class="text-sm text-gray-600 mb-8">
      📧 <a href="mailto:ybenzou95@gmail.com" class="text-blue-600 hover:underline">ybenzou95@gmail.com</a>
    </p>

    <!-- 按钮组 -->
    <div class="flex justify-center gap-4 mb-10">
      <a href="https://github.com/ybenzou" target="_blank" class="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        🌐 Visit GitHub
      </a>
      <a href="/myresume.pdf" target="_blank" class="inline-block bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition">
        📄 Download Resume
      </a>
    </div>

    <!-- 项目列表 -->
    <div class="text-left mt-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">🧩 Featured Projects</h2>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 text-lg">
      </ul>
    </div>
  </div>
</template>
