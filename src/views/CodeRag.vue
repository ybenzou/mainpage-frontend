<template>
    <div class="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      <h1 class="text-3xl font-bold mb-6">🧠 RAG-Code-Assistant – AI-Powered Coding Insights</h1>
  
      <!-- Intro Section -->
      <section class="mb-8">
        <p class="text-lg text-gray-700">
          <strong>RAG-Code-Assistant</strong> is a Retrieval-Augmented Generation (RAG) based code assistant that leverages your past GitHub repositories to provide personalized code completions, structural suggestions, and debugging ideas — aligned with your historical code style.
        </p>
      </section>
  
      <!-- Core Goals -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">🚀 Project Goals</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>Use your own GitHub repositories as the knowledge source</li>
          <li>Efficient semantic chunking and vector indexing</li>
          <li>Combine Qwen Embedding + Qwen LLM to generate personalized suggestions</li>
        </ul>
      </section>
  
      <!-- Tech Stack Table -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">🧱 Tech Stack</h2>
        <table class="table-auto border border-gray-300 text-sm w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2 text-left">Module</th>
              <th class="border px-4 py-2 text-left">Stack</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border px-4 py-2">Backend</td><td class="border px-4 py-2">Python + FastAPI</td></tr>
            <tr><td class="border px-4 py-2">Frontend</td><td class="border px-4 py-2">Vue 3 + Vite + Tailwind CSS</td></tr>
            <tr><td class="border px-4 py-2">Vector Engine</td><td class="border px-4 py-2">FAISS</td></tr>
            <tr><td class="border px-4 py-2">Embedding Model</td><td class="border px-4 py-2">Qwen Embedding</td></tr>
            <tr><td class="border px-4 py-2">LLM</td><td class="border px-4 py-2">Qwen LLM</td></tr>
            <tr><td class="border px-4 py-2">Data Source</td><td class="border px-4 py-2">Codebase + README + GitHub API</td></tr>
            <tr><td class="border px-4 py-2">Chunk Strategy</td><td class="border px-4 py-2">AST-based + Sliding Window</td></tr>
          </tbody>
        </table>
      </section>
  
      <!-- GitHub Sync -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">🔄 GitHub Sync & Incremental Embedding</h2>
        <p class="text-gray-700">
          The system uses GitHub API to fetch file structure and <code>blob sha</code> values for each file to perform efficient incremental embedding.
        </p>
        <ul class="list-decimal list-inside mt-2 space-y-1 text-sm">
          <li>Get file list & SHAs</li>
          <li>Compare with local embedding cache</li>
          <li>Only process changed or new files</li>
          <li>Update FAISS index and metadata</li>
        </ul>
      </section>
  
      <!-- Chunking -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">📦 Chunking Strategy</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>Function/class-based AST splitting</li>
          <li>Sliding window for large modules</li>
          <li>Paragraph-based chunking for README</li>
        </ul>
      </section>
  
      <!-- LLM Prompt Logic -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">🤖 LLM Prompt Logic</h2>
        <pre class="bg-gray-100 p-4 text-sm rounded border border-gray-300 overflow-x-auto">
  You are a senior code assistant. Here are some code snippets from my past projects:
  [Code A]
  [Code B]
  ...
  
  Now I’m facing this problem:
  [User’s question]
  
  Please provide suggestions, code solutions, or debugging ideas based on my code style and logic.
        </pre>
      </section>
  
      <!-- Features -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">📌 Key Features</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>✅ GitHub login & repo import</li>
          <li>✅ Multi-project support</li>
          <li>✅ Embedding cache to avoid reprocessing</li>
          <li>✅ Vector status dashboard</li>
          <li>✅ Exportable vectors for local use</li>
        </ul>
      </section>
  
      <!-- Iteration Plan -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">📅 Iteration Plan</h2>
        <ul class="list-inside space-y-1 text-sm">
          <li><strong>V1</strong>: Manual upload + FAISS + Qwen LLM</li>
          <li><strong>V2</strong>: GitHub API integration + caching</li>
          <li><strong>V3</strong>: UI dashboard + feedback</li>
          <li><strong>V4</strong>: VS Code plugin / CLI + WebSocket support</li>
        </ul>
      </section>
  
      <!-- Comparison Images -->
      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4">📷 Output Comparison (with vs. without RAG)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src="/code-rag-1.jpg" alt="Without RAG" class="rounded shadow w-full" />
            <p class="text-sm text-center mt-2 text-gray-500">Without RAG</p>
          </div>
          <div>
            <img src="/code-rag-2.jpg" alt="With RAG" class="rounded shadow w-full" />
            <p class="text-sm text-center mt-2 text-gray-500">With RAG</p>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <div class="bg-yellow-50 border border-yellow-300 p-4 rounded text-sm text-yellow-800">
        🎉 Open to collaboration, contributions, or issues. Let’s build the future of coding together.
      </div>
    </div>
  </template>
  
  <script setup>
  // Static display only
  </script>
  