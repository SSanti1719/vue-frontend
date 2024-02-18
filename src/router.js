import { createRouter, createWebHistory } from "vue-router";
import Emails from "./components/Emails.vue";
import Login from "./components/Login.vue";
import NotFound from "./components/NotFound.vue";
import { getTokenFromLocalStorage } from "./js/sessionStorage";
import { validate } from "./js/auth";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/emails",
    name: "emails",
    component: Emails,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = getTokenFromLocalStorage();

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    (token == null || token == "" || (await validate(token)) == false)
  ) {
    next("/");
  } else if(to.matched.some((record) => record.name == "login") && token){
    next("/emails");
  }else{
    next();
  }
});

export default router;
