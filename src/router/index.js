import * as pages from "../pages";
import * as indonesia from "../indonesia/pages";
import Boost from '../pages/Merchant/index';

const routes = [
  {
    path: "/",
    exact: true,
    component: indonesia.Landing,
  },
  {
    path: "/journey/:code",
    exact: true,
    component: indonesia.Journey,
  },
  {
    path: "/contract-success", 
    exact: true,
    component: indonesia.Complete,
  },
  {
    path: "/contract-pdf",
    exact: true,
    component: indonesia.ContractPDF,
  },
  {
    path: "/contacts", 
    exact: true,
    component: indonesia.Contact,
  },
  {
    path: "/merchant",
    exact: true,
    component: Boost,
  },
  {
    path: "*",
    component: pages.NotFound,
  },
];



export default routes;
