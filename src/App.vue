<template>
  <div class="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Invoicely</strong></router-link>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu=!showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active':showMobileMenu}">
        <div class="navbar-start">
          <div class="navbar-item">
            <!-- <form action="/search" method="get">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="search......." name="query">
                </div>

                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fa fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form> -->
          </div>
        </div>
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">
            <router-link to="/dashboard" class="navbar-item"><strong>Dashboard</strong></router-link>
            <router-link to="/dashboard/clients" class="navbar-item"><strong>Clients</strong></router-link>
            <router-link to="/dashboard/invoices" class="navbar-item"><strong>Invoices</strong></router-link>

            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/dashboard/invoices/add" class="button is-success">Add Invoices</router-link>
                <router-link to="/dashboard/my-account" class="button is-light">My Account</router-link>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/" class="navbar-item">Home</router-link>

            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-success"><strong>Sign Up</strong></router-link>
                <router-link to="/log-in" class="button is-light">Log In</router-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <section class="section">
      <router-view />
    </section>
    <footer class="footer">
      <p class="has-text-centered">copyright (c) 2023</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data(){
    return {
      showMobileMenu:false  ,
    }
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>
<style lang="scss">
@import "../node_modules/bulma";
</style>
