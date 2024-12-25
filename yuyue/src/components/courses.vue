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
                <div class="lecture-actions">
                    <button @click="editLecture(lecture.id)">编辑</button>
                    <button @click="deleteLecture(lecture.id)">删除</button>
                </div>
            </li>
        </ul>
        <button class="add-button" @click="addLecture">+</button>
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

const addLecture = () => {
    // 增加课程的逻辑
    console.log('增加课程');
};

const editLecture = (id) => {
    // 编辑课程的逻辑
    console.log('编辑课程', id);
};

const deleteLecture = (id) => {
    // 删除课程的逻辑
    console.log('删除课程', id);
};
</script>

<style scoped>
.lecture-display {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.lecture-actions {
    display: flex;
    gap: 10px;
}

.lecture-actions button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.lecture-actions button:hover {
    background-color: #0056b3;
}

.add-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-button:hover {
    background-color: #218838;
}
</style>