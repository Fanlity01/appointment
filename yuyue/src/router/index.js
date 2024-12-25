import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import Home from '../pages/home.vue';
import TeacherSchedule from '../components/TeacherSchedule.vue';
import Courses from '../components/courses.vue';
 // 假设你有一个Appointment组件

// 手动定义home路由及其子路由
const homeRoutes = {
    path: '/home',
    component: Home,
    children: [
        {
            path: '',
            components: {
                default: TeacherSchedule,
                courses: Courses
            }
        },
        
    ]
};

// 将homeRoutes合并到现有的routes中
const allRoutes = [
    homeRoutes,
    ...routes,
    
];

const router = createRouter({
    history: createWebHistory(),
    routes: allRoutes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;