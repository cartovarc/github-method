<template>
  <people-list title="Following" />
</template>

<script>
export default {
  components: {
    "people-list": require("src/components/Profile/PeopleList.vue").default
  }
};
</script>
