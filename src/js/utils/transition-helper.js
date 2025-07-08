const performViewTransition = (navigationAction) => {
  if (!document.startViewTransition) {
    console.log("View Transitions API tidak didukung oleh browser ini.");
    navigationAction();
    return;
  }

  
  const transition = document.startViewTransition(async () => {
    await navigationAction();
  });

  return transition; 
};

export default performViewTransition;