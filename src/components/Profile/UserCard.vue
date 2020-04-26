<template>
  <div class="q-pa-none q-ma-none">
    <q-card v-if="$q.screen.gt.sm" flat bordered class="my-card-one q-ma-none">
      <q-img :src="getImgURL()" :ratio="1" />
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

    <q-card v-else class="my-card-two" flat bordered>
      <q-card-section horizontal>
        <q-img class="my-image-two" :src="getImgURL()" :ratio="1" />
        <q-card-section>
          <div class="text-h6">{{ fullName }}</div>
          <div class="text-subtitle2 q-mb-md">{{ username }}</div>
          <q-btn color="white" text-color="black" label="Follow" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["fullName", "username", "imgURL"],
  methods: {
    getImgURL() {
      if (this.imgURL) {
        return this.imgURL;
      } else {
        return "statics/default_avatar.png";
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card-one
  width: 100%
  max-width: 300px

.my-card-two
  width: 100%

.my-image-two
  max-width: 150px
  max-height: 150px
</style>
