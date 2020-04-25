<template>
  <q-tabs align="left" v-model="tab" class="primary">
    <q-route-tab clickable to="/" name="habits" label="Habits (5)">
    </q-route-tab>
    <q-route-tab to="/followers" name="followers" label="Followers (6)">
    </q-route-tab>
    <q-route-tab
      clickable
      to="following"
      name="following"
      label="Following (7)"
    >
    </q-route-tab>
  </q-tabs>
</template>

<script>
export default {
  data() {
    return {
      tab: "habits"
    };
  }
};
</script>
