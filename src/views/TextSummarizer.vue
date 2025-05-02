<template>
  <div class="max-w-4xl mx-auto p-8 space-y-8 text-gray-800">
    <!-- 标题 -->
    <h1 class="text-4xl font-bold">📝 Text Summarizer</h1>

    <!-- 简要介绍 -->
    <p>
      This summarization system is a full-stack project designed to generate concise summaries from long-form text. It combines a FastAPI backend with a Vue 3 + TailwindCSS frontend, and is optimized for both usability and local deployment.
    </p>

    <!-- 项目结构图示 -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">🚀 Live Demo</h2>
      <img src="/textsum-demo.png" alt="Text Summarizer Demo" class="rounded-lg shadow-lg border" />
      <p class="text-gray-600">
        The image above shows the real interface of the application, where users can input long documents and receive high-quality summaries in seconds.
      </p>
    </div>

    <!-- 功能与结构介绍 -->
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">🔧 Project Features & Structure</h2>
        <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li><strong>Full-Stack Design:</strong> Combines a responsive Vue 3 + Tailwind frontend with a FastAPI backend for API serving.</li>
        <li><strong>Docker Deployment:</strong> The entire project can be deployed locally or on the cloud with a single <code>docker-compose up</code> command.</li>
        <li><strong>Parallel Inference:</strong> The backend supports concurrent summarization requests using asynchronous FastAPI routes.</li>
        <li><strong>Multi-stage Summarization:</strong> Long documents are first split into smaller segments. Summaries are generated at both chunk-level and document-level using a hierarchical strategy, improving both coherence and coverage.</li>
        <li><strong>Model Handling:</strong> Loads a fine-tuned <code>T5</code> model via HuggingFace Transformers. Easy to swap or fine-tune new models.</li>
        <li><strong>Fine-tuning Ready:</strong> Includes training scripts and guidance to fine-tune summarization models on your own datasets.</li>
        <li><strong>Offline Privacy-Preserving:</strong> All inference is done locally—suitable for confidential documents and offline environments.</li>
        <li><strong>Extensible Architecture:</strong> Can be extended to tasks like translation, question answering, or classification with minimal changes.</li>
        </ul>
    </div>

    <!-- GitHub 链接 -->
    <div>
      <h2 class="text-2xl font-semibold mt-6">📦 GitHub Repository</h2>
      <a href="https://github.com/ybenzou/textsum" target="_blank" class="text-blue-600 underline break-words">
        https://github.com/ybenzou/textsum
      </a>
    </div>
  </div>
</template>
