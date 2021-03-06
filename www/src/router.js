import Vue from 'vue'
import Router from 'vue-router'
import store from './store/auth'
import Login from './components/Login.vue'
import Room from './components/Room';
import Subject from './components/Subject';
import Student from './components/Student';
import Test from './components/Test';
import Teacher from './components/Teacher';
import StudentList from './components/StudentList';
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css';


Vue.use(Router)

let router = new Router({
  mode: 'history',
  // base: '/bebie/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/subject',
      name: 'subject',
      component: Subject
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher
    },
    {
      path: '/teststudent',
      name: 'studentlist',
      component: StudentList, 
    }
  ]
})

//   router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (store.getters.isLoggedIn) {
//         next()
//         return
//       }
//       next('/login') 
//     } else {
//       next() 
//     }
//   })  

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