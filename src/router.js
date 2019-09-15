import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
//import Web from './Web';
//import Data from './Data';
//import Software from './Software';
//import Motto from './Motto';
//import About from './About';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/web.html',
      name: 'Web',
      component: () => import("./views/Web.vue"),
    },
    {
      path: '/data.html',
      name: 'Data',
      component: () => import("./views/Data.vue"),
    },
    {
      path: '/software.html',
      name: 'Software',
      component: () => import("./views/Software.vue"),
    },
    {
      path: '/download.html',
      name: 'Download',
      component: () => import("./views/Download.vue"),
    },
    {
      path: '/motto.html',
      name: 'Motto',
      component: () => import("./views/Motto.vue"),
    },
    {
      path: '/about.html',
      name: 'About',
      component: () => import("./views/About.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
//    {
//      path: "/about",
//      name: "about",
//      // route level code-splitting
//      // this generates a separate chunk (about.[hash].js) for this route
//      // which is lazy-loaded when the route is visited.
//      component: () =>
//        import(/* webpackChunkName: "about" */ "./views/About.vue")
//    }
  ]
});
