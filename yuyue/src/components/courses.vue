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
                    <button @click="editLecture(lecture)">编辑</button>
                    <button @click="confirmDeleteLecture(lecture.id)">删除</button>
                </div>
            </li>
        </ul>
        <button class="add-button" @click="addLecture">+</button>
    </div>


    <div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>{{ isEditing ? '编辑课程' : '增加课程' }}</h2>
        <form @submit.prevent="addCourse" class="course-form">
          <label for="courseName">课程名称:</label>
          <input type="text" id="courseName" v-model="newCourse.name" required> <br>
          <label for="courseDescription">课程人数:</label>
          <input type="number" id="quantity" v-model="newCourse.quantity" required max="255" min="0"> <br>
            <label for="lesson">学时:</label>
            <input type="number" id="lesson" v-model="newCourse.lesson" required max="255" min="0"> <br>
          <button type="submit" class="submit-button">{{ isEditing ? '更新' : '提交' }}</button>
        </form>
      </div>
    </div>


    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showDeleteConfirm = false">&times;</span>
        <h2>确认删除</h2>
        <p>你确定要删除这个课程吗？</p>
        <div class="modal-actions">
          <button class="confirm-button" @click="deleteLecture(currentCourseId)">确定</button>
          <button class="cancel-button" @click="showDeleteConfirm = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,reactive } from 'vue';
import axios from 'axios';

const lectures = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const showDeleteConfirm = ref(false);
const newCourse = ref({
    name: '',
    quantity: 0,
    lesson: 0,
});
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
    //出现一个模态框，输入要添加的课程信息
    showModal.value = true;
    isEditing.value = false;
    newCourse.value = { name: '', quantity: 0, lesson: 0 };
};
const addCourse = async () => {
    try {
        const response = await axios.post('/user/addCourse', newCourse.value);
        
        lectures.value.push(response.data.data);
        alert(response.data.code);
        showModal.value = false; // 提交后关闭模态框
    newCourse.value = { name: '', quantity: 0, lesson: 0 }; // 重置表单
    } catch (error) {
        console.error('Failed to add course:', error);
    }
};
const editLecture = (lecture) => {
    showModal.value = true;
  isEditing.value = true;
  newCourse.value = { ...lecture };
    // 编辑课程的逻辑
    console.log(newCourse.value);
};
const update = async () => {
    try {
        console.log(newCourse.value);
        const response = await axios.post('/user/updateCourse', newCourse.value);
        const index = lectures.value.findIndex(lecture => lecture.id === newCourse.value.id);
        lectures.value[index] = newCourse.value;
        alert(response.data.code);
        showModal.value = false;
    } catch (error) {
        console.error('Failed to update course:', error);
    }
}
const currentCourseId = ref(null);
const confirmDeleteLecture = (id) => {
  currentCourseId.value = id;
  showDeleteConfirm.value = true;
};
const deleteLecture = (id) => {
    // 删除课程的逻辑
    //删除课程的逻辑
    const response = axios.post('/user/deleteCourse', { id: id });
    lectures.value = lectures.value.filter(lecture => lecture.id !== id);
    showDeleteConfirm.value = false;
    currentCourseId.value = null;
    console.log('删除课程', id);
};
</script>

<style scoped>

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.close {
  float: right;
  font-size: 20px;
  cursor: pointer;
}
.modal input,button[type="submit"] {
  margin-bottom: 10px;
  border: #28a745 1px solid;
    border-radius: 4px;
}
.course-form {
  display: flex;
  flex-direction: column;
}

.course-form label {
  margin-top: 10px;
}

.course-form input {
  margin-bottom: 10px;
}

.submit-button {
  margin-top: 20px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

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