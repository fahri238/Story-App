import { createNotFoundTemplate } from '../templates/template-creator';

const NotFound = {
  render() {
    return createNotFoundTemplate();
  },

  afterRender() {
  },
};

export default NotFound;
