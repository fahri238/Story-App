import CameraHelper from "../utils/camera-helper.js";
import LocationHelper from "../utils/location-helper.js";

class AddStoryPresenter {
  constructor({ view, storyApi }) {
    this._view = view;
    this._storyApi = storyApi;
    this._storyCoordinates = { lat: null, lon: null };

    this._view.setFormSubmitListener(this._handleFormSubmit.bind(this));
    this._view.setCameraStarterListener(this._initCamera.bind(this));
    this._initMap();
  }

  _initMap() {
    const map = LocationHelper.init({
      containerId: "map",
      onLocationSelect: (coords) => {
        this._storyCoordinates = coords;
      },
    });

    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }

  async _initCamera() {
    try {
      this._view.showCameraPlaceholder(false);
      this._view.showVideoFeed(true);

      const stream = await CameraHelper.init(this._view.videoElement);
      this._view.setStream(stream);

      this._view.showTakePictureButton(true);
      this._view.takePictureButton.addEventListener("click", () => {
        this._handleTakePicture();
      });
    } catch (error) {
      console.error(error);
      this._view.showError(error.message);
      this._view.showCameraPlaceholder(true);
      this._view.showVideoFeed(false);
      this._view.showTakePictureButton(false);
    }
  }

  async _handleTakePicture() {
    const capturedPhoto = await CameraHelper.takePicture(
      this._view.videoElement,
      this._view.canvasElement
    );
    this._view.setCapturedPhoto(capturedPhoto);
    this._view.showPhotoPreview(true);
    this._view.showVideoFeed(false);
  }

  async _handleFormSubmit(event) {
    event.preventDefault();
    try {
      const { description, photo } = this._view.getFormData();
      if (!photo) {
        this._view.showError("Silakan ambil gambar terlebih dahulu.");
        return;
      }
      if (!description) {
        this._view.showError("Deskripsi tidak boleh kosong.");
        return;
      }

      this._view.showLoadingOnSubmit();

      await this._storyApi.addNewStory(
        description,
        photo,
        this._storyCoordinates.lat,
        this._storyCoordinates.lon
      );

      this._view.cleanup();
      this._view.redirectToHome();
    } catch (error) {
      console.error(error);
      this._view.showError(`Gagal mengirim cerita: ${error.message}`);
    } finally {
      this._view.hideLoadingOnSubmit();
    }
  }
}

export default AddStoryPresenter;
