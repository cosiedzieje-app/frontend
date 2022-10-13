import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

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
  faUser
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
  faUser
);

const pinia = createPinia();

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(router);

app.mount('#app');
