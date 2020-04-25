import { firebaseStorage, firebaseDb } from "boot/firebase";

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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
