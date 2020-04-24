<template>
  <q-list class="q-mt-md">
    <q-separator />
    <q-item-label header>{{ title }}</q-item-label>

    <q-item v-for="contact in followers" :key="contact.id" class="q-mb-sm">
      <q-item-section avatar>
        <q-avatar>
          <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ contact.name }}</q-item-label>
        <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          class="full-width"
          color="white"
          text-color="black"
          label="Follow"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
const followers = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg"
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    email: "wstapforth5@pcworld.com",
    avatar: "avatar6.jpg"
  }
];

export default {
  data() {
    return {
      followers
    };
  },
  props: ["title"]
};
</script>

<style lang="sass"></style>
