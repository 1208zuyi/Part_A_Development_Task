const usaButton = document.getElementById("usa-button");
const australiaButton = document.getElementById("australia-button");
const canadaButton = document.getElementById("canada-button");
const placeholder = document.querySelector("#data-output");

let currentCountryFilter = ""; // Store the current country filter
let activeDropdownButton = null; // Store the active dropdown button

//  CUSTOMER DETAILS  //--
fetch("customers.json")
.then(function(response){
  return response.json();
})
.then(function(customers){
  // Function to filter customers by country
  function filterCustomersByCountry(country, button, city = "", page = 1) {
    currentCountryFilter = country; // Update the current filter
    let filteredCustomers = customers.filter(
      customer =>
        (country === "" || customer.country === country) &&
        (city === "" || customer.city === city)
    );

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCustomers = filteredCustomers.slice(startIndex, endIndex);

    let out = "";
    for (let i = 0; i < displayedCustomers.length; i++) {
      const customer = displayedCustomers[i];
      out += `
      <tr>     
      <td>${startIndex + i + 1}</td>        
      <td>${customer.name}</td>
      <td>${customer.address}</td>
      <td>${customer.city}</td>
      <td>${customer.pincode}</td>
      <td>${customer.country}</td>
      </tr>
      `;
    }
    placeholder.innerHTML = out;
    
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    displayPagination(page, totalPages);
    
    const entriesText = document.getElementById("entries-text");
    entriesText.innerHTML = `Showing <strong>${Math.min(endIndex, filteredCustomers.length
      )}</strong> out of <strong>${filteredCustomers.length}</strong> entries`;
      
      // Reset the previously active dropdown button if it's not the current one
      if (activeDropdownButton && activeDropdownButton !== button) {
        activeDropdownButton.classList.remove("active");
        activeDropdownButton.nextElementSibling.style.display = "none";
      }
      
      // Update the active dropdown button
      activeDropdownButton = button;
    }

    // Initially show all customers
    filterCustomersByCountry("");

    usaButton.addEventListener("click", function() {
      filterCustomersByCountry(currentCountryFilter === "USA" ? "" : "USA", usaButton);
    });

    australiaButton.addEventListener("click", function() {
      filterCustomersByCountry(currentCountryFilter === "Australia" ? "" : "Australia", australiaButton);
    });

    canadaButton.addEventListener("click", function() {
      filterCustomersByCountry(currentCountryFilter === "Canada" ? "" : "Canada", canadaButton);
    });
    const cityButtons = document.querySelectorAll(".dropdown-container button");
    cityButtons.forEach(cityButton => {
      cityButton.addEventListener("click", function () {  
        const country = activeDropdownButton.textContent.trim();
        const city = this.textContent.trim();
        filterCustomersByCountry(country, activeDropdownButton, city); 
      }); 
    });
  
    function displayPagination(currentPage, totalPages) {
      const paginationContainer = document.getElementById("pagination");
      paginationContainer.innerHTML = "";
  
      const prevButton = document.createElement("a");
      prevButton.href = "#";
      prevButton.textContent = "<";
      prevButton.classList.add("nav-button");
      if (currentPage > 1) {
        prevButton.addEventListener("click", () => {
          filterCustomersByCountry(currentCountryFilter, activeDropdownButton, "", currentPage - 1);     
        });
      } else {
        prevButton.classList.add("disabled");
      }
      paginationContainer.appendChild(prevButton);
      
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + 4, totalPages)

      if (endPage - startPage < 4) {
        startPage = Math.max(endPage - 4, 1);    
      }
  
      for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        if (i === currentPage) {
          pageLink.classList.add("active");
        }
        pageLink.addEventListener("click", () => {
          filterCustomersByCountry(currentCountryFilter, activeDropdownButton, "", i);
        });
        paginationContainer.appendChild(pageLink);
    
      }
  
      const nextButton = document.createElement("a");  
      nextButton.href = "#";  
      nextButton.textContent = ">";   
      nextButton.classList.add("nav-button");
   
      if (currentPage < totalPages) {  
        nextButton.addEventListener("click", () => {
          filterCustomersByCountry(currentCountryFilter, activeDropdownButton, "", currentPage + 1);
        });
      } else {
        nextButton.classList.add("disabled"); 
      } 
      paginationContainer.appendChild(nextButton);
    }
  });
  
  //  SIDEBAR FOR CUSTOMER DETAILS  //--
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  //  TAB  //--
  function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

  // LOGIN FORM  //--
  document.getElementById("submitBtn").addEventListener("click", function() {
    var userID = document.getElementById("userID").value;
    var password = document.getElementById("password").value;
  
    var outputContainer = document.getElementById("outputContainer");
    outputContainer.innerHTML = "<p>User ID: " + userID + "</p><p>Password: " + password + "</p>";
  
  });


