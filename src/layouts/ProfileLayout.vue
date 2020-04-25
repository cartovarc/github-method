<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <my-toolbar />
    </q-header>

    <q-page-container class="my-container ">
      <div class="row my-container">
        <div class="col-md-3 col-xs-12" style="overflow: auto;">
          <user-card
            class="q-ma-md"
            fullName="Carlos Tovar"
            username="cartovarc"
            imgURL="https://avatars2.githubusercontent.com/u/26529546?s=460&u=38dd5f593b5ba678529e3093395055392d2918ff&v=4"
          />
        </div>

        <div
          class="col-md-9 col-xs-12"
          style="overflow: auto;min-height: 500px;"
        >
          <profile-tabs />

          <div class="col-12 flex">
            <q-space />
            <q-btn size="sm" color="green q-mb-md" icon="book" label="New" />
          </div>

          <router-view />

          <q-separator class="q-mb-md" />

          <green-grid style="max-width: 100% " />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",
  components: {
    "my-toolbar": require("src/components/Header/MyToolbar.vue").default,
    "user-card": require("src/components/Profile/UserCard.vue").default,
    "profile-tabs": require("src/components/Profile/ProfileTabs.vue").default,
    "green-grid": require("src/components/GreenGrid.vue").default
  }
};
</script>

<style lang="sass">

.my-container
  @media (min-width: $breakpoint-sm-min)
    margin-left: 80px
    margin-right: 80px
    margin-top: 10px

  @media (max-width: $breakpoint-sm-max)
    margin-left: 10px
    margin-right: 10px
    margin-top: 10px
</style>
