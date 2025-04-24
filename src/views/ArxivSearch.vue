<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">🔍 Article Search</h1>

    <!-- 查询字段 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <!-- 公共字段 -->
    <input v-model="form.title" class="border p-2 rounded w-full" placeholder="Title">
    <input v-model="form.author" class="border p-2 rounded w-full" placeholder="Author">
    <input v-model="form.abstract" class="border p-2 rounded w-full" placeholder="Abstract">
    <input v-model="form.journal" class="border p-2 rounded w-full" placeholder="Journal Reference">

    <!-- arXiv 专属字段 -->
    <input v-if="platform === 'arxiv'" v-model="form.comment" class="border p-2 rounded w-full" placeholder="Comment">
    <input v-if="platform === 'arxiv'" v-model="form.category" class="border p-2 rounded w-full" placeholder="Category">

    <!-- PubMed 专属字段 -->
    <input v-if="platform === 'pubmed'" v-model="form.pubmedYear" class="border p-2 rounded w-full md:col-span-2" placeholder="Publication Year (e.g. 2023)">

    <!-- all 是通用字段，占两列 -->
    <input v-model="form.all" class="border p-2 rounded w-full md:col-span-2" placeholder="All fields">
    </div>


    <!-- 平台选择与排序 -->
    <div class="flex items-center mb-6 gap-4 flex-wrap">
      <label class="font-semibold">Search Platform:</label>
      <select v-model="platform" class="border p-2 rounded">
        <option value="arxiv">arXiv</option>
        <option value="pubmed">PubMed</option>
      </select>

      <label class="font-semibold ml-2">Sort by:</label>
      <select v-model="sortBy" class="border p-2 rounded" :disabled="platform === 'pubmed'">
        <option value="relevance">Relevance</option>
        <option value="submittedDate">Submission Date</option>
        <option value="lastUpdatedDate">Last Updated</option>
      </select>

      <button @click="search" class="bg-blue-600 text-white px-6 py-2 rounded ml-auto">Search</button>
    </div>

    <!-- 结果展示 -->
    <ul v-if="articles.length" class="space-y-4">
      <li v-for="(article, index) in articles" :key="index" class="p-4 border rounded shadow-sm">
        <p class="font-semibold text-lg">{{ article.title }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ article.short_summary }}</p>
        <div class="mt-2 flex items-center space-x-4">
          <a v-if="article.pdf_url" :href="article.pdf_url" target="_blank" class="text-blue-500 underline text-sm">Download PDF</a>
          <button @click="showModal(article)" class="text-sm text-indigo-600 underline">View Full Abstract</button>
        </div>
      </li>
    </ul>

    <!-- 弹窗 -->
    <div v-if="modalArticle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
        <button @click="modalArticle = null" class="absolute top-2 right-3 text-gray-400 hover:text-black text-lg">×</button>
        <h2 class="text-xl font-bold mb-2">{{ modalArticle.title }}</h2>
        <p class="text-gray-800 whitespace-pre-wrap">{{ modalArticle.summary }}</p>
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
      articles: [],
      modalArticle: null
    }
  },
  methods: {
    buildQuery() {
      const { title, author, abstract, comment, journal, category, all } = this.form
      const queryParts = []
      if (title) queryParts.push(`ti:${title}`)
      if (author) queryParts.push(`au:${author}`)
      if (abstract) queryParts.push(`abs:${abstract}`)
      if (comment) queryParts.push(`co:${comment}`)
      if (journal) queryParts.push(`jr:${journal}`)
      if (category) queryParts.push(`cat:${category}`)
      if (all) queryParts.push(`all:${all}`)
      return queryParts.join(' AND ')
    },
    async search() {
        const endpoint = 'https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev/arxiv-search'

        const params = new URLSearchParams({
            platform: this.platform,
            sortBy: this.sortBy
        })

        // 添加字段参数（不再拼接 query）
        for (const [key, value] of Object.entries(this.form)) {
            if (value) {
            if (key === 'pubmedYear' && this.platform !== 'pubmed') continue
            params.append(key, value)
            }
        }

        const url = `${endpoint}?${params.toString()}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            this.articles = data.articles || []
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Failed to fetch articles. Please try again later.')
        }
    },

    showModal(article) {
      this.modalArticle = article
    }
  }
}
</script>
