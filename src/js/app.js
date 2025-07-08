import CONFIG from "./config.js";
import PushNotification from "./utils/push-notification-helper.js";

const App = {
  init() {
    this.renderHeader();

    // Hanya jalankan fitur PWA di mode produksi
    if (!module.hot) {
      this._initializePwaFeatures();
    }
  },

  async _initializePwaFeatures() {
    await this._registerServiceWorker();
    PushNotification.init();
  },

  async _registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/service-worker.js");
      } catch (error) {
        // console.error ditiadakan untuk produksi
      }
    }
  },

  renderHeader() {
    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);
    const navMenu = document.getElementById("navigation-menu");

    if (userToken) {
      navMenu.innerHTML = `
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/add-story">Tambah Cerita</a></li>
          <li><button id="logout-button" class="logout-button">Logout</button></li>
        </ul>
      `;
      const logoutButton = document.getElementById("logout-button");
      if (logoutButton) {
        logoutButton.addEventListener("click", this.logout.bind(this));
      }
    } else {
      navMenu.innerHTML = `
        <ul>
          <li><a href="#/login">Login</a></li>
          <li><a href="#/register">Register</a></li>
        </ul>
      `;
    }
  },

  logout() {
    localStorage.removeItem(CONFIG.USER_TOKEN_KEY);
    this.renderHeader();
    window.location.hash = "#/login";
  },
};

export default App;
