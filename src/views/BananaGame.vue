<template>
  <div class="min-h-screen p-6 bg-yellow-50 text-center space-y-4">
    <h1 class="text-3xl font-bold">🍌 Banana Clicker</h1>
    <p class="text-sm text-gray-500 break-words">You are player: {{ uuid }}</p>
    <p>You have collected <span class="font-bold">{{ total }}</span> bananas</p>

    <button @click="collectBanana" class="px-6 py-2 bg-yellow-400 rounded shadow hover:bg-yellow-500">
      Click to Collect Banana
    </button>

    <p>Idle time: {{ idleTime }} seconds</p>

    <div class="space-y-1">
      <p v-for="(count, rarity) in bananaCounts" :key="rarity">
        {{ rarity }}: {{ count }}
      </p>
    </div>

    <transition name="fade-slide">
      <div v-if="showAnim" class="fixed top-1/3 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
        🍌 +1 {{ lastBanana }}
      </div>
    </transition>

    <!-- 🏆 Leaderboard -->
    <section class="mt-10 bg-yellow-100 rounded-md p-4 max-w-full mx-auto">
    <h2 class="text-xl font-bold mb-2">🏆 Leaderboard (Top 10)</h2>
    <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
        <thead>
            <tr class="border-b border-yellow-300">
            <th>#</th>
            <th>Player</th>
            <th>Common</th>
            <th>Rare</th>
            <th>Epic</th>
            <th>Legendary</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(entry, i) in leaderboard" :key="entry.uuid">
            <td>{{ i + 1 }}</td>
            <td>{{ entry.uuid.slice(0, 6) }}...</td>
            <td>{{ entry.Common }}</td>
            <td>{{ entry.Rare }}</td>
            <td>{{ entry.Epic }}</td>
            <td>{{ entry.Legendary }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const uuid = ref('')
const total = ref(0)
const idleTime = ref(0)
const lastBanana = ref('')
const showAnim = ref(false)
const leaderboard = ref([]) // 🏆 排行榜状态

const bananaCounts = ref({
  'Common': 0,
  'Rare': 0,
  'Epic': 0,
  'Legendary': 0
})

const rarities = [
  { type: 'Common', chance: 0.98 },
  { type: 'Rare', chance: 0.015 },
  { type: 'Epic', chance: 0.0045 },
  { type: 'Legendary', chance: 0.0005 },
]

const API_BASE = 'https://ntfqk6u6o3.execute-api.ap-southeast-1.amazonaws.com/dev'

function getRandomRarity() {
  const rand = Math.random()
  let cumulative = 0
  for (const r of rarities) {
    cumulative += r.chance
    if (rand <= cumulative) return r.type
  }
  return 'Common'
}

function collectBanana() {
  const rarity = getRandomRarity()
  bananaCounts.value[rarity]++
  total.value++
  lastBanana.value = rarity

  showAnim.value = true
  setTimeout(() => showAnim.value = false, 1000)

  saveToBackend()
}

async function saveToBackend() {
  try {
    await fetch(`${API_BASE}/banana`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: uuid.value,
        total: total.value,
        counts: bananaCounts.value
      })
    })
  } catch (e) {
    console.error('❌ Failed to save', e)
  }
}

async function loadFromBackend() {
  try {
    const res = await fetch(`${API_BASE}/banana?uuid=${uuid.value}`)
    const result = await res.json()
    if (result.data) {
      total.value = result.data.total
      Object.assign(bananaCounts.value, result.data.counts)
    }
  } catch (e) {
    console.error('❌ Failed to load', e)
  }
}

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/banana/leaderboard`)
    const result = await res.json()
    leaderboard.value = result.data || []
  } catch (e) {
    console.error('❌ Failed to load leaderboard', e)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('banana_uuid')
  if (saved) {
    uuid.value = saved
  } else {
    const newUuid = crypto.randomUUID()
    localStorage.setItem('banana_uuid', newUuid)
    uuid.value = newUuid
  }

  console.log('✅ Current UUID:', uuid.value)

  loadFromBackend()
  loadLeaderboard()
  setInterval(loadLeaderboard, 30000)

  setInterval(() => {
    idleTime.value++
    if (idleTime.value % 10 === 0) {
      collectBanana()
    }
  }, 1000)
})
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.8s, transform 0.8s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
