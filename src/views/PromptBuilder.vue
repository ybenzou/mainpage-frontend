<template>
  <div class="flex h-screen">
    <!-- 左侧: 文件选择与操作 -->
    <div class="left-panel">
      <h1 class="title">🛠️ Prompt Builder</h1>

      <div class="control-group">
        <input
          type="file"
          webkitdirectory
          directory
          multiple
          @change="handleFolderSelect"
        />
        <button
          class="generate-btn"
          @click="generatePrompt"
          :disabled="!tree"
        >
          🚀 Generate Prompt
        </button>
      </div>

      <div v-if="loading" class="text-center" style="color: #409eff;">Analyzing folder...</div>

      <div v-else-if="tree" class="flex-1 overflow-auto">
        <template v-for="(node, name) in tree" :key="name">
          <TreeNode
            :name="name"
            :node="node"
            :path="name"
            v-model:queries="queries"
          />
        </template>
      </div>
    </div>

    <!-- 右侧: Prompt 结果展示 -->
    <div class="right-panel">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">📝 Generated Prompt</h2>
        <button
          class="copy-btn"
          @click="copyPrompt"
          :disabled="!prompt"
        >
          📋 Copy Prompt
        </button>
      </div>

      <div class="prompt-area">
        {{ prompt || 'No prompt generated yet.' }}
      </div>

      <div v-if="copied" class="copied-tip">✅ Copied to clipboard!</div>
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

const ignoreList = new Set([
  '.git', 'node_modules', '.DS_Store', '__pycache__', '.ipynb_checkpoints', '.vscode', '.idea'
]);

function handleFolderSelect(event) {
  const files = Array.from(event.target.files);
  loading.value = true;
  setTimeout(() => {
    tree.value = buildTree(files);
    loading.value = false;
  }, 300);
}

function buildTree(files) {
  const root = {};
  files.forEach(file => {
    const parts = file.webkitRelativePath.split('/');
    let current = root;
    if (parts.some(part => ignoreList.has(part))) return;
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

function generatePrompt() {
  prompt.value = 'Project Structure with Queries:\n' + formatTreeWithQueries(tree.value);
  copied.value = false;
}

function formatTreeWithQueries(node, depth = 0, prefix = '') {
  let output = '';
  for (const key in node) {
    const fullPath = prefix ? `${prefix}/${key}` : key;
    const isFolder = node[key] !== null;
    output += '    '.repeat(depth) + (isFolder ? '📁 ' : '📄 ') + key;
    if (!isFolder && queries.value[fullPath]) {
      output += `  --> ${queries.value[fullPath].trim()}`;
    }
    output += '\n';
    if (isFolder) {
      output += formatTreeWithQueries(node[key], depth + 1, fullPath);
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

<style scoped>
/* 整体左右分栏布局 */
.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

/* 左侧栏样式 */
.left-panel {
  width: 33.3333%;
  background-color: #f5f5f5;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 右侧栏样式 */
.right-panel {
  width: 66.6666%;
  background-color: #ffffff;
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 标题 */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}

/* 上传框和按钮区域 */
.control-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

/* 输入框美化 */
input[type="file"] {
  border: 1px solid #cccccc;
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
}

input[type="file"]:hover {
  border-color: #409eff;
}

/* 普通按钮样式 */
button {
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* 上传按钮、生成按钮、复制按钮不同颜色 */
.generate-btn {
  background-color: #409eff;
  color: white;
}

.generate-btn:hover {
  background-color: #337ab7;
}

.copy-btn {
  background-color: #67c23a;
  color: white;
}

.copy-btn:hover {
  background-color: #529b2e;
}

/* 生成Prompt结果外框 */
.prompt-area {
  flex: 1;
  background-color: #fafafa;
  padding: 24px;
  border-radius: 8px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  white-space: pre-wrap;
  overflow-y: auto;
}

/* Copied小提示 */
.copied-tip {
  color: #67c23a;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
}

/* 美化滚动条 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(150, 150, 150, 0.4);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(150, 150, 150, 0.7);
}
</style>
