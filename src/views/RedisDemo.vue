<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">🧠 Redis Demo with Upstash</h1>

    <div class="space-y-2">
      <input
        v-model="key"
        placeholder="Key"
        class="border p-2 rounded-md w-full"
      />
      <input
        v-model="value"
        placeholder="Value"
        class="border p-2 rounded-md w-full"
      />
    </div>

    <div class="flex gap-4">
      <button
        @click="setKey"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Set Key
      </button>
      <button
        @click="getKey"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔍 Get Key
      </button>
    </div>

    <div class="bg-gray-100 border rounded-md p-4 text-sm text-gray-700">
      <p class="font-semibold">Response:</p>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '',
      value: '',
      response: '',
    };
  },
  methods: {
    async setKey() {
      const res = await fetch('https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/redis-demo', {
        method: 'POST',
        body: JSON.stringify({ action: 'set', key: this.key, value: this.value }),
      });
      const data = await res.json();
      this.response = data.message || JSON.stringify(data);
    },
    async getKey() {
      const res = await fetch('https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/redis-demo', {
        method: 'POST',
        body: JSON.stringify({ action: 'get', key: this.key }),
      });
      const data = await res.json();
      this.response = data.message || JSON.stringify(data);
    },
  },
};
</script>
