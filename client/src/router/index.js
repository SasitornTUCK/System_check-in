import Vue from 'vue'
import Router from 'vue-router';
import test from '../components/test';
import Home from '../components/Home';
import Login from '../components/Login';
import Scan from '../components/Scan';
import store from '../store/auth'

import Nprogress from 'nprogress'


Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        component: Login
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/test',
            component: test
        },
        {
            path: '/scan',
            component: Scan
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.user;
    // console.log("login:" + loggedIn)
    if (to.name) {
      // Start the route progress bar.
      Nprogress.start()
  }

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
  })

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    Nprogress.done()
  })

export default router