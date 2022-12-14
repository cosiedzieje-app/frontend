import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faKey, 
  faCircleExclamation, 
  faTriangleExclamation, 
  faCheck, 
  faX, 
  faLocationPin, 
  faLocationCrosshairs, 
  faLocationDot,
  faMap,
  faCircleInfo,
  faHouse,
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faArrowLeft,
  faUser,
  faPen,
  faMapPin,
  faHandshake,
  faHandHoldingHeart,
  faHandPointUp,
  faStar,
  faFaceFrown,
  faMagnifyingGlass,
  faCircleQuestion,
  faAddressBook,
  faGenderless,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";

import './styles/index.scss';

library.add(
  faKey,
  faCircleExclamation,
  faTriangleExclamation,
  faCheck,
  faX,
  faLocationPin,
  faLocationCrosshairs,
  faLocationDot,
  faMap,
  faCircleInfo,
  faHouse,
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faArrowLeft,
  faUser,
  faPen,
  faMapPin,
  faHandshake,
  faHandHoldingHeart,
  faHandPointUp,
  faStar,
  faFaceFrown,
  faMagnifyingGlass,
  faCircleQuestion,
  faAddressBook,
  faGenderless,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faCalendarDays
);

const pinia = createPinia();

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .use(router)
  .use(OpenLayersMap);

app.mount('#app');
