<template>
  <q-page>
    <div class="row" style="width: 100%; padding: 24px;">
      <div class="col-md-3 col-xs-12" style="overflow: auto;">
        <user-card
          fullName="Carlos Tovar"
          username="cartovarc"
          imgURL="https://avatars2.githubusercontent.com/u/26529546?s=460&u=38dd5f593b5ba678529e3093395055392d2918ff&v=4"
        />
      </div>

      <div class="col-md-9 col-xs-12" style="overflow: auto;min-height: 500px;">
        <q-tabs align="left" v-model="tab" class="primary">
          <q-tab name="habits" label="Habits (5)"> </q-tab>
          <q-tab name="followers" label="Followers (6)"> </q-tab>
          <q-tab name="following" label="Following (7)"> </q-tab>
        </q-tabs>
        <q-separator class="q-mb-md" />

        <div class="row">
          <div
            v-for="card in 4"
            v-bind:key="card"
            class="col-12 col-md-6 col-lg-6 q-pl-xs q-pr-xs"
          >
            <habit-card name="Sleep Early" description="at 10 pm" />
          </div>
        </div>

        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="current" :max="5"> </q-pagination>
        </div>

        <people-list title="Followers" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "habits",
      current: 1
    };
  },
  components: {
    //"green-grid": require("src/components/GreenGrid.vue").default,
    "user-card": require("src/components/Profile/UserCard.vue").default,
    "habit-card": require("src/components/Profile/HabitCard.vue").default,
    "people-list": require("src/components/Profile/PeopleList.vue").default
  }
};
</script>

<style lang="sass" scoped></style>
