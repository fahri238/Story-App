import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createStoryDetailTemplate } from "../templates/template-creator.js";

const detail = {
  render() {
    return `<div id="story-detail-container"></div>`;
  },

  afterRender() {},

  showLoading() {
    const container = this._getContainer();
    container.innerHTML = `<div class="loading-indicator"></div>`;
  },

  displayStory(story) {
    const container = this._getContainer();
    container.innerHTML = createStoryDetailTemplate(story);
  },

  displayMap(story) {
    if (story.lat && story.lon) {
      const mapContainer = document.getElementById("detail-map");
      if (!mapContainer) return;

      const coords = [story.lat, story.lon];
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: '<i class="fas fa-map-marker-alt fa-2x" style="color: #415a77;"></i>',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const map = L.map(mapContainer, {
        center: coords,
        zoom: 15,
        scrollWheelZoom: false,
        dragging: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(`Lokasi: ${story.name}`)
        .openPopup();

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    } else {
      this._hideMapSection();
    }
  },

  showError(message) {
    const container = this._getContainer();
    container.innerHTML = `<p class="error-message">Gagal memuat detail: ${message}</p>`;
  },

  _getContainer() {
    return document.getElementById("story-detail-container");
  },

  _hideMapSection() {
    const mapContainer = document.getElementById("detail-map");
    if (mapContainer) mapContainer.style.display = "none";

    const mapLabel = Array.from(
      document.querySelectorAll(".story-detail__info h4")
    ).find((el) => el.textContent === "Lokasi");
    if (mapLabel) mapLabel.style.display = "none";
  },
};

export default detail;
