<template>
    <div class="lecture-display">
        <h1>教师授课展示</h1>
        <ul class="lecture-list">
            <li v-for="lecture in lectures" :key="lecture.id" class="lecture-item">
                <div class="lecture-details">
                    <p><strong>课程名称:</strong> {{ lecture.name }}</p>
                    <p><strong>学生数量:</strong> {{ lecture.quantity }}</p>
                    <p><strong>学时:</strong> {{ lecture.lesson }}</p>
                    <p><strong>状态:</strong> {{ lecture.state }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const lectures = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('/user/courses');
        lectures.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch lectures:', error);
    }
});
</script>

<style scoped>
.lecture-display {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.lecture-list {
    list-style-type: none;
    padding: 0;
}

.lecture-item {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px;
    transition: box-shadow 0.3s ease;
}

.lecture-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.lecture-details p {
    margin: 5px 0;
    color: #555;
}

.lecture-details p strong {
    color: #333;
}
</style>