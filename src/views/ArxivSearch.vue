<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">🔍 Article Search</h1>

    <!-- 查询字段 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input v-model="form.title" class="border p-2 rounded w-full" placeholder="Title">
      <input v-model="form.author" class="border p-2 rounded w-full" placeholder="Author">
      <input v-model="form.abstract" class="border p-2 rounded w-full" placeholder="Abstract">
      <input v-model="form.journal" class="border p-2 rounded w-full" placeholder="Journal Reference">
      <input v-if="platform === 'arxiv'" v-model="form.comment" class="border p-2 rounded w-full" placeholder="Comment">
      <input v-if="platform === 'arxiv'" v-model="form.category" class="border p-2 rounded w-full" placeholder="Category">
      <input v-if="platform === 'pubmed'" v-model="form.pubmedYear" class="border p-2 rounded w-full md:col-span-2" placeholder="Publication Year (e.g. 2023)">
      <input v-model="form.all" class="border p-2 rounded w-full md:col-span-2" placeholder="All fields">
    </div>

    <!-- 平台选择与排序 -->
    <div class="flex items-center mb-6 gap-4 flex-wrap">
      <label class="font-semibold">Search Platform:</label>
      <select v-model="platform" class="border p-2 rounded">
        <option value="arxiv">arXiv</option>
        <option value="pubmed">PubMed</option>
      </select>

      <label v-if="platform === 'arxiv'" class="font-semibold ml-2">Sort by:</label>
      <select v-if="platform === 'arxiv'" v-model="sortBy" class="border p-2 rounded">
        <option value="relevance">Relevance</option>
        <option value="submittedDate">Submission Date</option>
        <option value="lastUpdatedDate">Last Updated</option>
      </select>

      <button
        @click="search"
        class="bg-blue-600 text-white px-6 py-2 rounded ml-auto"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Searching...' : 'Search' }}
      </button>
    </div>

    <div v-if="isLoading" class="text-sm text-gray-600 italic animate-pulse mb-4">
      🔄 Searching for articles...
    </div>

    <!-- 搜索结果展示 -->
    <ul v-if="articles.length" class="space-y-4">
      <li v-for="(article, index) in articles" :key="index" class="p-4 border rounded shadow-sm">
        <p class="font-semibold text-lg">{{ article.title }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ article.short_summary }}</p>

        <div class="mt-2 flex flex-wrap items-center gap-3">
          <a v-if="article.open_access" :href="article.pdf_url" target="_blank" class="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700">PDF</a>
          <span v-else class="text-sm text-gray-400 italic">No PDF</span>

          <button @click="showModal(article)" class="text-sm text-indigo-600 underline">View Abstract</button>

          <button v-if="article.bibtex" @click="copyBibtex(article.bibtex)" class="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600">Copy BibTeX</button>
        </div>
      </li>
    </ul>

    <!-- 摘要弹窗 -->
    <div v-if="modalArticle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
        <button @click="modalArticle = null" class="absolute top-2 right-3 text-gray-400 hover:text-black text-lg">×</button>
        <h2 class="text-xl font-bold mb-2">{{ modalArticle.title }}</h2>
        <p class="text-gray-800 whitespace-pre-wrap mb-4">{{ modalArticle.summary }}</p>
        <a v-if="modalArticle.pdf_url" :href="modalArticle.pdf_url" target="_blank" class="inline-block mt-4 text-blue-600 underline">Open PDF</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        author: '',
        abstract: '',
        comment: '',
        journal: '',
        category: '',
        all: '',
        pubmedYear: ''
      },
      platform: 'arxiv',
      sortBy: 'relevance',
      isLoading: false,
      articles: [],
      modalArticle: null
    }
  },
  methods: {
    async search() {
      this.isLoading = true
      this.articles = []
      const endpoint = 'https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/arxiv-search'
      const params = new URLSearchParams({ platform: this.platform, sortBy: this.sortBy })

      for (const [key, value] of Object.entries(this.form)) {
        if (value) {
          if (key === 'pubmedYear' && this.platform !== 'pubmed') continue
          params.append(key, value)
        }
      }

      try {
        const response = await fetch(`${endpoint}?${params.toString()}`)
        const data = await response.json()
        this.articles = data.articles || []
      } catch (err) {
        console.error('Fetch error:', err)
        alert('Failed to fetch articles. Please try again later.')
      } finally {
        this.isLoading = false
      }
    },

    showModal(article) {
      this.modalArticle = article
    },

    copyBibtex(bibtex) {
      navigator.clipboard.writeText(bibtex)
        .then(() => alert('BibTeX copied to clipboard!'))
        .catch(() => alert('Failed to copy BibTeX'))
    }
  }
}
</script>
