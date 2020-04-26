import { firebaseStorage, firebaseDb } from "boot/firebase";
import { Loading, Notify } from "quasar";

const state = {
  imageURL: null
};

const mutations = {
  setImageURL(state, url) {
    state.imageURL = url;
  }
};

const actions = {
  testGetData({ dispatch }) {
    dispatch("fbReadData");
  },
  setHabitsDownloaded({ commit }, value) {
    commit("setHabitsDownloaded", value);
  },
  fbReadData({ commit }) {
    let uid = 1234; //firebaseAuth.currentUser.uid;
    let imageUrlRef = firebaseDb.ref("profile/" + uid + "/imageURL");

    // value
    imageUrlRef.on("value", snapshot => {
      let imageUrl = snapshot.val();
      commit("setImageURL", imageUrl);
    });
  },
  uploadImage({ dispatch }, base64Image) {
    let uid = 1234;
    let imageName = uid + ".png";
    let storageRef = firebaseStorage.ref().child(imageName);
    storageRef.putString(base64Image, "data_url").then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(function(url) {
        let payload = {
          imageURL: url,
          uid: uid
        };
        dispatch("updateUserImage", payload);
      });
    });
  },

  removeImage({ dispatch }) {
    let uid = 1234;
    let payload = {
      imageURL: "statics/default_avatar.png",
      uid: uid
    };
    dispatch("updateUserImage", payload);
  },
  updateUserImage({ dispatch }, payload) {
    Loading.show();
    dispatch("fbUpdateUserImage", payload);
  },
  fbUpdateUserImage({}, payload) {
    let uid = payload.uid;
    let imageUrlRef = firebaseDb.ref("profile/" + uid + "/");
    imageUrlRef.update({ imageURL: payload.imageURL }, error => {
      Loading.hide();
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Image updated");
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
