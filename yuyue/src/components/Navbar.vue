<template>
    <nav class="nav">
        <div class="container">
            <div class="logo">
                <a href="#">Your Logo</a>
            </div>
            <div id="mainListDiv" class="main_list">
                <ul class="navlinks">
                    <li><router-link to="/home">首页</router-link></li>
                    <li><router-link to="/about">关于我们</router-link></li>
                    <li><router-link to="/portfolio">Portfolio</router-link></li>
                    <li><router-link to="/services">服务</router-link></li>
                    <li><router-link to="/contact">联系</router-link></li>
                </ul>
            </div>
            <span class="navTrigger" @click="toggleMenu">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        toggleMenu() {
            const navTrigger = document.querySelector('.navTrigger');
            const mainListDiv = document.getElementById('mainListDiv');
            navTrigger.classList.toggle('active');
            mainListDiv.classList.toggle('show_list');
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');


/* Navbar section */
.nav {
    width: 100%;
    height: 65px;
    position: fixed;
    line-height: 65px;
    text-align: center;
    background-color: #333;
    color: #fff;
    z-index: 500;
}

.nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.nav .logo a {
    text-decoration: none;
    color: #fff;
    font-size: 2rem;
}

.nav .logo a:hover {
    color: #00E676;
}

.nav .main_list {
    height: 65px;
}

.nav .main_list ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav .main_list ul li {
    padding: 0 20px;
}

.nav .main_list ul li a {
    text-decoration: none;
    color: #fff;
    font-size: 1.3rem;
    line-height: 60px;
}

.nav .main_list ul li a:hover {
    color: #00E676;
}

.navTrigger {
    display: none;
}

.navTrigger i {
    background-color: #fff;
    border-radius: 2px;
    content: '';
    display: block;
    width: 30px;
    height: 4px;
    margin: 0px 0;
}

.navTrigger.active i:nth-child(1) {
    transform: translateY(9px) rotate(135deg);
}

.navTrigger.active i:nth-child(2) {
    opacity: 0;
}

.navTrigger.active i:nth-child(3) {
    transform: translateY(-9px) rotate(-135deg);
}

@media screen and (max-width: 768px) {
    .navTrigger {
        display: block;
    }
    .nav .main_list {
        display: none;
        width: 100%;
    }
    .nav .main_list.show_list {
        display: block;
    }
    .nav .main_list ul {
        flex-direction: column;
        background-color: #333;
        position: absolute;
        top: 65px;
        left: 0;
        width: 100%;
    }
    .nav .main_list ul li {
        text-align: center;
        padding: 10px 0;
    }
    .nav .main_list ul li a {
        font-size: 2rem;
    }
}

.affix {
    padding: 0;
    background-color: #111;
}
</style>