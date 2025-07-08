import routes from "./routes.js";
import performViewTransition from "../utils/transition-helper.js";
import CONFIG from "../config.js";
import App from "../app.js";

import StoryApiSource from "../model/story-api-source.js";

import HomePresenter from "../presenters/homePresenter.js";
import LoginPresenter from "../presenters/loginPresenter.js";
import RegisterPresenter from "../presenters/registerPresenter.js";
import DetailPresenter from "../presenters/detailPresenter.js";
import AddStoryPresenter from "../presenters/addStoryPresenter.js";
import NotFound from "../views/pages/not-found.js";

const router = {
  _activePage: null,

  _parseUrl() {
    const hash = window.location.hash.slice(1);
    const splittedHash = hash.split("/");
    return {
      resource: splittedHash[1] || null,
      id: splittedHash[2] || null,
    };
  },

  _getRoute(url) {
    const resource = `/${url.resource || ""}`;
    const combinedUrl = url.id ? `${resource}/:id` : resource;
    return combinedUrl;
  },

  _updateActiveNavLink(path) {
    const navLinks = document.querySelectorAll(
      "#navigation-menu a, #navigation-menu .logout-button"
    );
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkPath = link.getAttribute("href") || "";
      if (path === "/" && (linkPath === "#/" || linkPath === "#")) {
        link.classList.add("active");
      } else if (linkPath === `#${path}`) {
        link.classList.add("active");
      }
    });
  },

  handleRouteChange: async () => {
    App.renderHeader();
    await router._handlePageChange();
  },

  _handlePageChange: async () => {
    if (
      router._activePage &&
      typeof router._activePage.cleanup === "function"
    ) {
      router._activePage.cleanup();
    }

    const url = router._parseUrl();
    const path = router._getRoute(url);
    const mainContent = document.getElementById("main-content");

    router._updateActiveNavLink(path);

    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);
    const protectedRoutes = ["/", "/add-story", "/detail/:id"];
    const publicOnlyRoutes = ["/login", "/register"];

    if (protectedRoutes.includes(path) && !userToken) {
      window.location.hash = "#/login";
      return;
    }

    if (publicOnlyRoutes.includes(path) && userToken) {
      window.location.hash = "#/";
      return;
    }

    const page = routes[path] || routes["/not-found"];

    router._activePage = page;

    performViewTransition(() => {
      mainContent.innerHTML = page.render();
      page.afterRender();

      switch (path) {
        case "/":
          new HomePresenter({ view: page, storyApi: StoryApiSource });
          break;
        case "/login":
          new LoginPresenter({ view: page, storyApi: StoryApiSource });
          break;
        case "/register":
          new RegisterPresenter({ view: page, storyApi: StoryApiSource });
          break;
        case "/detail/:id":
          new DetailPresenter({
            view: page,
            storyApi: StoryApiSource,
            id: url.id,
          });
          break;
        case "/add-story":
          new AddStoryPresenter({ view: page, storyApi: StoryApiSource });
          break;
        default:
          break;
      }

      window.scrollTo(0, 0);
    });
  },
};

export default router;
