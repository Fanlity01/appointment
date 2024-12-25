<template>
    <div class="p-4">
        <h2 class="text-2xl mb-4">老师的课表</h2>
        <table class="min-w-full bg-white border">
            <thead>
                <tr>
                    <th class="py-2 px-4 border">时间</th>
                    <th class="py-2 px-4 border">周一</th>
                    <th class="py-2 px-4 border">周二</th>
                    <th class="py-2 px-4 border">周三</th>
                    <th class="py-2 px-4 border">周四</th>
                    <th class="py-2 px-4 border">周五</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="section in sections" :key="section">
                    <td class="py-2 px-4 border">{{ section }}</td>
                    <td v-for="day in days" :key="day" class="py-2 px-4 border">
                        <div v-if="appointments[section] && appointments[section][day]">
                            <div>{{ appointments[section][day].courseName }}</div>
                            <div>{{ appointments[section][day].teacherName }}</div>
                            <div>{{ appointments[section][day].week }}</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const sections = [1, 2, 3, 4]; // 第一节到第四节
const days = [1, 2, 3, 4, 5]; // 周一到周五
const appointments = ref({});

const fetchAppointments = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/appointments');
        const data = response.data.data;
        console.log(data);
        const formattedData = {};
        data.forEach(appointment => {
            if (!formattedData[appointment.section]) {
                formattedData[appointment.section] = {};
            }
            console.log(formattedData);
            formattedData[appointment.section][appointment.dayofweek] = {
                courseName: appointment.courseId,
                teacherName: appointment.labId,
                week: appointment.week
            };
        });
        appointments.value = formattedData;
    } catch (error) {
        console.error('Failed to fetch appointments:', error);
    }
};

onMounted(() => {
    fetchAppointments();
});
</script>

<style scoped>
/* 添加你的样式 */
</style>