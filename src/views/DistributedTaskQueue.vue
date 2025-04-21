<template>
  <div class="task-container">
    <h1>Distributed Task Queue System</h1>

    <div class="task-form">
      <textarea v-model="text" placeholder="Enter text to classify..." rows="5" cols="50"></textarea>
      <button @click="submitTask">Submit Task</button>
    </div>

    <div v-if="taskId">
      <p><strong>Task ID:</strong> {{ taskId }}</p>
      <p><strong>Task Status:</strong> {{ taskStatus }}</p>
      <button @click="checkTaskResult">Check Result</button>
    </div>

    <div v-if="classificationResult">
      <h2>Classification Result:</h2>
      <p>{{ classificationResult }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { post, get } from 'aws-amplify/api'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

const text = ref('')
const taskId = ref('')
const taskStatus = ref('Not Submitted')
const classificationResult = ref('')

const submitTask = async () => {
  if (!text.value.trim()) {
    alert('Please enter some text')
    return
  }

  try {
    const response = await post({
      apiName: 'submitTaskFunctionapi',
      path: '/submit-task',
      options: {
        body: { text: text.value }
      }
    }).response

    const result = await response.body.json()
    taskId.value = result.task_id
    taskStatus.value = 'Submitted. Waiting for processing...'
  } catch (error) {
    console.error('Failed to submit task:', error)
    taskStatus.value = 'Failed to submit'
  }
}

const checkTaskResult = async () => {
  if (!taskId.value) {
    alert('No task submitted yet')
    return
  }

  try {
    const response = await get({
      apiName: 'submitTaskFunctionapi',
      path: `/task-result/${taskId.value}`
    }).response

    const result = await response.body.json()
    if (result.classification) {
      classificationResult.value = result.classification
      taskStatus.value = 'Completed'
    } else {
      taskStatus.value = 'Processing...'
    }
  } catch (error) {
    console.error('Failed to fetch task result:', error)
    taskStatus.value = 'Failed to fetch result'
  }
}
</script>


<style scoped>
.task-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.task-form {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #2980b9;
}
</style>
