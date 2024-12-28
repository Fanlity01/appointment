<template>
    //预约实验室界面
    <form  @submit.prevent="submitForm">
        实验室： <input type="radio" id="lab1" name="lab" :value="lab"> <label for="lab1">实验室1</label>
        <input type="radio" id="lab2" name="lab" v-model="lab" value="902"> <label for="lab2">902</label>
        <input type="radio" id="lab3" name="lab" v-model="lab"> <label for="lab3">实验室3</label>
        <input type="radio" id="lab4" name="lab" v-model="lab"> <label for="lab4">实验室4</label>
        <input type="radio" name="label" id="lab5" v-model="lab"> <label for="lab5">实验室5</label>
        <input type="radio" name="label" id="lab6" v-model="lab"> <label for="lab6">实验室6</label>
        <input type="radio" name="label" id="lab7" v-model="lab"> <label for="lab7">实验室7</label>
        <input type="radio" name="label" id="lab8" v-model="lab"> <label for="lab8">实验室8</label>
        <br>
        周次： <input type="text" id="week" name="week" required v-model="week"> <br>
        星期： <input type="text" id="dayofweek" name="dayofweek" required v-model="dayofweek"> <br>
        节次： <input type="text" id="section" name="section" required v-model="section"> <br>
        课程名称： <input type="text" id="courseName" name="courseName" required v-model="courseId"> <br>
        <button type="button">提交</button>
    </form>


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


</template>
<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
const lab = ref('');
const week = ref('');
const dayofweek = ref('');
const section = ref('');
const sections = [1, 2, 3, 4]; // 第一节到第四节
const days = [1, 2, 3, 4, 5]; // 周一到周五
const appointments = ref({});
const appointmentsLoaded = ref(false); // 控制加载状态
const courseId = ref('');
const submitForm = async () => {
        // 提交表单的逻辑
    try {
            console.log('lab:', lab.value);
            const response = await axios.post('/user/yuyue', {
                labName: lab.value,
                week: week.value,
                dayofweek: dayofweek.value,
                section: section.value,
                courseId: courseId.value
            });
            const data = response.data.data;
            console.log(data);
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
                    week: appointment.week
                });
            });
            appointments.value = formattedData;
            appointmentsLoaded.value = true; // 数据加载完成

        } catch (error) {
            console.error('Failed to submit form:', error);
        }


};
watch([week, dayofweek, section,lab], (newV,old) => {
    // 当周次、星期、节次发生变化时，重新获取预约信息
    console.log('newV:', newV);
    console.log('old:', old);
    submitForm();
});
</script>