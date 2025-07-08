import { createAddStoryFormTemplate } from "../templates/template-creator.js";
import CameraHelper from "../../utils/camera-helper.js";

const addStory = {
  render() {
    return createAddStoryFormTemplate();
  },

  afterRender() {
    this._stream = null;
    this._capturedPhoto = null;
  },

  setFormSubmitListener(handler) {
    this.formElement.addEventListener("submit", handler);
  },

  setCameraStarterListener(handler) {
    this.startCameraButton.addEventListener("click", handler);
  },

  get formElement() {
    return document.getElementById("add-story-form");
  },
  get videoElement() {
    return document.getElementById("camera-feed");
  },
  get canvasElement() {
    return document.getElementById("canvas");
  },
  get photoPreviewElement() {
    return document.getElementById("photo-preview");
  },
  get startCameraButton() {
    return document.getElementById("start-camera-btn");
  },
  get takePictureButton() {
    return document.getElementById("take-picture-btn");
  },
  get submitButton() {
    return this.formElement.querySelector('button[type="submit"]');
  },
  get errorContainer() {
    return document.getElementById("error-message-container");
  },

  setStream(stream) {
    this._stream = stream;
  },

  setCapturedPhoto(photo) {
    this._capturedPhoto = photo;
  },

  getFormData() {
    return {
      description: this.formElement.description.value,
      photo: this._capturedPhoto,
    };
  },

  showCameraPlaceholder(visible) {
    document.getElementById("camera-placeholder").style.display = visible
      ? "flex"
      : "none";
  },

  showVideoFeed(visible) {
    this.videoElement.style.display = visible ? "block" : "none";
  },

  showPhotoPreview(visible) {
    const photoUrl = URL.createObjectURL(this._capturedPhoto);
    this.photoPreviewElement.src = photoUrl;
    this.photoPreviewElement.style.display = visible ? "block" : "none";
  },

  showTakePictureButton(visible) {
    this.takePictureButton.style.display = visible ? "flex" : "none";
  },

  showError(message) {
    this.errorContainer.innerHTML = `<p class="error-message">${message}</p>`;
  },

  showLoadingOnSubmit() {
    this.submitButton.disabled = true;
    this.submitButton.innerHTML = "Mengirim...";
  },

  hideLoadingOnSubmit() {
    this.submitButton.disabled = false;
    this.submitButton.innerHTML =
      '<i class="fas fa-paper-plane"></i> Kirim Cerita';
  },

  cleanup() {
    CameraHelper.stopStream(this._stream);
    if (this.photoPreviewElement && this.photoPreviewElement.src) {
      URL.revokeObjectURL(this.photoPreviewElement.src);
    }
  },

  redirectToHome() {
    window.location.hash = "#/";
  },
};

export default addStory;
