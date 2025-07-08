const SkipToContent = {
  init() {
    const skipLink = document.querySelector('.skip-to-content');
    const mainContent = document.getElementById('main-content');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.setAttribute('tabindex', -1); 
      mainContent.focus();
    });

    
    mainContent.addEventListener('blur', () => {
      mainContent.removeAttribute('tabindex');
    });
  },
};

export default SkipToContent;