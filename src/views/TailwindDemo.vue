<template>
  <div class="min-h-screen bg-gray-100 p-8 space-y-8">

    <!-- 标题区域 -->
    <section class="text-center space-y-2">
      <h1 class="text-4xl font-bold text-gray-800">🚀 TailwindCSS Demo Page</h1>
      <p class="text-lg text-gray-500">Testing Tailwind utilities and components</p>
      <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Tailwind 100% Working</span>
    </section>

    <!-- 按钮组 -->
    <section class="flex flex-wrap justify-center gap-4">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Primary</button>
      <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Success</button>
      <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Danger</button>
      <button class="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed" disabled>Disabled</button>
    </section>

    <!-- 表单区 -->
    <section class="bg-white p-6 rounded-md shadow-md max-w-xl mx-auto space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Contact Form</h2>
      <input type="text" placeholder="Your Name" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input type="email" placeholder="Your Email" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <select class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option>Select a topic</option>
        <option>Feedback</option>
        <option>Support</option>
        <option>Others</option>
      </select>
      <textarea rows="4" placeholder="Your Message" class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox text-blue-600" />
        <span class="ml-2 text-gray-600">Subscribe to newsletter</span>
      </label>
      <button class="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Submit</button>
    </section>

    <!-- 卡片区 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
        <h3 class="text-xl font-bold mb-2">Card One</h3>
        <p class="text-gray-600">Tailwind utility based card design with smooth hover effects.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
        <h3 class="text-xl font-bold mb-2">Card Two</h3>
        <p class="text-gray-600">Easily compose and scale UI components with Tailwind.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
        <h3 class="text-xl font-bold mb-2">Card Three</h3>
        <p class="text-gray-600">Amazing flexibility to create responsive layouts effortlessly.</p>
      </div>
    </section>

    <!-- 通知/alert -->
    <section class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-xl mx-auto" role="alert">
      <p class="font-bold">Warning</p>
      <p>Make sure you configure your Tailwind properly!</p>
    </section>

    <!-- 列表+头像 -->
    <section class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      <div class="flex items-center space-x-4">
        <img class="h-12 w-12 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar">
        <div>
          <div class="text-xl font-medium text-black">John Doe</div>
          <p class="text-gray-500">Frontend Developer</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <img class="h-12 w-12 rounded-full object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar">
        <div>
          <div class="text-xl font-medium text-black">Jane Smith</div>
          <p class="text-gray-500">UI/UX Designer</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="text-center text-gray-500 text-sm mt-12">
      Made with ❤️ using TailwindCSS
    </footer>

  </div>
</template>
