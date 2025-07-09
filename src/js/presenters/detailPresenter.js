import StoryDatabase from "../model/database-helper.js";

class DetailPresenter {
  constructor({ view, storyApi, id }) {
    this._view = view;
    this._storyApi = storyApi;
    this._id = id;
    this._database = StoryDatabase;

    this._showStoryDetail();
  }

  async _showStoryDetail() {
    this._view.showLoading();
    try {
      const story = await this._storyApi.getStoryDetail(this._id);
      this._view.displayStory(story);
      this._view.displayMap(story);
    } catch (error) {
      console.error(
        "Gagal mengambil dari API, mencoba dari database:",
        error.message
      );
      this._view.showError(
        "Gagal memuat dari jaringan. Mencoba mengambil data offline..."
      );

      const storyFromDb = await this._database.getStory(this._id);
      if (storyFromDb) {
        this._view.displayStory(storyFromDb);
        this._view.displayMap(storyFromDb);
      } else {
        this._view.showError("Cerita ini tidak tersedia secara offline.");
      }
    }
  }
}

export default DetailPresenter;
