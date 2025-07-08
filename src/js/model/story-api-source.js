import CONFIG from "../config.js";

class StoryApiSource {
  static async getAllStories() {
    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);

    if (!userToken) {
      throw new Error("Anda harus login terlebih dahulu.");
    }

    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson.listStory;
  }

  static async register(name, email, password) {
    const response = await fetch(`${CONFIG.BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson;
  }

  static async login(email, password) {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    localStorage.setItem(CONFIG.USER_TOKEN_KEY, responseJson.loginResult.token);

    return responseJson;
  }

  static async addNewStory(description, photo, lat, lon) {
    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);
    if (!userToken) {
      throw new Error("Anda harus login terlebih dahulu.");
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    formData.append("lat", lat);
    formData.append("lon", lon);

    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  }

  static async getStoryDetail(id) {
    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);
    if (!userToken) {
      throw new Error("Anda harus login terlebih dahulu.");
    }

    const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.story;
  }
}

export default StoryApiSource;
