class DetailPresenter {
  constructor({ view, storyApi, id }) {
    this._view = view;
    this._storyApi = storyApi;
    this._id = id;

    this._showStoryDetail();
  }

  async _showStoryDetail() {
    this._view.showLoading();
    try {
      const story = await this._storyApi.getStoryDetail(this._id);
      this._view.displayStory(story);
      this._view.displayMap(story);
    } catch (error) {
      console.error(error);
      this._view.showError(error.message);
    }
  }
}

export default DetailPresenter;
