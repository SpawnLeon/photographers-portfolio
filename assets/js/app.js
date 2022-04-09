import i18n from './translate.js';

const THEME_NAME_LIGHT = 'light';
const THEME_NAME_DARK = 'dark';
const LANG_BUTTONS = document.querySelectorAll('[data-js-lang]');

const openMenu = () => {
  const burgerMenuNav = document.querySelector('[data-js="burger-menu-nav"]');
  if (burgerMenuNav) {
    burgerMenuNav.classList.add('open');
  }
};

const closeMenu = () => {
  const burgerMenuNav = document.querySelector('[data-js="burger-menu-nav"]');
  if (burgerMenuNav) {
    burgerMenuNav.classList.remove('open');
  }
};

const changeImage = (season) => {
  const images = document.querySelectorAll('[data-js="portfolio-items"] img');
  images.forEach((img, index) => img.src = `./assets/content/${season}/${index + 1}.jpg`);
};

const preloadImages = () => {
  const seasons = [
    'winter', 'spring', 'summer', 'autumn',
  ];

  seasons.forEach((season) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/content/${season}/${i}.jpg`;
    }
  });
};

const translate = (lang = 'en') => {
  document.querySelectorAll('[data-i18]').forEach((currentElement) => {
    const i18nKey = currentElement.dataset.i18;
    if (currentElement.placeholder) {
      currentElement.placeholder = i18n[lang][i18nKey];
    } else {
      currentElement.textContent = i18n[lang][i18nKey];
    }

    window.localStorage.setItem('lang', lang);
  });
};

const setTheme = (theme = THEME_NAME_LIGHT) => {
  theme === THEME_NAME_LIGHT
    ? document.body.classList.add(THEME_NAME_LIGHT)
    : document.body.classList.remove(THEME_NAME_LIGHT);
  localStorage.setItem('theme', theme);
};

const setLang = (lang = 'en') => {
  LANG_BUTTONS.forEach((btn) => {
    btn.classList.remove('lang__link--active');
  });
  const activeButton = document.querySelector(`[data-js-lang="${lang}"]`);
  if (activeButton) {
    activeButton.classList.add('lang__link--active');
  }

  translate(lang);
};

const main = () => {
  const lang = window.localStorage.getItem('lang') || 'en';
  setLang(lang);

  const burgerBtn = document.querySelector('[data-js="burger-button"]');

  if (burgerBtn) {
    burgerBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      // TODO: decomposition this to toggleMenu
      const isActive = burgerBtn.dataset.isActive === 'true';
      burgerBtn.dataset.isActive = !isActive;
      burgerBtn.classList.toggle('burger--active');
      isActive ? closeMenu() : openMenu();
    });
  }

  const mainMenu = document.querySelector('[data-js="main-menu"]');
  if (mainMenu) {
    mainMenu.addEventListener('click', (evt) => {
      if (evt.target.dataset.js === 'main-menu-link') {
        // TODO: decomposition this to toggleMenu
        const isActive = burgerBtn.dataset.isActive === 'true';
        burgerBtn.dataset.isActive = !isActive;
        burgerBtn.classList.toggle('burger--active');
        isActive ? closeMenu() : openMenu();
      }
    });
  }

  const portfolioButtons = document.querySelectorAll('[data-season]');
  if (portfolioButtons) {
    portfolioButtons.forEach((btn) => {
      btn.addEventListener('click', ((evt) => {
        portfolioButtons.forEach((btn) => {
          btn.classList.add('button--transparent');
        });

        evt.target.classList.remove('button--transparent');

        const { season } = evt.target.dataset;
        changeImage(season);
      }));
    });
  }

  if (LANG_BUTTONS) {
    LANG_BUTTONS.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        const { jsLang: lang } = evt.target.dataset;
        setLang(lang);
      });
    });
  }

  const themeButton = document.querySelector('[data-js="theme-button"]');
  if (themeButton) {
    themeButton.addEventListener('click', (evt) => {
      const theme = localStorage.getItem('theme') || THEME_NAME_LIGHT;
      const nextTheme = theme === THEME_NAME_LIGHT
        ? THEME_NAME_DARK
        : THEME_NAME_LIGHT;
      setTheme(nextTheme);
    });
  }

  const theme = localStorage.getItem('theme') || THEME_NAME_LIGHT;

  setTheme(theme);
  preloadImages();
};

main();
