<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">📂 Project Structure Analyzer</h1>
    
    <div class="flex flex-col items-center mb-8">
      <input
        type="file"
        webkitdirectory
        directory
        multiple
        @change="handleFolderSelect"
        class="border p-3 rounded-md shadow-sm cursor-pointer hover:border-blue-500 transition"
      />
      <p class="text-gray-500 mt-2 text-sm">Select a local folder to generate its structure</p>
    </div>

    <div v-if="loading" class="text-center text-blue-600">Analyzing folder...</div>

    <div v-else-if="fileStructure" class="bg-gray-100 p-6 rounded-md shadow-inner overflow-auto">
      <pre class="whitespace-pre-wrap text-sm">{{ fileStructure }}</pre>
    </div>

    <div v-else class="text-center text-gray-400">No structure to display yet.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileStructure = ref('');
const loading = ref(false);

const ignoreList = new Set([
  '.git', 'node_modules', '.DS_Store',
  '__pycache__', '.ipynb_checkpoints', '.vscode', '.idea'
]);

function handleFolderSelect(event) {
  const files = Array.from(event.target.files);
  loading.value = true;
  setTimeout(() => {  // add a slight delay for smooth UX
    const tree = buildTree(files);
    fileStructure.value = formatTree(tree);
    loading.value = false;
  }, 300);
}

function buildTree(files) {
  const root = {};

  files.forEach(file => {
    const parts = file.webkitRelativePath.split('/');
    let current = root;
    let shouldIgnore = parts.some(part => ignoreList.has(part));

    if (shouldIgnore) return;

    parts.forEach((part, idx) => {
      if (!current[part]) {
        current[part] = idx === parts.length - 1 ? null : {};
      }
      if (current[part] !== null) {
        current = current[part];
      }
    });
  });

  return root;
}

function formatTree(tree, depth = 0) {
  let output = '';
  for (const key in tree) {
    const isFolder = tree[key] !== null;
    const icon = isFolder ? '📁' : '📄';
    output += '    '.repeat(depth) + `${icon} ${key}${isFolder ? '/' : ''}\n`;
    if (isFolder) {
      output += formatTree(tree[key], depth + 1);
    }
  }
  return output;
}
</script>

<style scoped>
/* Optional: custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.7);
}
</style>
