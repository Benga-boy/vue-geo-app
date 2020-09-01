import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import Profile from '@/components/profiles/Profile'
import firebase from 'firebase/app'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // * Check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // * Check auth state of user
    const user = firebase.auth().currentUser
    if (user) {
      // * User signed in, proceed to route
      next()
    } else {
      // * no user signed in
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router