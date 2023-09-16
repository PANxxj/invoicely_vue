import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from '../views/LogIn.vue';
import MyAccount from '../views/dashboard/MyAccount.vue';
import Clients from '../views/dashboard/Clients.vue'
import Client from '../views/dashboard/Client.vue'
import AddClient from '../views/dashboard/AddClient.vue'

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
  },
  {
    path: "/dashboard/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta:{
      requireLogin:true
    }
  },
  {
    path: "/dashboard/clients",
    name: "Clients",
    component: Clients,
    meta:{
      requireLogin:true
    }
  },
  {
    path: "/dashboard/clients/:id",
    name: "Client",
    component: Client,
    meta:{
      requireLogin:true
    }
  },
  {
    path: "/dashboard/clients/add",
    name: "AddClient",
    component: AddClient,
    meta:{
      requireLogin:true
    }
  },
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
