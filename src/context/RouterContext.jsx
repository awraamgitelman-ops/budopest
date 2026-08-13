import React, { createContext, useContext, useState, useEffect } from 'react';
import { MAIN_SECTIONS, ALL_PRODUCTS } from '../data/catalogData';
import { ARTICLES_DATA } from '../data/articlesData';
import { SERVICES_DATA } from '../data/servicesData';

const RouterContext = createContext(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const RouterProvider = ({ children }) => {
  const getInitialPath = () => {
    if (window.location.hash && window.location.hash !== '#/') {
      return window.location.hash;
    }
    const path = window.location.pathname;
    if (path && path !== '/' && path !== '/index.html') {
      return '#' + (path.startsWith('/') ? path : '/' + path);
    }
    return '#/';
  };

  const [hash, setHash] = useState(getInitialPath);

  useEffect(() => {
    const handleHashChange = () => {
      const current = window.location.hash || '#/';
      setHash(current);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handlePopState = () => {
      setHash(getInitialPath());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    const targetHash = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`;
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path: e.g. "#/catalog/sheben", "#/product/granitnyj", "#/articles/sheben-fundament"
  const cleanPath = hash.replace(/^#/, '') || '/';
  const pathSegments = cleanPath.split('/').filter(Boolean);

  let pageType = 'home';
  let routeParams = {};

  if (pathSegments.length === 0 || cleanPath === '/') {
    pageType = 'home';
  } else if (pathSegments[0] === 'catalog') {
    pageType = 'catalog-section';
    routeParams.sectionId = pathSegments[1] || 'sheben';
  } else if (pathSegments[0] === 'product') {
    pageType = 'product-detail';
    routeParams.productId = pathSegments[1];
  } else if (pathSegments[0] === 'prices') {
    pageType = 'prices';
  } else if (pathSegments[0] === 'calculator') {
    pageType = 'calculator';
  } else if (pathSegments[0] === 'delivery') {
    pageType = 'delivery';
  } else if (pathSegments[0] === 'services') {
    if (pathSegments[1]) {
      pageType = 'service-detail';
      routeParams.serviceId = pathSegments[1];
    } else {
      pageType = 'services';
    }
  } else if (pathSegments[0] === 'about') {
    pageType = 'about';
  } else if (pathSegments[0] === 'warehouses') {
    pageType = 'warehouses';
  } else if (pathSegments[0] === 'articles') {
    if (pathSegments[1]) {
      pageType = 'article-detail';
      routeParams.articleId = pathSegments[1];
    } else {
      pageType = 'articles';
    }
  } else if (pathSegments[0] === 'contacts') {
    pageType = 'contacts';
  } else if (pathSegments[0] === 'order' || pathSegments[0] === 'checkout') {
    pageType = 'order';
  } else if (pathSegments[0] === 'certificates' || pathSegments[0] === 'quality') {
    pageType = 'certificates';
  } else if (pathSegments[0] === 'legal' || pathSegments[0] === 'requisites' || pathSegments[0] === 'offer' || pathSegments[0] === 'privacy' || pathSegments[0] === 'delivery-rules') {
    pageType = 'legal';
    routeParams.tab = pathSegments[1] || (pathSegments[0] === 'legal' ? 'requisites' : pathSegments[0]);
    if (routeParams.tab === 'delivery-rules') routeParams.tab = 'delivery';
  }

  // Compute breadcrumbs
  const breadcrumbs = [{ label: 'Головна', path: '#/' }];

  if (pageType === 'catalog-section') {
    const sec = MAIN_SECTIONS.find((s) => s.id === routeParams.sectionId) || { name: 'Каталог' };
    breadcrumbs.push({ label: 'Каталог', path: '#/catalog/sheben' });
    breadcrumbs.push({ label: sec.name, path: `#/catalog/${routeParams.sectionId}` });
  } else if (pageType === 'product-detail') {
    const prod = ALL_PRODUCTS.find((p) => p.id === routeParams.productId);
    if (prod) {
      const sec = MAIN_SECTIONS.find((s) => s.id === prod.sectionId);
      if (sec) {
        breadcrumbs.push({ label: sec.name, path: `#/catalog/${sec.id}` });
      }
      breadcrumbs.push({ label: prod.name, path: `#/product/${prod.id}` });
    } else {
      breadcrumbs.push({ label: 'Товар', path: `#/product/${routeParams.productId}` });
    }
  } else if (pageType === 'prices') {
    breadcrumbs.push({ label: 'Прайс-лист', path: '#/prices' });
  } else if (pageType === 'calculator') {
    breadcrumbs.push({ label: 'Калькулятор доставки', path: '#/calculator' });
  } else if (pageType === 'delivery') {
    breadcrumbs.push({ label: 'Доставка та оплата', path: '#/delivery' });
  } else if (pageType === 'services') {
    breadcrumbs.push({ label: 'Послуги спецтехніки', path: '#/services' });
  } else if (pageType === 'service-detail') {
    const serv = SERVICES_DATA.find((s) => s.id === routeParams.serviceId || s.slug === routeParams.serviceId);
    breadcrumbs.push({ label: 'Послуги спецтехніки', path: '#/services' });
    breadcrumbs.push({ label: serv ? serv.title : 'Послуга', path: `#/services/${routeParams.serviceId}` });
  } else if (pageType === 'about') {
    breadcrumbs.push({ label: 'Про компанію «РУД МОНОЛІТ»', path: '#/about' });
  } else if (pageType === 'warehouses') {
    breadcrumbs.push({ label: 'Кар\'єри та перевалки', path: '#/warehouses' });
  } else if (pageType === 'articles') {
    breadcrumbs.push({ label: 'База знань та статті', path: '#/articles' });
  } else if (pageType === 'article-detail') {
    const art = ARTICLES_DATA.find((a) => a.id === routeParams.articleId || a.slug === routeParams.articleId);
    breadcrumbs.push({ label: 'Статті', path: '#/articles' });
    breadcrumbs.push({ label: art ? art.title : 'Стаття', path: `#/articles/${routeParams.articleId}` });
  } else if (pageType === 'contacts') {
    breadcrumbs.push({ label: 'Контакти', path: '#/contacts' });
  } else if (pageType === 'certificates') {
    breadcrumbs.push({ label: 'Якість та ДСТУ', path: '#/certificates' });
  }

  // Dynamic document title update
  useEffect(() => {
    const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
    if (pageType === 'home') {
      document.title = 'РУД МОНОЛІТ — Купити щебінь, пісок, ґрунти у Дніпрі з доставкою | rud-monolit.com';
    } else if (lastCrumb && lastCrumb.label) {
      document.title = `${lastCrumb.label} — РУД МОНОЛІТ (Дніпро)`;
    }
  }, [pageType, hash]);

  const value = {
    hash,
    cleanPath,
    pageType,
    routeParams,
    breadcrumbs,
    navigate
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};
