<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8 text-gray-800">
    <h1 class="text-4xl font-bold text-blue-700 text-center">🔍 Qwen RAG Light</h1>

    <p class="text-lg text-center max-w-2xl mx-auto text-gray-600">
      A lightweight local Retrieval-Augmented Generation (RAG) system powered by Qwen API.
      Supports multi-format documents, cached vector retrieval, and Qwen Turbo generation.
    </p>

    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div class="space-y-4">
        <ul class="list-disc pl-5 space-y-2 text-base">
          <li>Supports <code>.txt</code>, <code>.pdf</code>, <code>.md</code>, <code>.docx</code> documents</li>
          <li>Embeds text using Qwen's <code>text-embedding-v1</code> model</li>
          <li>Accelerates retrieval via cached vectors</li>
          <li>Integrates with Qwen Turbo for answer generation</li>
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

      <div class="flex justify-center">
        <img
          src="/qwen-demo.png"
          alt="Qwen RAG Demo"
          class="rounded-xl shadow-lg border border-gray-200 w-full max-w-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
