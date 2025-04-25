<template>
  <div class="min-h-screen p-6 bg-green-50 text-center space-y-6">
    <h1 class="text-3xl font-extrabold text-green-800">🍏 Apple Clicker</h1>
    <p class="text-sm text-gray-600 break-words">You are player: <span class="font-mono">{{ uuid }}</span></p>
    <p class="text-lg">You have collected <span class="font-bold text-green-800">{{ total }}</span> apples</p>

    <button @click="collectApple" class="px-6 py-2 bg-green-400 text-white rounded-lg shadow hover:bg-green-500 transition">
      Click to Collect Apple 🍎
    </button>

    <p class="text-gray-500 text-sm">Idle time: {{ idleTime }} seconds</p>

    <div class="space-y-1 text-green-700 font-medium">
      <p v-for="(count, rarity) in appleCounts" :key="rarity">
        {{ rarity }}: {{ count }}
      </p>
    </div>

    <!-- 🍏 点击动画 -->
    <transition name="fade-slide">
      <div v-if="showAnim" class="fixed top-1/3 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">
        {{ lastAppleEmoji }} ({{ lastAppleRarity }})
      </div>
    </transition>

    <!-- 🏆 Leaderboard -->
    <section class="mt-12 bg-white rounded-lg p-6 max-w-full mx-auto shadow border border-green-200">
      <h2 class="text-2xl font-bold text-green-800 mb-4">🏆 Apple Leaderboard</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border border-green-300">
          <thead class="bg-green-100 text-green-800">
            <tr>
              <th class="py-2 px-3">#</th>
              <th class="py-2 px-3">Player</th>
              <th class="py-2 px-3">Common</th>
              <th class="py-2 px-3">Rare</th>
              <th class="py-2 px-3">Epic</th>
              <th class="py-2 px-3">Legendary</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, i) in leaderboard"
              :key="entry.uuid"
              :class="entry.uuid === uuid ? 'bg-green-100 font-bold text-green-800' : 'bg-white hover:bg-green-50'"
            >
              <td class="py-2 px-3">{{ i + 1 }}</td>
              <td class="py-2 px-3">{{ entry.uuid.slice(0, 6) }}<span v-if="entry.uuid === uuid"> (you)</span></td>
              <td class="py-2 px-3">{{ entry.Common }}</td>
              <td class="py-2 px-3">{{ entry.Rare }}</td>
              <td class="py-2 px-3">{{ entry.Epic }}</td>
              <td class="py-2 px-3">{{ entry.Legendary }}</td>
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
const lastAppleRarity = ref('')
const lastAppleEmoji = ref('')
const showAnim = ref(false)
const leaderboard = ref([])

const appleCounts = ref({
  'Common': 0,
  'Rare': 0,
  'Epic': 0,
  'Legendary': 0
})

// Emoji pools
function randomEmojis(pool, count = 50) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const emojiPools = {
  Common: randomEmojis(['🍏', '🍐', '🥝', '🍈', '🥒', '🥬', '🫛', '🌽', '🥦', '🥔', '🫒', '🥕', '🧄', '🧅', '🥒', '🥜', '🍠', '🍞', '🧀', '🥖', '🥞', '🥯', '🥚', '🥗', '🥫', '🥤', '🧊', '🍚', '🍜', '🍲', '🍛', '🍢', '🍥', '🍡', '🍘', '🍙', '🍳', '🍼', '🍵', '☕️', '🧃', '🥛', '🥤', '🧋', '🍶', '🥠', '🍩', '🍪', '🥧', '🍮']),
  Rare: randomEmojis(['🍎', '🍉', '🍊', '🍋', '🥭', '🫐', '🍇', '🍓', '🍒', '🥥', '🍍', '🥑', '🍅', '🧃', '🍕', '🥪', '🌮', '🍔', '🍟', '🌭', '🥓', '🍗', '🍖', '🥩', '🧆', '🍤', '🍣', '🍱', '🍿', '🥟', '🍛', '🍜', '🍝', '🥘', '🥙', '🧀', '🥐', '🥨', '🍞', '🍯', '🍯', '🍫', '🍬', '🍭', '🍰', '🧁', '🍨', '🍧', '🍦']),
  Epic: randomEmojis(['🦄', '🌟', '⚡', '🌈', '🪐', '🔮', '🎉', '🎊', '✨', '💫', '🎆', '🎇', '🌀', '🌠', '💥', '🌌', '🌜', '🌛', '🌚', '🌞', '☀️', '🌤', '🌦', '☁️', '🌧', '⛈', '🌩', '🌨', '❄️', '🌬', '🌀', '💨', '🔥', '💎', '🔔', '🧿', '🎭', '🎨', '🎵', '🎶', '🎼', '🎧', '📀', '📸', '📷', '📹', '🎥', '🎬']),
  Legendary: randomEmojis(['👑', '💎', '🏆', '🪙', '🪄', '🗝', '🧭', '🪬', '🛡', '⚔️', '🧱', '🧬', '📜', '🔑', '🧨', '🕯', '🎁', '🧸', '🎖', '🧪', '🔮', '🧹', '🪓', '🛠', '🔧', '💰', '💵', '💴', '💶', '💷', '🏅', '🎖', '🏹', '🥇', '🥈', '🥉', '🎯', '🎮', '👾', '🧠', '🦾', '🦿', '🛸', '🧊', '🛕', '🏰', '🪄', '📦', '🧭'])
}

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

function collectApple() {
  const rarity = getRandomRarity()
  const emoji = emojiPools[rarity][Math.floor(Math.random() * emojiPools[rarity].length)]

  lastAppleRarity.value = rarity
  lastAppleEmoji.value = emoji
  appleCounts.value[rarity]++
  total.value++

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
        counts: appleCounts.value
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
      Object.assign(appleCounts.value, result.data.counts)
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
      collectApple()
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