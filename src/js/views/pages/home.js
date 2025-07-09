import L from "leaflet";
import { createStoryItemTemplate } from "../templates/template-creator.js";

const home = {
  _map: null,
  _markerLayer: null,

  render() {
    return `
      <h2 class="page-title">Peta Cerita</h2>
      <div id="stories-map" style="height: 400px; width: 100%; margin-bottom: 2rem; border-radius: var(--border-radius);"></div>
      
      <h2 class="page-title">Daftar Cerita</h2>
      <div id="loading-stories" class="loading-indicator" style="display:none;"></div>
      <div id="story-list" class="story-list"></div>
      <div id="error-message-container"></div>
    `;
  },

  afterRender() {
    this._map = null;
    this._markerLayer = null;
  },

  showLoading() {
    document.getElementById("loading-stories").style.display = "block";
  },

  hideLoading() {
    document.getElementById("loading-stories").style.display = "none";
  },

  displayStories(stories, savedStoryIds = []) {
    const storyListContainer = document.getElementById("story-list");
    storyListContainer.innerHTML = "";

    if (stories.length === 0) {
      storyListContainer.innerHTML =
        '<p class="empty-message">Belum ada cerita yang dibagikan.</p>';
      return;
    }

    stories.forEach((story) => {
      const isSaved = savedStoryIds.includes(story.id);
      storyListContainer.innerHTML += createStoryItemTemplate(story, isSaved);
    });
  },

  showError(message) {
    const storyListContainer = document.getElementById("story-list");
    storyListContainer.innerHTML = `<p class="error-message">Gagal memuat data: ${message}</p>`;
  },

  initializeMap(stories) {
    const mapContainer = document.getElementById("stories-map");
    if (!mapContainer) return;

    if (!this._map) {
      this._map = L.map(mapContainer).setView([-2.5489, 118.0149], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this._map);
      this._markerLayer = L.layerGroup().addTo(this._map);
    }

    this._markerLayer.clearLayers();

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: '<i class="fas fa-map-marker-alt fa-2x" style="color: #415a77;"></i>',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon], { icon: customIcon })
          .addTo(this._markerLayer)
          .bindPopup(
            `
            <b>${story.name}</b><br>
            ${story.description.substring(0, 30)}...<br>
            <a href="/#/detail/${story.id}">Lihat detail</a>
          `
          );
      }
    });

    setTimeout(() => {
      if (this._map) {
        this._map.invalidateSize();
      }
    }, 100);
  },
};

export default home;
