<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">📦 Distributed Task Queue Demo</h1>

    <!-- 输入任务描述 -->
    <div class="space-y-2">
      <label class="block text-sm text-gray-700">📝 Task Description:</label>
      <input
        v-model="taskDescription"
        placeholder="e.g., compress image"
        class="border p-2 w-full rounded-md"
      />
    </div>

    <!-- 提交按钮 -->
    <button
      @click="submitTask"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      ➕ Submit Task
    </button>

    <!-- 当前任务信息 -->
    <div v-if="taskId" class="space-y-2 mt-6">
      <p class="text-sm text-gray-700">🆔 Task ID: <code>{{ taskId }}</code></p>
      <p class="text-sm text-gray-700">⏳ Status: {{ status }}</p>
      <p v-if="result" class="text-sm text-gray-800 bg-gray-100 p-2 rounded-md">
        📋 Result: {{ result }}
      </p>
    </div>

    <!-- 所有任务列表 -->
    <div v-if="taskList.length" class="mt-6">
      <h2 class="text-lg font-semibold text-gray-700">🗂️ All Tasks:</h2>
      <ul class="list-disc pl-6 text-sm text-gray-600">
        <li v-for="id in taskList" :key="id">
          <button class="text-blue-600 hover:underline" @click="loadTask(id)">
            {{ id }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDescription: '',
      taskId: '',
      status: '',
      result: '',
      intervalId: null,
      taskList: [],
    };
  },
  methods: {
    async submitTask() {
      const res = await fetch('https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/submit-task', {
        method: 'POST',
        body: JSON.stringify({ description: this.taskDescription }),
      });
      const data = await res.json();
      this.taskId = data.task_id;
      this.status = 'queued';
      this.result = '';
      this.startPolling();
      this.fetchTaskList();
    },
    async pollStatus() {
      if (!this.taskId) return;
      const res = await fetch(`https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/task-status?task_id=${this.taskId}`);
      const data = await res.json();
      this.status = data.status;
      if (data.result) {
        this.result = data.result;
        clearInterval(this.intervalId);
      }
    },
    startPolling() {
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(this.pollStatus, 300000);
    },
    async fetchTaskList() {
      const res = await fetch('https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/task-list');
      const data = await res.json();
      this.taskList = data.tasks || [];
    },
    async loadTask(taskId) {
      this.taskId = taskId;
      this.status = '';
      this.result = '';
      this.startPolling();
    }
  },
  mounted() {
    this.fetchTaskList();
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
};
</script>
