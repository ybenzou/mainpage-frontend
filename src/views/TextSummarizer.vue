<template>
  <div class="max-w-5xl mx-auto p-8 space-y-16 text-gray-800">
    <!-- 标题 -->
    <header class="space-y-2 text-center">
      <h1 class="text-4xl font-bold">🧠 Summarizer System</h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        A hierarchical summarization system powered by FastAPI and Vue 3. Designed for long-text documents, logic-chain visualization, and offline deployment.
      </p>
    </header>

    <!-- 输入界面 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">📥 User Input Interface</h2>
      <img src="/textsum-0.jpg" alt="Input Interface" class="rounded-lg shadow border" />
      <p class="text-gray-600">
        Users can upload a PDF or paste long text directly into the input area. The backend handles token-based chunking automatically.
      </p>
    </section>

    <!-- 输出界面 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">📤 Final Output View & 🔗 Logical Chain</h2>
      <img src="/textsum-1.jpg" alt="Final Summary Result" class="rounded-lg shadow border" />
      <p class="text-gray-600">
        The summarizer performs recursive multi-stage summarization. Final summary is shown first, followed by layered summaries from lower levels. 
        Each summary block is visually linked to its sources, forming a clear logic chain that explains how the model builds understanding step by step.
      </p>
    </section>

    <!-- 基础摘要单元展示 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">📄 Basic Summary Unit</h2>
      <img src="/textsum-2.jpg" alt="Basic Summary Unit Example" class="rounded-lg shadow border" />
      <p class="text-gray-600">
        Each block here represents a basic summarization result from a single text chunk. These atomic units are the foundation of the hierarchical summarization chain, feeding into higher-level summaries.
      </p>
    </section>

    <!-- 项目功能和结构 -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">🔧 Features & Structure</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li><strong>Full-stack design:</strong> Vue 3 + TailwindCSS frontend, FastAPI backend.</li>
        <li><strong>Dockerized deployment:</strong> Local-first, 1-command setup with <code>docker-compose up</code>.</li>
        <li><strong>Recursive summarization:</strong> Performs hierarchical summarization across multiple levels, from chunk-level to document-level.</li>
        <li><strong>Logic chain visualization:</strong> Every high-level summary block traces back to its source chunks, enabling transparent and interpretable summarization with provenance tracking.</li>
        <li><strong>Model integration:</strong> Uses HuggingFace Transformers (e.g., T5) with token-based chunking support.</li>
        <li><strong>Offline support:</strong> Fully functional without internet, ideal for private documents or local use.</li>
        <li><strong>Extensible architecture:</strong> Easily adaptable for classification, Q&A, translation, or RAG workflows.</li>
      </ul>
    </section>


    <!-- GitHub 链接 -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">📦 GitHub Repository</h2>
      <a
        href="https://github.com/ybenzou/textsum"
        target="_blank"
        class="text-blue-600 underline break-words text-lg"
      >
        https://github.com/ybenzou/textsum
      </a>
      <p class="text-gray-500 text-sm">
        Clone and run locally. Requires Python + Node + Docker.
      </p>
    </section>
  </div>
</template>

<script setup>
// 静态内容页面，无需逻辑脚本
</script>
