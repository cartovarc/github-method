<template>
  <people-list title="Followers" />
</template>

<script>
export default {
  components: {
    "people-list": require("src/components/Profile/PeopleList.vue").default
  },
  data() {
    return {};
  }
};
</script>
