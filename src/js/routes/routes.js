import home from '../views/pages/home.js';
import addStory from '../views/pages/add-story.js';
import detail from '../views/pages/detail.js';
import login from '../views/pages/login.js';
import register from '../views/pages/register.js';
import NotFound from '../views/pages/not-found.js';

const routes = {
  '/': home,
  '/add-story': addStory,
  '/detail/:id': detail,
  '/login': login,
  '/register': register,
  '/not-found': NotFound,
};

export default routes;