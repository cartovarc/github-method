<template>
  <q-btn-dropdown class="self-stretch" flat>
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar size="sm" rounded>
          <img :src="imageURL" />
        </q-avatar>
      </div>
    </template>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Settings</div>
        <q-toggle v-model="privateHabits" label="Private habits" />
        <q-toggle v-model="allowFollowers" label="Allow followers" />
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <q-avatar size="96px">
          <img :src="imageURL" />
        </q-avatar>

        <q-btn-dropdown size="sm" color="primary" label="Edit">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Upload a photo</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Remove photo</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div class="text-subtitle1 q-mt-md q-mb-xs">cartovarc</div>

        <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("profile", ["imageURL"])
  },
  data() {
    return {
      privateHabits: true,
      allowFollowers: true
    };
  },
  methods: {
    ...mapActions("profile", ["testGetData"])
  },
  mounted() {
    this.testGetData();
  }
};
</script>

<style lang="sass" scoped>
.self-stretch
  align-self: stretch
</style>
