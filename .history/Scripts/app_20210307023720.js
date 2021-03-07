/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) =>
{
    function displayHome()
    {
        let paragraphOneText =
          "This is a simple site to demonstrate DOM Manipulation for ICE 1";

        let paragraphOneElement = document.getElementById("paragraphOne");

        paragraphOneElement.textContent = paragraphOneText;
        paragraphOneElement.className = "fs-5";

        // Step 1. document.createElement
        let newParagraph = document.createElement("p");
        // Step 2. configure the element
        newParagraph.setAttribute("id", "paragraphTwo");
        newParagraph.textContent = "...And this is paragraph two";
        // Step 3. select the parent element
        let mainContent = document.getElementsByTagName("main")[0];
        // Step 4. Add / Insert the element
        mainContent.appendChild(newParagraph);

        newParagraph.className = "fs-6";

        // another way of injecting content
        let paragraphDiv = document.createElement("div");
        let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
        paragraphDiv.innerHTML = paragraphThree;

        // insertions

        // example of inserting before a node
        //newParagraph.before(paragraphDiv);

        // example of inserting after a node
        newParagraph.after(paragraphDiv);

        // deletions

        // example of removing a single element
        //paragraphOneElement.remove();

        // example of removeChild
        mainContent.removeChild(paragraphOneElement);

        // update / modification
        //mainContent.firstElementChild.textContent = "Welcome Home!";

        mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 1</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;
        
    }

    function displayAbout()
    {

    }

    function displayProjects()
    {

    }

    function displayServices()
    {

    }

    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|,\s|-)([A-Z][a-z]{1,25})(\s|,|,\s|-)*/

        // form validation
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least an Capitalized First and Last Name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber()
    {
      let messageArea = $("#messageArea").hide();
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        // form validation
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country Code and Area Code are optional.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress()
    {
      let messageArea = $("#messageArea").hide();
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
        // form validation
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid email address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact()
    {

      // Form Validation
      formValidation();

      $("#sendButton").on("click", (event)=> 
      {
        if($("#subscribeCheckbox")[0].checked)
        {
          let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

          if(contact.serialize())
          {
            let key = contact.FullName.slice(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
          }
          }
      });
    }

    function displayContactList() 
    {
      
      
      // SHows what happens with asynchronous methods
      //console.log("Outside the event listener: " + XHR.responseText);

      if (localStorage.length > 0) 
      {
        let contactList = document.getElementById("contactList");

        let data = "";

        let keys = Object.keys(localStorage);

        let index = 0;
        
        for (const key of keys) 
        {
        
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th class="text-center" scope="row">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
        </tr>`;

        index++;
        }

        contactList.innerHTML = data;

        
        $("button.edit").on("click", function(){
          location.href = "edit.html#" + $(this).val();
         });

         $("button.delete").on("click", function(){
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val());
            location.href = "contact-list.html"; // refresh the page
           }  
         });

         $("#addButton").on("click", function()
         {
           location.href = "edit.html";
         });
      }
    }


    function displayEdit() 
    {
      // Get the Key from the url hash
      let key = location.hash.substring(1);
      // Set up a new contact to hold info
      let contact = new core.Contact();

      // Check if the key is empty, if not
      if (key != "")
      {
        // Get the contact information
        contact.deserialize(localStorage.getItem(key));

        // Display the information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        $("main>h1").text("Add Contact");
        $("#editButton").html('<i class="fas fa-plus-circle fa-lg"></i> Add');
      }

      // Form Validation
      formValidation();

      // When the edit button is clicked
      $("#editButton").one("click", function()
      {

        if(document.forms[0].checkValidity())
        {
          // If the key is empty, we are making a new contact
          if(key == "")
          {
            // Create a new key for this contact
            key = contact.FullName.slice(0,1) + Date.now();
          }

          // Copy the Contact Info from the form into the Contact Objet
          contact.FullName = $("#fullName").val();
          contact.ContactNumber = $("#contactNumber").val();
          contact.EmailAddress = $("#emailAddress").val();
      
          // Add the Contact to LocalStorage
          localStorage.setItem(key, contact.serialize());
          location.href = "contact-list.html";
        }
      });

      // When the Cancel Button is clicked
      $("#cancelButton").on("click", function()
      {
        // Return the user to the contact list
        location.href = "contact-list.html";
      });

    }

    function displayLogin()
    {
      // Get the Message area from the login page form
      //-Keep it hidden, untill there are errors
      let messageArea = $("#messageArea");
      messageArea.hide();

      // When the Login Button is clicked
      $("#loginButton").on("click", function()
      {
        let username = $("#username");
        let password = $("#password");
        let goodLogin = false;
        let potentialUser = new core.User();

        // Gets the data from the Json file, Goodbye XHR!
        $.get("./Data/users.json", function(data)
        {
          
          // Loop through each user in the JSON File to find a matching
          //-username & password
          for (const user of data.users) 
          {
            if (username.val() == user.Username && password.val() == user.Password)
            {
              // Get the User info!
              potentialUser.fromJSON(user);
              // Set good Login
              goodLogin = true;

              // Get out of the Loop
              break;
            }
          }
            if (goodLogin == true)
            {
              // Remove any error details, and hide the message area
              messageArea.removeAttr("class").text("").hide();
              console.log("Made it!");

              // Add the User to Session Storage
              sessionStorage.setItem("user", potentialUser.serialize());

              // Redirect the User to a secure area (Needs authentication)
              location.href = "contact-list.html"

            }
            // If the login details were not good
            else
            {
              // Give focus and select the username input
              username.trigger("focus").trigger("select");
              // Add the error classes, the error message and then show the messageArea
              messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
            }
          
        });
      });

       // When the Cancel Button is clicked
       $("#cancelButton").on("click", function()
       {
         document.forms[0].reset();
         // Return the user to the contact list
         location.href = "index.html";
       });
    }

    function displayRegister()
    {

    }

    function toggleLogin()
    {
      // Swap the login/Logout
      if (sessionStorage.getItem("user"))
      {
        $("#loginListItem").html(
          `<a id="logout" class="nav-link" aria-current="page" href="#"><i class="fas fa-user-alt fa-lg"></i> Logout</a>`
        )
      }
      else
      {
        $("#loginListItem").html(
          `<a class="nav-link" aria-current="page" href="login.html"><i class="fas fa-user-alt fa-lg"></i> Login</a>`
        )
      }

      $("#logout").on("click", function()
      {
        // Perform the Logout
        sessionStorage.clear();

        // Redirect the User
        location.href = "login.html"

      });
    }


    function Start()
    {
        console.log("App Started...");

        switch (document.title) 
        {
          case "Home":
              displayHome();
            break;
          case "About":
              displayAbout();
            break;
          case "Projects":
              displayProjects();
            break;
          case "Services":
              displayServices();
            break;
          case "Contact":
              displayContact();
            break;
          case "Contact-List":
            displayContactList();
            break;
          case "Edit":
            displayEdit();
            break;
          case "Login":
            displayLogin();
            break;
          case "Register":
            displayRegister();
            break;
        }

        toggleLogin();
        
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core={}));