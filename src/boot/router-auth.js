import { LocalStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let logged = LocalStorage.getItem("loggedIn");
    if (!logged && to.path !== "/auth") {
      next("/auth");
    } else if (logged && to.path == "/auth") {
      next("/");
    } else {
      next();
    }
  });
};
