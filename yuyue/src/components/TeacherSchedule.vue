<template>
  <div class="p-4">
    <!-- 标题部分，使用更快的 "bounce" 动画 -->
    <h2 class="text-2xl mb-6 text-center font-semibold text-gray-800 animate__animated animate__bounce animate__fast">
      老师的课表
    </h2>

    <!-- 表格部分，使用更快的 "zoomIn" 动画 -->
    <table v-if="appointmentsLoaded" class="min-w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden transition-all duration-500 animate__animated animate__zoomIn animate__fast">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th class="py-3 px-6 border text-center">时间</th>
          <th class="py-3 px-6 border text-center">周一</th>
          <th class="py-3 px-6 border text-center">周二</th>
          <th class="py-3 px-6 border text-center">周三</th>
          <th class="py-3 px-6 border text-center">周四</th>
          <th class="py-3 px-6 border text-center">周五</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="section in sections" :key="section" class="hover:bg-gray-50 transition-all duration-300 animate__animated animate__zoomIn animate__fast">
          <td class="py-3 px-6 border text-center font-medium">{{ section }}节</td>
          <td v-for="day in days" :key="day" class="py-3 px-6 border text-center"  @click="showDetails(section, day)">
            <div v-if="appointments[section] && appointments[section][day]" class="space-y-2 animate__animated animate__zoomIn animate__fast">
              <div v-for="appointment in appointments[section][day]" :key="appointment.week">
              <div class="text-sm font-semibold">{{ appointment.courseName }} </div>
              <div class="text-xs text-gray-600">{{  appointment.teacherName }}</div>
              <div class="text-xs text-gray-400">第{{ appointment.week }}周</div>
              <br>
              </div>
            </div>
            <div v-else class="text-gray-500 text-xs">无课</div>
          </td>
        </tr>
      </tbody>
    </table>
     <!-- 详细信息模态框 -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-500">
      <div class="bg-white p-6 rounded-lg shadow-lg z-600 max-w-lg w-full">
        <h3 class="text-xl font-semibold mb-4">预约详细信息</h3>
        <div v-if="selectedAppointments.length">
          <div v-for="(appointment, index) in selectedAppointments" :key="index" class="mb-4">
            <p>课程名称: {{ appointment.courseName }}</p>
            <p>教师名称: {{ appointment.teacherName }}</p>
            <p>周次: 第{{ appointment.week }}周</p>
            <hr v-if="index < selectedAppointments.length - 1" class="my-2">
          </div>
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" @click="closeModal">关闭</button>
      </div>
    </div>
  

    <!-- 加载动画，使用 "pulse" 动画 -->
    <div v-if="!appointmentsLoaded" class="flex justify-center items-center h-64 animate__animated animate__pulse animate__fast">
      <svg class="animate__animated animate__spin h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9 4.9A7.978 7.978 0 0116 12h-2a6 6 0 10-12 0h2a7.978 7.978 0 011.1 4.9A8 8 0 014 12z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const sections = [1, 2, 3, 4]; // 第一节到第四节
const days = [1, 2, 3, 4, 5]; // 周一到周五
const appointments = ref({});
const appointmentsLoaded = ref(false); // 控制加载状态
const showModal = ref(false);
const selectedAppointments = ref([]);
const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user/appointments');
    const data = response.data.data;
    const formattedData = {};
    data.forEach(appointment => {
      if (!formattedData[appointment.section]) {
        formattedData[appointment.section] = {};
      }
      if (!formattedData[appointment.section][appointment.dayofweek]) {
        formattedData[appointment.section][appointment.dayofweek] = [];
      }
      formattedData[appointment.section][appointment.dayofweek].push({
        courseName: appointment.courseId,
        teacherName: appointment.labId,
        week: appointment.week
      });
    });
    appointments.value = formattedData;
    appointmentsLoaded.value = true; // 数据加载完成
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }
};

onMounted(() => {
  fetchAppointments();
});

const showDetails = (section, day) => {
  if (appointments.value[section] && appointments.value[section][day]) {
    selectedAppointments.value = appointments.value[section][day]; // 这里只显示第一个预约的详细信息
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
   selectedAppointments.value = [];
};
</script>

<style scoped>


/* 模态框样式 */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-opacity-50 {
  background-opacity: 0.5;
}

.bg-white {
  background-color: white;
}

.p-6 {
  padding: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.mt-4 {
  margin-top: 1rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.bg-blue-500 {
  background-color: #3498db;
}

.text-white {
  color: white;
}

.rounded {
  border-radius: 0.25rem;
}

.z-500 {
  z-index: 500;
}

.z-600 {
  z-index: 600;
}

.max-w-lg {
  max-width: 32rem;
}

.w-full {
  width: 100%;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

tr:hover {
  background-color: #f9f9f9;
}

td {
  background-color: #f9f9f9;
}
td:hover {
  background-color: #f1f1f1;
}
div {
  word-wrap: break-word;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-center {
  text-align: center;
}

.space-y-2 {
  margin-top: 0.5rem;
}

/* 加载动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
