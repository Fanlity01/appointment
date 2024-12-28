<template>
  <aside class="sidebar">
    <div id="leftside-navigation" class="nano">
      <ul class="nano-content">
        <li>
          <router-link to="/home"><i class="fa fa-dashboard"></i><span>首页</span></router-link>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa-cogs"></i><span>UI Elements</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/ui-alerts-notifications">Alerts &amp; Notifications</router-link></li>
            <li><router-link to="/ui-panels">Panels</router-link></li>
            <li><router-link to="/ui-buttons">Buttons</router-link></li>
            <li><router-link to="/ui-slider-progress">Sliders &amp; Progress</router-link></li>
            <li><router-link to="/ui-modals-popups">Modals &amp; Popups</router-link></li>
            <li><router-link to="/ui-icons">Icons</router-link></li>
            <li><router-link to="/ui-grid">Grid</router-link></li>
            <li><router-link to="/ui-tabs-accordions">Tabs &amp; Accordions</router-link></li>
            <li><router-link to="/ui-nestable-list">Nestable Lists</router-link></li>
          </ul>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa-table"></i><span>实验室</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/home/lab">901</router-link></li>
            <li><router-link to="/tables-data">902</router-link></li>
          </ul>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa fa-tasks"></i><span>Forms</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/forms-components">Components</router-link></li>
            <li><router-link to="/forms-validation">Validation</router-link></li>
            <li><router-link to="/forms-mask">Mask</router-link></li>
            <li><router-link to="/forms-wizard">Wizard</router-link></li>
            <li><router-link to="/forms-multiple-file">Multiple File Upload</router-link></li>
            <li><router-link to="/forms-wysiwyg">WYSIWYG Editor</router-link></li>
          </ul>
        </li>
        <li class="sub-menu active">
          <a href="javascript:void(0);"><i class="fa fa-envelope"></i><span>Mail</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li class="active"><router-link to="/mail-inbox">Inbox</router-link></li>
            <li><router-link to="/mail-compose">Compose Mail</router-link></li>
          </ul>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa-bar-chart-o"></i><span>Charts</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/charts-chartjs">Chartjs</router-link></li>
            <li><router-link to="/charts-morris">Morris</router-link></li>
            <li><router-link to="/charts-c3">C3 Charts</router-link></li>
          </ul>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa-map-marker"></i><span>Maps</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/map-google">Google Map</router-link></li>
            <li><router-link to="/map-vector">Vector Map</router-link></li>
          </ul>
        </li>
        <li class="sub-menu">
          <router-link to="/typography"><i class="fa fa-text-height"></i><span>Typography</span></router-link>
        </li>
        <li class="sub-menu">
          <a href="javascript:void(0);"><i class="fa fa-file"></i><span>Pages</span><i class="arrow fa fa-angle-right pull-right"></i></a>
          <ul>
            <li><router-link to="/pages-blank">Blank Page</router-link></li>
            <li><router-link to="/pages-login">Login</router-link></li>
            <li><router-link to="/pages-sign-up">Sign Up</router-link></li>
            <li><router-link to="/pages-calendar">Calendar</router-link></li>
            <li><router-link to="/pages-timeline">Timeline</router-link></li>
            <li><router-link to="/pages-404">404</router-link></li>
            <li><router-link to="/pages-500">500</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  mounted() {
    this.initSidebar();
  },
  methods: {
    initSidebar() {
      const subMenuLinks = document.querySelectorAll("#leftside-navigation .sub-menu > a");
      subMenuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
          const nextElement = this.nextElementSibling;
          const allSubMenus = document.querySelectorAll("#leftside-navigation ul ul");
          allSubMenus.forEach(subMenu => {
            if (subMenu !== nextElement) {
              subMenu.style.display = "none";
            }
          });
          if (nextElement.style.display === "block") {
            nextElement.style.display = "none";
          } else {
            nextElement.style.display = "block";
          }
          e.stopPropagation();
        });
      });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');
@import url('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');



.sidebar {
  width: 240px;
  height: 100%;
  background: #293949;
  position: relative;
  transition: all .3s ease-in-out;
  z-index: 100;
}

#leftside-navigation {
  ul, ul ul {
    margin: -2px 0 0;
    padding: 0;
  }
  ul {
    li {
      list-style-type: none;
      border-bottom: 1px solid rgba(255, 255, 255, .05);
      &.active {
        & > a {
          color: #1abc9c;
        }
        ul {
          display: block;
        }
      }
      a {
        color: #aeb2b7;
        text-decoration: none;
        display: block;
        padding: 18px 0 18px 25px;
        font-size: 12px;
        outline: 0;
        transition: all 200ms ease-in;
        &:hover {
          color: #1abc9c;
        }
        span {
          display: inline-block;
        }
        i {
          width: 20px;
          .fa-angle-left, .fa-angle-right {
            padding-top: 3px;
          }
        }
      }
    }
  }
  ul ul {
    display: none;
    li {
      background: #23313f;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      border-bottom: none;
      a {
        font-size: 12px;
        padding-top: 13px;
        padding-bottom: 13px;
        color: #aeb2b7;
      }
    }
  }
}
</style>