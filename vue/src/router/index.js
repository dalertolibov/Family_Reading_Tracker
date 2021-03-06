import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Log from '../views/Log.vue'
import Family from '../views/Family.vue'
import Prizes from '../views/Prizes.vue'
import SearchBooks from '../views/SearchBooks.vue'
import FamilyMemberLibrary from '../views/FamilyMemberLibrary.vue'
import NewPrize from '../components/NewPrize.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/newprize',
      name: 'new-prize',
      component: NewPrize,
      meta: {
        requiresAuth: true
      }
      },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/form/:book",
      name: "form",
      component: Log,
      meta: {
        requiresAuth: false
      },
      props: true
    },
    {
      path: '/family',
      name: 'family',
      component: Family,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/prizes',
      name: 'prizes',
      component: Prizes,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchBooks,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/family/:id',
      name: 'family-library',
      component: FamilyMemberLibrary
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
