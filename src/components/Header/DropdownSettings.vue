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

        <q-btn class="full-width q-mt-xs" size="sm" id="pick-avatar"
          >Select an image</q-btn
        >

        <img v-if="userAvatar" :src="userAvatar" />
        <avatar-cropper
          trigger="#pick-avatar"
          :labels="labels"
          @submit="showLoading"
          :upload-handler="cropperHandler"
        />

        <q-btn @click="removeMyImage" class="full-width q-mt-xs" size="sm"
          >Remove image</q-btn
        >

        <div class="text-subtitle1 q-mt-md q-mb-xs">cartovarc</div>

        <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
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
    ...mapState("profile", ["imageURL"])
  },
  data() {
    return {
      privateHabits: true,
      allowFollowers: true,
      labels: { submit: "Submit", cancel: "Cancel" },
      userAvatar: undefined
    };
  },
  methods: {
    ...mapActions("profile", ["testGetData", "uploadImage", "removeImage"]),
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
    }
  },
  components: {
    AvatarCropper
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
