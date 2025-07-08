import CONFIG from "../config.js";

class LoginPresenter {
  constructor({ view, storyApi }) {
    this._view = view;
    this._storyApi = storyApi;

    this._view.setLoginSubmitListener(this._loginHandler.bind(this));
  }

  async _loginHandler() {
    const { email, password } = this._view.getLoginData();

    if (!email || !password) {
      this._view.showError("Email dan password tidak boleh kosong.");
      return;
    }

    this._view.showLoading();

    try {
      await this._storyApi.login(email, password);

      this._view.redirectToHome();
    } catch (error) {
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default LoginPresenter;
