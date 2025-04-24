<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">🔍 Arxiv Advanced Search</h1>

    <!-- 所有查询字段 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input v-model="form.title" class="border p-2 rounded w-full" placeholder="Title (ti:)">
      <input v-model="form.author" class="border p-2 rounded w-full" placeholder="Author (au:)">
      <input v-model="form.abstract" class="border p-2 rounded w-full" placeholder="Abstract (abs:)">
      <input v-model="form.comment" class="border p-2 rounded w-full" placeholder="Comment (co:)">
      <input v-model="form.journal" class="border p-2 rounded w-full" placeholder="Journal Reference (jr:)">
      <input v-model="form.category" class="border p-2 rounded w-full" placeholder="Category (cat:)">
      <input v-model="form.all" class="border p-2 rounded w-full md:col-span-2" placeholder="All fields (all:)">
    </div>

    <!-- 排序 -->
    <div class="flex items-center mb-6 gap-4">
      <label class="font-semibold">Sort by:</label>
      <select v-model="sortBy" class="border p-2 rounded">
        <option value="relevance">Relevance</option>
        <option value="submittedDate">Submission Date</option>
        <option value="lastUpdatedDate">Last Updated</option>
      </select>
      <button @click="search" class="ml-auto bg-blue-600 text-white px-6 py-2 rounded">Search</button>
    </div>

    <!-- 搜索结果 -->
    <ul v-if="articles.length" class="space-y-4">
      <li v-for="(article, index) in articles" :key="index" class="p-4 border rounded shadow-sm">
        <p class="font-semibold text-lg">{{ article.title }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ article.short_summary }}</p>
        <div class="mt-2 flex items-center space-x-4">
          <a :href="article.pdf_url" target="_blank" class="text-blue-500 underline text-sm">Download PDF</a>
          <button @click="showModal(article)" class="text-sm text-indigo-600 underline">View Full Abstract</button>
        </div>
      </li>
    </ul>

    <!-- 弹窗摘要 -->
    <div v-if="modalArticle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
        <button @click="modalArticle = null" class="absolute top-2 right-3 text-gray-400 hover:text-black text-lg">×</button>
        <h2 class="text-xl font-bold mb-2">{{ modalArticle.title }}</h2>
        <p class="text-gray-800 whitespace-pre-wrap">{{ modalArticle.summary }}</p>
        <a :href="modalArticle.pdf_url" target="_blank" class="inline-block mt-4 text-blue-600 underline">Open PDF</a>
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
        all: ''
      },
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
      const query = this.buildQuery()
      if (!query) return alert("Please enter at least one field.")

      try {
        const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}&sortBy=${this.sortBy}&sortOrder=descending`)
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
