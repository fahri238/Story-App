import { openDB } from "idb";
import CONFIG from "../config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const StoryDatabase = {
  async getStory(id) {
    if (!id) return;
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putStory(story) {
    if (!story || !story.id) {
      console.error("Cannot put story without id:", story);
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },

  /**
   * @param {Array<object>} stories 
   */
  async putAllStories(stories) {
    if (!stories || !Array.isArray(stories)) return;

    const tx = (await dbPromise).transaction(OBJECT_STORE_NAME, "readwrite");
    await Promise.all(
      stories.map((story) => {
        if (story && story.id) {
          return tx.store.put(story);
        }
        return Promise.resolve();
      })
    );
    await tx.done;
  },

  async deleteStory(id) {
    if (!id) return;
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default StoryDatabase;
