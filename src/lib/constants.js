import { HomeIcon, Square3Stack3DIcon, Square2StackIcon, SquaresPlusIcon, UsersIcon, PhotoIcon, Cog8ToothIcon } from '@heroicons/react/20/solid'

export const LOCALHOST_GEO_DATA = {
  city: "San Francisco",
  region: "CA",
  country: "US",
  latitude: "37.7695",
  longitude: "-122.385",
};

export const INTERVALS = ["1h", "24h", "7d", "30d"];

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const HOME_HOSTNAMES = new Set([
  // comment for better diffs
  "dub.sh",
  "preview.dub.sh",
  "localhost:3000",
]);

export const RESERVED_KEYS = new Set([
  "stats",
  "proxy",
  "pricing",
  "about",
  "placeholder",
  "blog",
  "careers",
  "features",
  "contact",
  "terms",
  "privacy",
  "admin",
  "help",
  "new",
  "info",
  "demo",
]);

export const DEFAULT_REDIRECTS = {
  home: "http://localhost:3000",
  signin: "http://app.localhost:3000/login",
  login: "http://app.localhost:3000/login",
  register: "http://app.localhost:3000/register",
  signup: "http://app.localhost:3000/register",
  app: "http://app.localhost:3000",
  dashboard: "http://app.localhost:3000",
  links: "http://app.localhost:3000/links",
};

export const MENU_ITEMS = {
  dashboard: {
    title: 'Dashboard',
    Icon: HomeIcon,
    link: '/'
  },
  templates: {
    title: 'Templates',
    Icon: Square3Stack3DIcon,
    link: '/templates'
  },
  cards: {
    title: 'Cards',
    Icon: Square2StackIcon,
    link: '/cards'
  },
  postcards: {
    title: 'Postcards',
    Icon: SquaresPlusIcon,
    link: '/postcards'
  },
  media: {
    title: 'Media',
    Icon: PhotoIcon,
    link: '/media'
  },
  users: {
    title: 'Users',
    Icon: UsersIcon,
    link: '/users'
  },
  settings: {
    title: 'Settings',
    Icon: Cog8ToothIcon,
    link: '/settings'
  }
}