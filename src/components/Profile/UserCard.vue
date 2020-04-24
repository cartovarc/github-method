<template>
  <div class="q-pa-md flex flex-center">
    <q-card class="my-card">
      <q-img :src="imgURL" :ratio="1" />
      <q-card-section>
        <div class="text-h6">{{ fullName }}</div>
        <div class="text-subtitle2">{{ username }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn
          class="full-width"
          color="white"
          text-color="black"
          label="Follow"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["fullName", "username", "imgURL"]
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
