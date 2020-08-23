export function activeTabRefresh(activeTab, location, lastIndex, handler) {
  if (lastIndex > 0) location = location.substring(0, lastIndex);

  switch (location) {
    case "/products":
      if (activeTab !== "Products") return handler("Products");
      break;
    case "/home":
      if (activeTab !== "Home") return handler("Home");
      break;
    case "/login":
      if (activeTab !== "Login") return handler("Login");
      break;
    case "/register":
      if (activeTab !== "Sign Up") return handler("Sign Up");
      break;
    case "/contact":
      if (activeTab !== "Contact") return handler("Contact");
      break;
    case "/adminPortal":
      if (activeTab !== "Admin Portal") return handler("Admin Portal");
      break;
    case "/cart":
      if (activeTab !== "Cart") return handler("Cart");
      break;
    case "/account":
      if (activeTab !== "My Account") return handler("My Account");
      break;
    case "/updatePassword":
      if (activeTab !== "My Account") return handler("My Account");
      break;
  }
}
