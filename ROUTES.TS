const ROUTES = {
  // AUTH ROUTES
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/",

  // CUSTOMER ROUTES
  CUSTOMER: "/Customer",
  CREATE: "/Customer/Create",
  SHIPMENT: "/Customer/shipment",
  TRACK: "/Customer/track",
  HISTORY: "/Customer/history",

  // ADMIN ROUTES
  ADMIN: "/admin",
  ALLSHIPMENTS: "/admin/allshipments",
  PENDING: "/admin/pending",
  INTRANSIT: "/admin/intransit",
  Delivered: "/admin/delivered",
  CUSTOMERS: "/admin/customers",
  CHECKRIDERS: "/admin/checkRiders",
  RIDERAPP: "/admin/riderApp",

  // PROFILE ROUTES
  PROFILE: "/profile",
  EDIT: "/profile/edit",

  // RIDER ROUTES
  RIDER: "/rider",
  RIDERDELI: "/rider/Deliveries",
  RIDERPENDING: "/rider/Pending",
  RIDERTRANSIT: "/rider/Transit",
  RIDERCOMPLETE: "/rider/Complete",
};

export default ROUTES;
