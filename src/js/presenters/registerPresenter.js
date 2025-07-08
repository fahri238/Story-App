class RegisterPresenter {
  constructor({ view, storyApi }) {
    this._view = view;
    this._storyApi = storyApi;
    this._view.setRegisterSubmitListener(this._handleRegister.bind(this));
  }

  async _handleRegister() {
    try {
      const { name, email, password } = this._view.getRegisterData();
      if (!name || !email || !password) {
        this._view.showError("Nama, email, dan password harus diisi.");
        return;
      }
      this._view.showLoading();
      await this._storyApi.register(name, email, password);
      this._view.redirectToLoginWithMessage();
    } catch (error) {
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default RegisterPresenter;
