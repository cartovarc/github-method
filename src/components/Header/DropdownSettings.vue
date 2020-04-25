<template>
  <q-btn-dropdown class="self-stretch" flat>
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar size="sm" rounded>
          <img
            src="https://avatars2.githubusercontent.com/u/26529546?s=460&u=38dd5f593b5ba678529e3093395055392d2918ff&v=4"
          />
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
        <q-avatar size="72px">
          <img
            src="https://avatars2.githubusercontent.com/u/26529546?s=460&u=38dd5f593b5ba678529e3093395055392d2918ff&v=4"
          />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">cartovarc</div>

        <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>
export default {
  data() {
    return {
      privateHabits: true,
      allowFollowers: true
    };
  }
};
</script>

<style lang="sass" scoped>
.self-stretch
  align-self: stretch
</style>
