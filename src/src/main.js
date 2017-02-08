// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Admin from './Admin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/admin', component: Admin, template: '<Admin/>' },
  { path: '/', component: App, template: '<App/>' }
]
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router
}).$mount('#app')
