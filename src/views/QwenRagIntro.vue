<template>
  <div class="p-8 max-w-3xl mx-auto space-y-6 text-gray-800">
    <h1 class="text-3xl font-bold text-blue-700">🔍 Qwen RAG Light</h1>
    <p class="text-lg">
      This project is a lightweight local Retrieval-Augmented Generation (RAG) system powered by Qwen API. It supports multi-format document processing, vector caching, and Qwen Turbo-based answering.
    </p>
    <ul class="list-disc pl-5 space-y-2">
      <li>Supports document formats: <code>.txt</code>, <code>.pdf</code>, <code>.md</code>, <code>.docx</code></li>
      <li>Generates embeddings using Qwen's <code>text-embedding-v1</code> model</li>
      <li>Accelerates retrieval using cached vectors</li>
      <li>Integrates with Qwen Turbo for final answer generation</li>
    </ul>
    <div class="border-t pt-4">
      <p class="text-sm text-gray-500">🔗 GitHub Repository:</p>
      <a
        href="https://github.com/ybenzou/qwen-rag-light"
        class="text-blue-500 underline hover:text-blue-700"
        target="_blank"
      >
        github.com/ybenzou/qwen-rag-light
      </a>
    </div>
  </div>
</template>

<script setup>
</script>
