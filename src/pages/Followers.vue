<template>
  <div>
    <div class="text-center">
      <img v-if="userAvatar" :src="userAvatar" />
      <button id="pick-avatar">Select an image</button>
      <avatar-cropper
        trigger="#pick-avatar"
        :labels="labels"
        :upload-handler="cropperHandler"
      />
    </div>
    <people-list title="Followers" />
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";

export default {
  components: {
    AvatarCropper,
    "people-list": require("src/components/Profile/PeopleList.vue").default
  },
  data() {
    return {
      labels: { submit: "Submit", cancel: "Cancel" },
      userAvatar: undefined
    };
  },
  methods: {
    cropperHandler(cropper) {
      console.log(cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime));
    }
  }
};
</script>
