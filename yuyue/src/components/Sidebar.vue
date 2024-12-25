<template>
    <aside class="bg-gray-200 w-64 h-full p-4">
        <h2 class="text-xl font-bold mb-4"></h2>
        <ul>
            <li class="mb-4"><router-link to="/home" class="text-gray-800 hover:text-blue-500">首页</router-link></li>
            <li class="mb-4"><router-link to="/schedule" class="text-gray-800 hover:text-blue-500">预约</router-link></li>
            <li class="mb-4"><router-link to="/settings" class="text-gray-800 hover:text-blue-500">设置</router-link></li>
            <li class="mb-4"><router-link to="/profile" class="text-gray-800 hover:text-blue-500">个人资料</router-link></li>
            <li class="mb-4"><router-link to="/help" class="text-gray-800 hover:text-blue-500">帮助</router-link></li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
aside {
    background-color: #f7fafc;
    border-right: 1px solid #e2e8f0;
    width: 16rem;
        /* 确保侧边栏宽度固定 */
}

h2 {
    color: #2d3748;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 1rem;
}

a {
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #3182ce;
}
</style>