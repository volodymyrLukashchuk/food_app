import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faHeartbeat,
  faLemon,
  faDrumstickBite,
  faCookieBite,
  faPaw,
  faHouseUser,
  faCheese,
  faBreadSlice,
  faBacon,
  faGlassMartiniAlt,
} from "@fortawesome/free-solid-svg-icons";

export const MODAL_CONFIG = {
  signup: {
    header: "Sign Up",
    subHeader: "Welcome",
    footer: "Already have an account?",
    footerButton: "Login",
  },
  signin: {
    header: "Welcome Back",
    subHeader: "Login with your email & password",
    footer: "Don't have an account yet?",
    footerButton: "Sign Up",
  },
  password: {
    header: "Forgot Password",
    subHeader: "We'll send you a link to reset your password",
    footer: "Back to",
    footerButton: "Login",
  },
};

export const timeMid = [
  {
    id: 1,
    title: "Express Delivery",
    description: "90 min express delivery",
  },
  {
    id: 2,
    title: "8am-11am",
    description: "8:00 AM - 11:00 AM",
  },
  {
    id: 3,
    title: "11am-2pm",
    description: "11:00 AM - 2:00 PM",
  },
];

export const timeBot = [
  {
    id: 4,
    title: "2pm-5pm",
    description: "2:00 PM - 5:00 PM",
  },
  {
    id: 5,
    title: "5pm-8pm",
    description: "5:00 PM - 8:00 PM",
  },
  {
    id: 6,
    title: "8pm-11pm",
    description: "8:00 PM - 11:00 PM",
  },
];


export type Icon = {
  id: number;
  src: IconProp;
};

export const icons: Icon[] = [
  { id: 1, src: faLemon as IconProp },
  { id: 4, src: faDrumstickBite },
  { id: 7, src: faCookieBite },
  { id: 16, src: faPaw },
  { id: 21, src: faHouseUser },
  { id: 28, src: faCheese },
  { id: 35, src: faBreadSlice },
  { id: 40, src: faBacon },
  { id: 47, src: faGlassMartiniAlt },
  { id: 55, src: faHeartbeat },
];
