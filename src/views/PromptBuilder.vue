<template>
  <div class="flex h-screen">
    <!-- 左侧: 文件上传和生成 -->
    <div class="w-[45%] bg-gray-100 p-6 flex flex-col overflow-auto">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">🛠️ Prompt Builder</h1>

      <div class="flex flex-col items-center gap-4 mb-6">
        <input
          type="file"
          webkitdirectory
          directory
          multiple
          @change="handleFolderSelect"
          class="border border-gray-300 rounded-md p-2 w-full text-sm hover:border-blue-400 cursor-pointer"
        />
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition"
          @click="generatePrompt"
          :disabled="!tree"
        >
          🚀 Generate Prompt
        </button>
      </div>

      <div v-if="loading" class="text-center text-blue-600 text-base mt-4">Analyzing folder...</div>

      <div v-else-if="tree" class="flex-1 overflow-auto">
        <template v-for="(node, name) in tree" :key="name">
          <TreeNode
            :name="name"
            :node="node"
            :path="name"
            v-model:queries="queries"
            :fileMap="fileMap"
          />
        </template>
      </div>
    </div>

    <!-- 右侧: Prompt展示 -->
    <div class="w-[55%] bg-white p-8 flex flex-col overflow-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">📝 Generated Prompt</h2>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-green-700 transition transform hover:scale-105"
          @click="copyPrompt"
          :disabled="!prompt"
        >
          📋 Copy
        </button>
      </div>

      <div class="flex-1 bg-gray-50 p-6 rounded-md shadow-inner overflow-auto text-sm font-mono whitespace-pre-wrap leading-relaxed text-gray-700">
        {{ prompt || 'No prompt generated yet.' }}
      </div>

      <div
        v-if="copied"
        class="text-green-600 text-center mt-4 text-sm transition-opacity duration-500"
      >
        ✅ Copied to clipboard!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TreeNode from '../components/TreeNode.vue';

const tree = ref(null);
const queries = ref({});
const loading = ref(false);
const prompt = ref('');
const copied = ref(false);
const fileMap = ref({});  // 存储所有文件路径 => File 对象

const ignoreList = new Set([
  '.git', 'node_modules', '.DS_Store', '__pycache__', '.ipynb_checkpoints', '.vscode', '.idea'
]);

function handleFolderSelect(event) {
  const files = Array.from(event.target.files);
  loading.value = true;

  // 构建文件结构 + 保存文件内容
  setTimeout(() => {
    const root = {};
    files.forEach(file => {
      const parts = file.webkitRelativePath.split('/');
      if (parts.some(part => ignoreList.has(part))) return;

      fileMap.value[file.webkitRelativePath] = file;  // 保存 file 内容

      let current = root;
      parts.forEach((part, idx) => {
        if (!current[part]) {
          current[part] = idx === parts.length - 1 ? null : {};
        }
        if (current[part] !== null) {
          current = current[part];
        }
      });
    });
    tree.value = root;
    loading.value = false;
  }, 300);
}

async function generatePrompt() {
  copied.value = false;

  const structure = '🗂 Project Structure:\n' + formatTree(tree.value);
  let querySection = '📝 User Queries:\n';
  let fileSection = '📄 File Contents:\n';

  for (const path in queries.value) {
    const query = queries.value[path].trim();
    if (query) {
      querySection += `- [${path}] ${query}\n`;

      if (fileMap.value[path] && fileMap.value[path].size < 100 * 1024) {
        const content = await fileMap.value[path].text();
        fileSection += `--- ${path} ---\n${content.trim()}\n--- end ---\n\n`;
      } else {
        fileSection += `--- ${path} ---\n⚠️ File too large or missing. Skipped content.\n--- end ---\n\n`;
      }
    }
  }

  prompt.value = `${structure}\n\n${querySection}\n\n${fileSection}`;
}

function formatTree(node, depth = 0, prefix = '') {
  let output = '';
  for (const key in node) {
    const isFolder = node[key] !== null;
    const fullPath = prefix ? `${prefix}/${key}` : key;
    output += '    '.repeat(depth) + (isFolder ? '📁 ' : '📄 ') + key + '\n';
    if (isFolder) {
      output += formatTree(node[key], depth + 1, fullPath);
    }
  }
  return output;
}

function copyPrompt() {
  if (!prompt.value) return;
  navigator.clipboard.writeText(prompt.value).then(() => {
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  });
}
</script>
