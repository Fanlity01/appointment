<template>
    <nav class="bg-gray-800 p-4 text-white">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <img src="" alt="Logo" class="h-8 w-8">
                <h1 class="text-xl font-bold"></h1>
            </div>
            <ul class="flex flex-1 justify-around space-x-4">
                <li><a href="#" class="hover:text-gray-400">首页</a></li>
                <li><a href="#" class="hover:text-gray-400">关于我们</a></li>
                <li><a href="#" class="hover:text-gray-400">服务</a></li>
                <li><a href="#" class="hover:text-gray-400">联系</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
nav {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex: 1;
    /* 使导航链接占满剩余空间 */
    justify-content: space-around;
    /* 在行内均匀分布 */
}

li {
    display: inline;
}

a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
}

a:hover {
    color: #d1d5db;
    /* Tailwind's gray-400 */
}
</style>