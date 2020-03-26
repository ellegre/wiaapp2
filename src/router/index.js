import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/geofences",
    name: "geofences",
    component: () =>
      import("../views/Geofences.vue")
  },
  {
    path: "/resources",
    name: "resources",
    component: () =>
      import("../views/Resources.vue")
  },
  {
    path: "*",
    redirect: '/',
    name: "home",
    component: Home
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import("../views/User.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: `history`
});

export default router;
