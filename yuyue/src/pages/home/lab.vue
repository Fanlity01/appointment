<template>
  <div>
    <nav class="nav">
      <div class="burger" @click="toggleMenu">
        <div class="burger__patty"></div>
      </div>

      <ul class="nav__list" :class="{ 'nav__list--active': menuActive }">
        <li class="nav__item">
          <a href="#1" class="nav__link c-blue"><i class="fa fa-flask"></i></a>
        </li>
        <li class="nav__item">
          <a href="#2" class="nav__link c-yellow"><i class="fa fa-microscope"></i></a>
        </li>
        <li class="nav__item">
          <a href="#3" class="nav__link c-red"><i class="fa fa-atom"></i></a>
        </li>
        <li class="nav__item">
          <a href="#4" class="nav__link c-green"><i class="fa fa-dna"></i></a>
        </li>
      </ul>
    </nav>

    <section class="panel b-blue" id="1">
      <article class="panel__wrapper">
        <div class="panel__content">
          <h1 class="panel__headline"><i class="fa fa-flask"></i>&nbsp;Chemistry Lab</h1>
          <div class="panel__block"></div>
          <p>Welcome to the Chemistry Lab. Here we conduct various chemical experiments and research.</p>
        </div>
      </article>
    </section>
    <section class="panel b-yellow" id="2">
      <article class="panel__wrapper">
        <div class="panel__content">
          <h1 class="panel__headline"><i class="fa fa-microscope"></i>&nbsp;Biology Lab</h1>
          <div class="panel__block"></div>
          <p>Welcome to the Biology Lab. Here we study various biological processes and organisms.</p>
        </div>
      </article>
    </section>
    <section class="panel b-red" id="3">
      <article class="panel__wrapper">
        <div class="panel__content">
          <h1 class="panel__headline"><i class="fa fa-atom"></i>&nbsp;Physics Lab</h1>
          <div class="panel__block"></div>
          <p>Welcome to the Physics Lab. Here we explore the fundamental principles of the universe.</p>
        </div>
      </article>
    </section>
    <section class="panel b-green" id="4">
      <article class="panel__wrapper">
        <div class="panel__content">
          <h1 class="panel__headline"><i class="fa fa-dna"></i>&nbsp;Genetics Lab</h1>
          <div class="panel__block"></div>
          <p>Welcome to the Genetics Lab. Here we research genetic information and inheritance.</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Lab',
  data() {
    return {
      menuActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    scrollFx() {
      const panels = document.querySelectorAll('.panel');
      const doc = document.documentElement;
      const vh = window.innerHeight;

      panels.forEach(panel => {
        const panelContent = panel.querySelector('.panel__content');
        const panelTop = panel.getBoundingClientRect().top + window.scrollY;
        const offset = vh / 4;

        if (panelTop < doc.scrollTop + offset) {
          panelContent.classList.add('panel__content--active');
        } else {
          panelContent.classList.remove('panel__content--active');
        }
      });
    },
    scrolly(e) {
      e.preventDefault();
      const target = e.target.getAttribute('href');
      const $target = document.querySelector(target);

      window.scrollTo({
        top: $target.offsetTop,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollFx);
    window.addEventListener('load', this.scrollFx);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.scrolly);
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFx);
    window.removeEventListener('load', this.scrollFx);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.removeEventListener('click', this.scrolly);
    });
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
$nav-bg: #2b3033;
$blue: #5fc7ea;
$red: #e68568;
$yellow: #e6d068;
$green: #68e6ac;
$ease: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
$content-animation: scale(0.7) rotateX(-230deg);

* {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100px;
  backface-visibility: hidden;
  
  &__list {
    display: flex;
    flex-flow: column wrap;
    height: 85vh;
    transform: translate(0, -100%);
    transition: $ease;
    
    &--active {
      transform: translate(0, 0);
    }
  }
  
  &__item {
    flex: 1;
    position: relative;
  }
  
  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    text-decoration: none;
    font-size: 24px;
    background: $nav-bg;
    transition: $ease;
    
    &:hover {
      background: mix(black, $nav-bg, 10);
    }
  }
  
  @media (max-width: 640px) {
    width: 70px;
    
    &__list {
      height: 90vh;
    }
  }
}

.burger {
  height: 15vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: $nav-bg;
  cursor: pointer;
  transition: $ease;
  
  &:hover {
    background: mix(black, $nav-bg, 10);
  }
  
  &__patty {
    position: relative;
    height: 2px;
    width: 40px;
    background: white;
    
    &:before {
      content: "";
      position: absolute;
      top: -10px;
      left: 0;
      height: 2px;
      width: 100%;
      background: white;
    }
    
    &:after {
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      height: 2px;
      width: 100%;
      background: white;
    }
  }
  
  &__patty,
  &__patty:before,
  &__patty:after {
    will-change: transform;
    transition: $ease;
  }
  
  &--active {
    .burger__patty {
      transform: rotate(90deg);
      &:before {
        transform: rotate(-45deg) translate(-7px,-7px) scaleX(0.7);
      }
      
      &:after {
        transform: rotate(45deg) translate(-7px,7px) scaleX(0.7);
      }
    }
  }
  
  @media (max-width: 640px) {
    height: 10vh;
    
    &__patty {
      transform: scale(0.8);
    }
    
    &--active {
      .burger__patty {
        transform: scale(0.8) rotate(90deg);
      }
    }
  }
}

.panel {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &__wrapper {
    padding: 7vh 7vw;
    perspective: 1000px;
  }
  
  &__content {
    will-change: transform;
    transform: $content-animation;
    transform-origin: center 80%;
    opacity: 0;
    transition: $ease;
    
    &--active {
      transform: none;
      opacity: 1;
    }
  }
  
  &__headline {
    font-weight: 700;
    opacity: 0.8;
    font-size: 48px;
    margin: 0 0 25px 0;
  }
  
  p {
    margin: 0 0 25px 0;
    color: lighten(black, 10);
    font-size: 24px;
    max-width: 800px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__block {
    height: 3px;
    background: rgba(black, 0.2);
    margin: 0 0 25px 0;
  }
  
  @media (max-width: 640px) {
    
    &__headline {
      font-size: 36px;
    }
    
    &__wrapper {
      padding: 10vh 10vw;
    }
    
    p {
      font-size: 16px;
    }
  }
}

.c-blue {
  color: $blue;
}

.c-red {
  color: $red;
}

.c-green {
  color: $green;
}

.c-yellow {
  color: $yellow;
}

.b-blue {
  background: $blue;
}

.b-red {
  background: $red;
}

.b-green {
  background: $green;
}

.b-yellow {
  background: $yellow;
}
</style>