"use strict";

(() => {
    // Check if a User is already on Session (Logged In)
    if (!sessionStorage.getItem("user"))
    {
      // Redirect the non-User
      location.href = "login.html";
    }
})();