<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <my-toolbar @showAddHabit="showAddHabit = true" />
    </q-header>

    <q-page-container class="my-container ">
      <div class="row my-container">
        <div class="col-md-3 col-xs-12" style="overflow: auto;">
          <user-card
            class="q-ma-md"
            fullName="Carlos Tovar"
            username="cartovarc"
            :imgURL="imageURL"
          />
        </div>

        <div
          class="col-md-9 col-xs-12"
          style="overflow: auto;min-height: 500px;"
        >
          <profile-tabs class="q-mb-md" />

          <div class="col-12 flex">
            <q-space />
            <q-btn
              @click="showAddHabit = true"
              unelevated=""
              size="sm"
              color="green q-mb-md"
              icon="book"
              label="New"
            />
            <q-dialog v-model="showAddHabit">
              <add-habit @close="showAddHabit = false" />
            </q-dialog>
          </div>

          <router-view />

          <q-separator class="q-mb-md" />

          <green-grid style="max-width: 100% " :allRecords="records" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapState("profile", ["imageURL"]),
    ...mapState("records", ["records", "recordsDownloaded"])
  },
  data() {
    return {
      showAddHabit: false
    };
  },
  components: {
    "my-toolbar": require("src/components/Header/MyToolbar.vue").default,
    "user-card": require("src/components/Profile/UserCard.vue").default,
    "profile-tabs": require("src/components/Profile/ProfileTabs.vue").default,
    "green-grid": require("src/components/GreenGrid.vue").default,
    "add-habit": require("components/Habit/Modals/AddHabit.vue").default
  },
  methods: {},
  mounted() {
    this.$root.$on("showAddHabit", () => {
      this.showAddHabit = true;
    });
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
