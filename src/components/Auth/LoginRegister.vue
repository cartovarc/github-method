<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your habit tracker
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        v-model="formData.email"
        outlined
        label="Email"
        ref="email"
        lazy-rules
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter an valid email address'
        ]"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        type="password"
        v-model="formData.password"
        outlined
        label="Password"
        ref="password"
        lazy-rules
        :rules="[val => val.length > 6 || 'Please enter at least 6 characters']"
      />
    </div>
    <div class="row q-mb-md">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
