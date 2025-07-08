import "regenerator-runtime";
import "../public/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";

import App from "./app.js";
import router from "./routes/router.js";
import SkipToContent from "./utils/skip-to-content.js";

window.addEventListener("load", () => {
  App.init();
  router.handleRouteChange();
  SkipToContent.init();
});

window.addEventListener("hashchange", () => {
  router.handleRouteChange();
});
