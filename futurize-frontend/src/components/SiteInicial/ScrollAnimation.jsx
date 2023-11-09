export const addScrollAnimation = () => {
  const handleLinkClick = (e) => {
    e.preventDefault();

    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const links = document.querySelectorAll('.MenuItens a');

  links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });

  return () => {
    links.forEach(link => {
      link.removeEventListener('click', handleLinkClick);
    });
  };
};
