"use strict";
// Contact Class

((core)=>{
  class User {
    // getters and setters
    get DisplayName() 
    {
      return this.m_displayName;
    }
  
    set DisplayName(value) 
    {
      this.m_displayName = value;
    }
  
    get EmailAddress() 
    {
      return this.m_emailAddress;
    }
  
    set EmailAddress(value) 
    {
      this.m_emailAddress = value;
    }

    get UserName() 
    {
      return this.m_username;
    }
  
    set UserName(value) 
    {
      this.m_username = value;
    }

    get Password() 
    {
      return this.m_password;
    }
  
    set Password(value) 
    {
      this.m_password = value;
    }
  
    // constructor

    
    constructor(displayName = "", emailAddress = "", username = "", password = "") 
    {
      this.DisplayName = displayName;
      this.Username = username;
      this.EmailAddress = emailAddress;
      this.Password = password;
    }

    // methods

    /**
     * This method overrides the built-in toString method for the Contact class
     *
     * @returns {string}
     */
    toString() 
    {
      return `Display Name     : ${this.DisplayName} \nEmail Address : ${this.EmailAddress} \nUser Name: ${this.Username}`;
    }

    /**
     * This method returns a JSON object made up of the properties of the Contact class
     *
     * @returns {Object}
     */
    toJSON()
    {
      return {
        "fullName": this.FullName,
        "contactNumber": this.ContactNumber,
        "emailAddress": this.EmailAddress
      }
    }

    /**
     * This method takes a Json data Object and assigns the values to the Contact Class Object.
     * @param {Object} data 
     */
    fromJSON(data)
    {
      this.FullName = data.FullName,
      this.ContactNumber = data.ContactNumber,
      this.EmailAddress = data.EmailAddress;
    }

    /**
     * This method converts the Contact into a comma-separated value string
     *
     * @returns {string}
     */
    serialize()
    {
      if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
      {
        return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
      }
      else 
      {
        console.error("One or more properties of the Contact is empty");
        return null;
      }
    }

    /**
     * This method takes a comma-separated data string and assigns the values to the Contact class properties
     *
     * @param {string} data
     * @return {void}
     */
    deserialize(data)
    {
      let propertyArray = data.split(",");
      this.FullName = propertyArray[0];
      this.ContactNumber = propertyArray[1];
      this.EmailAddress = propertyArray[2];
    }

  }

  core.Contact = Contact;

})(core || (core={}));


