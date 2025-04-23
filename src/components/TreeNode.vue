<template>
  <div :style="{ marginLeft: `${depth * 20}px` }" class="mb-2">
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        :value="path"
        v-model="localSelected"
        class="w-4 h-4"
      />
      <span class="text-base font-medium text-gray-800">
        {{ isFolder ? '📁' : '📄' }} {{ name }}
      </span>
    </div>

    <!-- Query输入框 -->
    <div v-if="localSelected.includes(path)" class="ml-8 mt-1">
      <input
        type="text"
        v-model="queries[path]"
        placeholder="Enter query for this file/folder..."
        class="border border-gray-300 p-2 rounded-md w-80 text-sm"
      />
    </div>

    <!-- 文件内容展示（只展示文件且已选中） -->
    <div
      v-if="!isFolder && localSelected.includes(path) && fileMap[path]"
      class="ml-8 mt-2 p-3 border rounded-md bg-white text-xs text-gray-700 font-mono whitespace-pre-wrap max-h-64 overflow-auto"
    >
      <div v-if="fileContent[path] === undefined">Loading content...</div>
      <div v-else-if="fileContent[path] === null">⚠️ File too large to preview.</div>
      <div v-else>{{ fileContent[path] }}</div>
    </div>

    <!-- 子节点递归 -->
    <div v-if="isFolder">
      <TreeNode
        v-for="(child, childName) in node"
        :key="childName"
        :name="childName"
        :node="child"
        :path="`${path}/${childName}`"
        :queries="queries"
        :depth="depth + 1"
        :fileMap="fileMap"
        @update:queries="updateQueries"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  name: String,
  node: Object,
  path: String,
  queries: Object,
  fileMap: Object,
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:queries']);

const isFolder = computed(() => props.node !== null);
const localSelected = ref([]);
const fileContent = ref({});

// 监听选中文件加载内容
watch(localSelected, async () => {
  for (const filePath of localSelected.value) {
    if (!fileContent.value[filePath] && props.fileMap[filePath]) {
      const file = props.fileMap[filePath];
      if (file.size < 100 * 1024) {
        fileContent.value[filePath] = await file.text();
      } else {
        fileContent.value[filePath] = null;
      }
    }
  }
  updateQueries();
});

function updateQueries() {
  const newQueries = { ...props.queries };
  for (const key in newQueries) {
    if (!localSelected.value.includes(key)) {
      delete newQueries[key];
    }
  }
  emit('update:queries', newQueries);
}
</script>
