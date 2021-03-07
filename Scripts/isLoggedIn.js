"use strict";

(() => {
    // Check if a User is already on Session (Logged In)
    if (sessionStorage.getItem("user"))
    {
      // Redirect the User
      location.href = "contact-list.html";
    }
})();