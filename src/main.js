import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router/index";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueResource from "vue-resource";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faCirclePlus,
  faTrash,
  faPenToSquare,
  faRightFromBracket,
  faXmark,
  faChevronRight
);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Use vue-resource package
Vue.use(VueResource);

// Use vue-router package
Vue.use(VueRouter);

const router = new VueRouter({ routes: Routes, mode: "history" });

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
