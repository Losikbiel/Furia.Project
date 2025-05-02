function onScroll() {
    showNavOnScroll();
    showBackToTopOnScroll();
    activateMenuAtCurrentSection(home);
    activateMenuAtCurrentSection(cast);
    activateMenuAtCurrentSection(about);
    activateMenuAtCurrentSection(fanzone);
  
    if (scrollY > 0) {
      document.querySelector("#navigation").classList.add("scroll");
    } else {
      document.querySelector("#navigation").classList.remove("scroll");
    }
  }
  
  function activateMenuAtCurrentSection(section) {
    const targetLine = scrollY + innerHeight / 2;
  
    // verificar se a seção passou da linha
  
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop;
  
    // verificar se a base está abaixo da linha alvo
  
    const sectionEndsAt = sectionTop + sectionHeight;
    const sectionEndPassedTargetline = sectionEndsAt <= targetLine;
  
    // limites da seção
    const sectionBoundaries =
      sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline;
  
    const sectionId = section.getAttribute("id");
    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);
  
    menuElement.classList.remove("active");
    if (sectionBoundaries) {
      menuElement.classList.add("active");
    }
  }
  function showNavOnScroll() {
    if (scrollY > 0) {
      // navigation.classList.add("scroll");
      document.querySelector("#navigation").classList.add("scroll");
    } else {
      // navigation.classList.remove("scroll");
      document.querySelector("#navigation").classList.remove("scroll");
    }
  }
  
  function showBackToTopOnScroll() {
    if (scrollY > 550) {
      document.querySelector("#backToTopButton").classList.add("show");
    } else {
      document.querySelector("#backToTopButton").classList.remove("show");
    }
  }
  
  function openMenu() {
    document.body.classList.add("menu-expanded");
  }
  
  function closeMenu() {
    document.body.classList.remove("menu-expanded");
  }
  
  function openMenu() {
    document.body.classList.add("menu-expanded");
  }
  
  function closeMenu() {
    document.body.classList.remove("menu-expanded");
  }
  
  ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 700,
  }).reveal(`
      #home, 
      #home img,
      #home .stats, 
      #cast,
      #cast header,
      #cast .card
      #about,
      #about .header
      #about .content`);
  
