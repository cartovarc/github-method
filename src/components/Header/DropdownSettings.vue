<template>
  <q-btn-dropdown class="self-stretch" flat>
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar size="sm" rounded>
          <img :src="getImgURL()" />
        </q-avatar>
      </div>
    </template>
    <div class="row no-wrap q-pa-md">
      <div class="column items-center">
        <div class="text-h6">Settings</div>

        <q-avatar size="96px">
          <img :src="getImgURL()" />
        </q-avatar>
        <div class="text-subtitle1 q-mt q-mb-xs">{{ username }}</div>
      </div>
      <q-separator vertical inset class="q-mx-lg" />
      <div class="column flex flex-center">
        <img v-if="userAvatar" :src="userAvatar" />
        <avatar-cropper
          trigger="#pick-avatar"
          :labels="labels"
          @submit="showLoading"
          :upload-handler="cropperHandler"
        />
        <q-btn class="full-width q-mt-xs" size="sm" id="pick-avatar"
          >Select an image</q-btn
        >

        <q-btn @click="removeMyImage" class="full-width q-mt-xs" size="sm"
          >Remove image</q-btn
        >

        <username-dialog
          :username="username"
          :prompt="promptUsernameDialog"
          @hide="promptUsernameDialog = false"
          v-close-popup
        />
        <q-btn
          @click="promptUsernameDialog = true"
          class="full-width q-mt-xs"
          size="sm"
          >Change username</q-btn
        >

        <q-btn
          @click="logout"
          class="full-width  q-mt-xs"
          color="primary"
          label="Logout"
          push
          size="sm"
          v-close-popup
        />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AvatarCropper from "vue-avatar-cropper";
import { Loading } from "quasar";

export default {
  computed: {
    ...mapState("profile", ["imageURL", "username"])
  },
  data() {
    return {
      promptUsernameDialog: false,
      labels: { submit: "Submit", cancel: "Cancel" },
      userAvatar: undefined
    };
  },
  methods: {
    ...mapActions("profile", ["uploadImage", "removeImage"]),
    ...mapActions("auth", ["logoutUser"]),
    cropperHandler(cropper) {
      let base64Image = cropper
        .getCroppedCanvas()
        .toDataURL(this.cropperOutputMime);
      this.uploadImage(base64Image);
    },
    removeMyImage() {
      this.removeImage();
    },
    showLoading(useless) {
      Loading.show();
    },
    logout() {
      this.logoutUser();
    },
    getImgURL() {
      if (this.imageURL) {
        return this.imageURL;
      } else {
        return "statics/default_avatar.png";
      }
    }
  },
  components: {
    AvatarCropper,
    "username-dialog": require("src/components/Profile/UsernameDialog").default
  }
};
</script>

<style lang="sass" scoped>
.self-stretch
  align-self: stretch
</style>
