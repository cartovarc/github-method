<template>
  <q-dialog :value="prompt" @hide="$emit('hide')" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your Username</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          ref="newUsername"
          :rules="[
            val => val.length > 4 || 'Please enter at least 4 characters',
            val => val.length <= 16 || 'Max 16 characters allowed'
          ]"
          dense
          v-model="newUsername"
          autofocus
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Save"
          @click="saveNewUsername"
          v-close-popup="hide"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["prompt", "username"],
  data() {
    return { newUsername: this.username, hide: false };
  },
  methods: {
    ...mapActions("profile", ["updateUsername"]),
    saveNewUsername() {
      this.$refs.newUsername.validate();
      if (!this.$refs.newUsername.hasError) {
        let payload = {
          updates: { username: this.newUsername }
        };
        this.updateUsername(payload);
        this.hide = true;
      }
    }
  }
};
</script>
