<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title>
          Github Method
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          class="absolute-right"
          icon-right="account_circle"
          label="Login"
          flat
        />
        <q-btn
          v-else
          class="absolute-right"
          icon-right="account_circle"
          label="Logout"
          flat
        />
      </q-toolbar>
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

  data() {
    return {
      loggedIn: true
    };
  }
};
</script>
