<template>
  <q-tabs align="left" v-model="tab" class="primary">
    <q-route-tab clickable to="/" name="habits" :label="tabHabitsLabel">
    </q-route-tab>
    <!--
    <q-route-tab to="/followers" name="followers" label="Followers (6)">
    </q-route-tab>
    <q-route-tab
      clickable
      to="following"
      name="following"
      label="Following (7)"
    >
    </q-route-tab>-->
  </q-tabs>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("habits", ["totalHabits"]),
    tabHabitsLabel() {
      return "Habits (" + this.totalHabits + ")";
    }
  },
  data() {
    return {
      tab: "habits"
    };
  }
};
</script>
