const routes = [
  {
    path: "/",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Habits.vue")
      },
      {
        path: "/followers",
        component: () => import("pages/Followers.vue")
      },
      {
        path: "/following",
        component: () => import("pages/Following.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
