import signup from "../components/signup";
import login from "../components/login";
import hero from "../components/hero";
import home from "../components/home";
import job from "../components/job";
import application from "../components/application";

export default [
  {
    path: "/",
    name: "Hero",
    component: hero
  },
  {
    path: "/login/:role",
    name: "Login",
    component: login
  },
  {
    path: "/signup/:role",
    name: "Signup",
    component: signup
  },
  {
    path: "/home/:role",
    name: "Home",
    component: home
  },
  {
    path: "/job/:id",
    name: "Job",
    component: job
  },
  {
    path: "/application/:id",
    name: "Application",
    component: application
  }
];
