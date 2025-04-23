<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">🛠️ Git Command Generator</h1>

    <!-- Git type selector -->
    <div class="flex gap-4 items-center">
      <label class="text-gray-700 text-sm">Commit Type:</label>
      <select v-model="commitType" class="border p-2 rounded-md text-sm">
        <option>feat</option>
        <option>fix</option>
        <option>docs</option>
        <option>style</option>
        <option>refactor</option>
        <option>test</option>
        <option>chore</option>
      </select>

      <label class="text-sm text-gray-700 flex items-center gap-1">
        <input type="checkbox" v-model="includeTimestamp" />
        Include timestamp
      </label>

      <label class="text-sm text-gray-700 flex items-center gap-1">
        <input type="checkbox" v-model="enableCategorization" />
        Auto categorize (modified / added / deleted)
      </label>
    </div>

    <!-- Git status input -->
    <div>
      <label class="block text-gray-700 text-sm mt-2 mb-1">📋 Paste your <code>git status</code> output below:</label>
      <textarea
        v-model="gitStatusRaw"
        @input="parseGitStatus"
        rows="10"
        class="w-full p-2 border rounded-md text-sm bg-gray-50"
        placeholder="Paste your git status output here..."
      ></textarea>
    </div>

    <!-- Categorized files -->
    <div v-if="hasChanges" class="bg-gray-100 p-4 rounded-md border">
      <p class="font-semibold mb-2 text-gray-700">🗂️ Detected Changes:</p>
      <ul class="list-disc pl-6 text-sm text-gray-600 space-y-1 max-h-48 overflow-auto">
        <li v-for="f in modifiedFiles" :key="'mod-' + f">📝 modified: {{ f }}</li>
        <li v-for="f in addedFiles" :key="'add-' + f">➕ added: {{ f }}</li>
        <li v-for="f in deletedFiles" :key="'del-' + f">❌ deleted: {{ f }}</li>
      </ul>
    </div>

    <!-- Commit message -->
    <div>
      <label class="block text-gray-700 text-sm mt-4 mb-1">✏️ Commit Message:</label>
      <input
        v-model="commitMessage"
        class="border p-2 w-full rounded-md"
        placeholder="feat: modified file1.vue, added file2.vue"
      />
    </div>

    <!-- Git command output -->
    <div>
      <label class="block text-gray-700 text-sm mt-4 mb-1">🧾 Generated Git Commands:</label>
      <textarea
        readonly
        class="w-full p-2 border rounded-md text-sm bg-gray-50"
        rows="4"
      >{{ generatedCommands }}</textarea>
    </div>

    <button
      @click="copyCommands"
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      📎 Copy Commands
    </button>

    <p v-if="copied" class="text-green-600 text-sm mt-2">✅ Commands copied to clipboard!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gitStatusRaw: '',
      modifiedFiles: [],
      addedFiles: [],
      deletedFiles: [],
      commitMessage: '',
      commitType: 'feat',
      enableCategorization: true,
      includeTimestamp: true,
      copied: false,
    };
  },
  computed: {
    hasChanges() {
      return this.modifiedFiles.length || this.addedFiles.length || this.deletedFiles.length;
    },
    generatedCommands() {
      return `git add .\ngit commit -m "${this.commitMessage}"\ngit push`;
    },
  },
methods: {
parseGitStatus() {
    this.modifiedFiles = [];
    this.addedFiles = [];
    this.deletedFiles = [];

    const lines = this.gitStatusRaw.split('\n');
    let inUntracked = false;

    for (const line of lines) {
    const trimmed = line.trim();

    // Detect section headers
    if (trimmed.startsWith('Untracked files:')) {
        inUntracked = true;
        continue;
    }
    if (!trimmed || trimmed.startsWith('(')) continue;

    if (trimmed.startsWith('modified:')) {
        this.modifiedFiles.push(trimmed.replace('modified:', '').trim());
        continue;
    }

    // Handle "        file.vue" under "Untracked files:"
    if (inUntracked && trimmed.startsWith('src/')) {
        this.addedFiles.push(trimmed);
        continue;
    }

    // Fallback: parse porcelain-style manually
    const match = trimmed.match(/^([ MAD\?]{1,2})\s+(.+)$/);
    if (match) {
        const status = match[1].trim();
        const file = match[2].trim();

        if (status === 'M') this.modifiedFiles.push(file);
        else if (status === 'D') this.deletedFiles.push(file);
        else if (status === '??') this.addedFiles.push(file);
    }
    }

    // Build commit message
    const parts = [];
    if (this.enableCategorization) {
    if (this.modifiedFiles.length) parts.push(`modified ${this.modifiedFiles.slice(0, 3).join(', ')}`);
    if (this.addedFiles.length) parts.push(`added ${this.addedFiles.slice(0, 3).join(', ')}`);
    if (this.deletedFiles.length) parts.push(`deleted ${this.deletedFiles.slice(0, 3).join(', ')}`);
    } else {
    const all = [...this.modifiedFiles, ...this.addedFiles, ...this.deletedFiles];
    if (all.length) parts.push(all.slice(0, 5).join(', '));
    }

    const timestamp = this.includeTimestamp
    ? ` [${this.getCompactTimestamp()}]`
    : '';

    this.commitMessage = `${this.commitType}: ${parts.join(', ') || 'update'}${timestamp}`;
},
getCompactTimestamp() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
},
copyCommands() {
    navigator.clipboard.writeText(this.generatedCommands).then(() => {
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
    });
},
},

};
</script>
