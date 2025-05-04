<template>
    <div class="px-4 py-8 md:px-10 md:py-12 max-w-4xl mx-auto space-y-12 text-gray-800">
  
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent">
          🚀 Git Auto Commit Assistant
        </h1>
        <p class="text-gray-600 text-lg">Automate your Git commit workflow with AI + CLI power.</p>
      </div>
  
      <!-- Image Card on Top -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <img src="/auto-commit-demo.png" alt="Auto Commit Demo" class="w-full object-cover max-h-[360px]" />
        <p class="text-sm text-gray-400 text-center py-2">📸 Example of auto-generated commit flow</p>
      </div>
  
      <!-- Overview -->
      <div class="space-y-3">
        <h2 class="text-2xl font-semibold text-indigo-700">⚡ Overview</h2>
        <p>
          This tool combines the Gemini LLM and Git CLI to detect local file changes and generate structured, expressive
          commit messages. It automatically adds metadata such as versioning, timestamp, author, and environment info.
        </p>
        <p>
          Designed for developers and teams who value automation and consistency across commit history.
        </p>
      </div>
  
      <!-- Features -->
      <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-md shadow space-y-2">
        <h2 class="text-xl font-semibold text-indigo-700">🔧 Key Features</h2>
        <ul class="list-disc pl-6 space-y-1 text-gray-700">
          <li>Detects staged, unstaged, and untracked files</li>
          <li>Uses actual <code>git diff</code> output for semantic insights</li>
          <li>Generates one-line, Conventional Commit-style messages</li>
          <li>Appends version, timestamp, author, and Python environment info</li>
        </ul>
      </div>
  
      <!-- Usage -->
      <div class="space-y-3">
        <h2 class="text-xl font-semibold text-indigo-700">📦 How to Use</h2>
        <ol class="list-decimal pl-6 space-y-1 text-gray-700">
          <li>Install dependencies: <code>pip install -r requirements.txt</code></li>
          <li>Configure <code>.env</code> with your Gemini API key</li>
          <li>Run it locally: <code>python commit_planner.py</code></li>
          <li>Or use the global CLI shortcut: <code>gcom</code></li>
        </ol>
      </div>
  
      <!-- Global Setup -->
      <div class="space-y-3">
        <h2 class="text-xl font-semibold text-indigo-700">🌐 Global Setup (CLI Shortcut)</h2>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>mkdir -p ~/Tools
  echo '#!/bin/bash\npython /your/path/to/commit_planner.py' > ~/Tools/gcom
  chmod +x ~/Tools/gcom
  sudo ln -s ~/Tools/gcom /usr/local/bin/gcom</code></pre>
        <p class="text-gray-500 text-sm">
          After setup, just run <code>gcom</code> in any Git repo to generate commit messages using AI.
        </p>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "AutoCommit"
  }
  </script>
  