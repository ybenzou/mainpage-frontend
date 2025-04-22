<template>
  <div :style="{ marginLeft: `${depth * 20}px` }" class="mb-2">
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        :value="path"
        v-model="localSelected"
        class="w-4 h-4"
      />
      <span class="text-base">{{ isFolder ? '📁' : '📄' }} {{ name }}</span>
    </div>

    <div v-if="localSelected.includes(path)" class="ml-8 mt-1">
      <input
        type="text"
        v-model="queries[path]"
        placeholder="Enter query for this file/folder..."
        class="border p-2 rounded-md w-72 text-sm"
      />
    </div>

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

const isFolder = computed(() => props.node !== null);

const localSelected = ref([]);

watch(localSelected, () => {
  emitUpdate();
});

function updateQueries(newQueries) {
  emit('update:queries', newQueries);
}

function emitUpdate() {
  const newQueries = { ...props.queries };
  for (const key in newQueries) {
    if (!localSelected.value.includes(key)) {
      delete newQueries[key];
    }
  }
  emit('update:queries', newQueries);
}
</script>
