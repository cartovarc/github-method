import { firebaseStorage, firebaseDb, firebaseAuth } from "boot/firebase";
import { Loading, Notify } from "quasar";

const state = {
  imageURL: null,
  username: ""
};

const mutations = {
  setImageURL(state, url) {
    state.imageURL = url;
  },
  setUsername(state, username) {
    state.username = username;
  }
};

const actions = {
  setHabitsDownloaded({ commit }, value) {
    commit("setHabitsDownloaded", value);
  },
  fbReadData({ commit }) {
    let uid = firebaseAuth.currentUser.uid;
    let imageUrlRef = firebaseDb.ref("profile/" + uid + "/imageURL");
    let usernameRef = firebaseDb.ref("profile/" + uid + "/username");

    // value
    imageUrlRef.on("value", snapshot => {
      let imageUrl = snapshot.val();
      commit("setImageURL", imageUrl);
    });

    // value
    usernameRef.on("value", snapshot => {
      let username = snapshot.val();
      commit("setUsername", username);
    });
  },
  uploadImage({ dispatch }, base64Image) {
    let uid = firebaseAuth.currentUser.uid;
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
    let uid = firebaseAuth.currentUser.uid;
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
  },
  updateUsername({ dispatch }, payload) {
    dispatch("fbUpdateUsername", payload);
  },
  fbUpdateUsername({}, payload) {
    let uid = firebaseAuth.currentUser.uid;
    let profileRef = firebaseDb.ref("profile/" + uid + "/");
    profileRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Username asigned to " + payload.updates.username);
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
