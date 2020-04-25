export const selectAll = {
  inserted(el) {
    // issue, select does not work in first popup
    // https://github.com/cartovarc/vuejs-playground/issues/7
    let input = el.querySelector(".q-field__native");
    input.addEventListener("focus", () => {
      if (input.value.length) {
        input.select();
      }
    });
  }
};
