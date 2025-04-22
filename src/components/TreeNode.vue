<template>
  <div :style="{ marginLeft: `${depth * 20}px` }" class="node-item">
    <!-- 文件/文件夹的 checkbox + 名字 -->
    <div class="node-header">
      <input
        type="checkbox"
        :value="path"
        v-model="localSelected"
        class="node-checkbox"
      />
      <span class="node-name">{{ isFolder ? '📁' : '📄' }} {{ name }}</span>
    </div>

    <!-- 选中了才显示 query输入框 -->
    <div v-if="localSelected.includes(path)" class="query-wrapper">
      <input
        type="text"
        v-model="queries[path]"
        placeholder="Enter your query for this file/folder..."
        class="query-input"
      />
    </div>

    <!-- 如果是文件夹，递归子节点 -->
    <div v-if="isFolder">
      <TreeNode
        v-for="(child, childName) in node"
        :key="childName"
        :name="childName"
        :node="child"
        :path="`${path}/${childName}`"
        :queries="queries"
        :depth="depth + 1"
        @update:queries="updateQueries"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Props
const props = defineProps({
  name: String,
  node: Object,
  path: String,
  queries: Object,
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:queries']);

// 是否是文件夹
const isFolder = computed(() => props.node !== null);

// 本地checkbox选择
const localSelected = ref([]);

// 监听勾选变化
watch(localSelected, () => {
  updateQueries();
});

// 处理子组件传回queries
function updateQueries(newQueries) {
  emit('update:queries', newQueries || props.queries);
}
</script>

<style scoped>
/* 每个节点的外层 */
.node-item {
  margin-bottom: 8px;
}

/* checkbox + 文件名 排列 */
.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

/* checkbox大一点，方便点 */
.node-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 文件/文件夹名 */
.node-name {
  font-size: 16px;
  color: #444;
}

/* query输入框区域 */
.query-wrapper {
  margin-left: 26px;
  margin-top: 6px;
}

/* 输入框本身美化 */
.query-input {
  width: 85%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.query-input:focus {
  border-color: #409eff;
}
</style>
