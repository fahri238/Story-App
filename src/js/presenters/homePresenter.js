import StoryDatabase from "../model/database-helper.js";

class HomePresenter {
  constructor({ view, storyApi }) {
    this._view = view;
    this._storyApi = storyApi;
    this._database = StoryDatabase;

    this._showStories();
  }

  async _showStories() {
    this._view.showLoading();
    try {
      const storiesFromApi = await this._storyApi.getAllStories();
      const savedStories = await this._database.getAllStories();
      const savedStoryIds = savedStories.map((story) => story.id);

      this._view.displayStories(storiesFromApi, savedStoryIds);
      this._view.initializeMap(storiesFromApi);
      this._setSaveButtonListeners();
    } catch (error) {
      console.error(
        "Gagal mengambil dari API, mencoba dari database:",
        error.message
      );
      this._view.showError(
        "Gagal memuat dari jaringan. Menampilkan data offline..."
      );

      const storiesFromDb = await this._database.getAllStories();
      if (storiesFromDb && storiesFromDb.length > 0) {
        this._view.displayStories(
          storiesFromDb,
          storiesFromDb.map((s) => s.id)
        );
        this._view.initializeMap(storiesFromDb);
        this._setSaveButtonListeners();
      } else {
        this._view.showError(
          "Tidak ada data online maupun offline yang tersedia."
        );
      }
    } finally {
      this._view.hideLoading();
    }
  }

  _setSaveButtonListeners() {
    const saveButtons = document.querySelectorAll(".button-save-offline");
    saveButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        if (event.target.disabled) return;

        const storyId = event.target.dataset.id;
        event.target.innerText = "Menyimpan...";
        event.target.disabled = true;

        try {
          const story = await this._storyApi.getStoryDetail(storyId);
          await this._database.putStory(story);

          if (story.photoUrl) {
            this._precacheImage(story.photoUrl);
          }

          event.target.innerText = "Tersimpan";
          console.log(
            `Cerita dengan ID ${storyId} dan gambarnya berhasil disimpan.`
          );
        } catch (error) {
          event.target.innerText = "Gagal";
          setTimeout(() => {
            event.target.innerText = "Simpan Offline";
            event.target.disabled = false;
          }, 2000);
        }
      });
    });
  }

  _precacheImage(url) {
    fetch(url).catch(() => {});
  }
}

export default HomePresenter;
