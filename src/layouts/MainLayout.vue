<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <my-toolbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",
  components: {
    "my-toolbar": require("src/components/Header/MyToolbar.vue").default
  }
};
</script>
