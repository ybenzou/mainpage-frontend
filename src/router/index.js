import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DistributedTaskQueue from '../views/DistributedTaskQueue.vue'
import PersonalBlog from '../views/PersonalBlog.vue'
import PrivacyRag from '../views/PrivacyRag.vue'
import FileStructureAnalyzer from '../views/FileStructureAnalyzer.vue'
import PromptBuilder from '../views/PromptBuilder.vue'
import TailwindDemo from '../views/TailwindDemo.vue'
import GitHelper from '../views/GitHelper.vue'
import RedisDemo from '../views/RedisDemo.vue'
import ArxivSearch from '../views/ArxivSearch.vue'



const routes = [
  { path: '/', component: Home },
  { path: '/distributed-task-queue', component: DistributedTaskQueue },
  { path: '/personal-blog', component: PersonalBlog },
  { path: '/analyze-structure', name: 'AnalyzeStructure', component: FileStructureAnalyzer },
  { path: '/prompt-builder', component: PromptBuilder },
  { path: '/git-helper', component: GitHelper },
  { path: '/tailwind-demo', component: TailwindDemo },
  { path: '/redis-demo', component: RedisDemo },
  { path: '/arxiv-search', component: ArxivSearch },
  { path: '/privacy-rag', component: PrivacyRag },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
