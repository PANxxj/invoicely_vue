import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from '../views/LogIn.vue'

import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta:{
      requireLogin:true
    }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path:'/log-in',
    name:'LogIn',
    component:LogIn
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record=> record.meta.requireLogin) && !store.state.isAuthenticated){
    next('/log-in')
  } else {
    next()
  }
})

export default router;
