import { createLoginFormTemplate } from "../templates/template-creator.js";

const login = {
  render() {
    return createLoginFormTemplate();
  },

  afterRender() {
    const successMessage = sessionStorage.getItem("register_success");
    if (successMessage) {
      const successContainer = document.getElementById(
        "success-message-container"
      );
      successContainer.innerHTML = `<p class="success-message">${successMessage}</p>`;
      sessionStorage.removeItem("register_success");
    }
  },

  setLoginSubmitListener(handler) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  },

  get formElement() {
    return document.getElementById("login-form");
  },

  getLoginData() {
    const email = this.formElement.email.value;
    const password = this.formElement.password.value;
    return { email, password };
  },

  showLoading() {
    this.formElement.querySelector("button").innerText = "Memproses...";
    this.formElement.querySelector("button").disabled = true;
  },

  hideLoading() {
    this.formElement.querySelector("button").innerText = "Login";
    this.formElement.querySelector("button").disabled = false;
  },

  showError(message) {
    const errorContainer = document.getElementById("error-message-container");
    errorContainer.innerHTML = `<p class="error-message">Login gagal: ${message}</p>`;
  },

  redirectToHome() {
    window.location.hash = "#/";
  },
};

export default login;
