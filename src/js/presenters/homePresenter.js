class HomePresenter {
  constructor({ view, storyApi }) {
    this._view = view;
    this._storyApi = storyApi;

    this._showStories();
  }

  async _showStories() {
    this._view.showLoading();
    try {
      const stories = await this._storyApi.getAllStories();
      this._view.displayStories(stories);
      this._view.initializeMap(stories);
    } catch (error) {
      console.error(error);
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default HomePresenter;
