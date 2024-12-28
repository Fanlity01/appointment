<template>
    <div id="app">
        <Navbar />
        <div class="container mx-auto flex">
            <Sidebar />
            <div class="flex-1 p-4">
                 <router-view />
                 <router-view name="courses"></router-view>
                 
            </div>
        </div>
    </div>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import TeacherSchedule from '../components/TeacherSchedule.vue';
import courses from '../components/courses.vue';


</script>
<style scoped>
#app {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
}
.flex-1 {
    flex: 1;
    /* 确保内容区域占据剩余空间 */
}

.p-4 {
    padding: 1rem;
    /* 添加内容区域的内边距 */
}

.container .flex {
    display: flex;
    flex-direction: row;
}

.container .flex > * {
    padding: 20px;
}

.container .flex > *:first-child {
    border-right: 1px solid #ddd;
}

.navbar {
    background: #333;
    color: #fff;
    padding: 5px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: -30px;
    
}

.sidebar {
    background: #f4f4f4;
    width: 250px;
    min-height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    margin-left: -10px;
}

.router-view {
    flex: 1;
    padding: 20px;
    background: #fff;
}
</style>