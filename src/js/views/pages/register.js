import { createRegisterFormTemplate } from "../templates/template-creator.js";

const register = {
  render() {
    return createRegisterFormTemplate();
  },

  afterRender() {},

  setRegisterSubmitListener(handler) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  },

  get formElement() {
    return document.getElementById("register-form");
  },

  getRegisterData() {
    const name = this.formElement.name.value;
    const email = this.formElement.email.value;
    const password = this.formElement.password.value;
    return { name, email, password };
  },

  showLoading() {
    this.formElement.querySelector("button").innerText = "Mendaftarkan...";
    this.formElement.querySelector("button").disabled = true;
  },

  hideLoading() {
    this.formElement.querySelector("button").innerText = "Daftar";
    this.formElement.querySelector("button").disabled = false;
  },

  showError(message) {
    const errorContainer = document.getElementById("error-message-container");
    errorContainer.innerHTML = `<p class="error-message">Registrasi gagal: ${message}</p>`;
  },

  redirectToLoginWithMessage() {
    sessionStorage.setItem(
      "register_success",
      "Registrasi berhasil! Silakan login."
    );
    window.location.hash = "#/login";
  },
};

export default register;
