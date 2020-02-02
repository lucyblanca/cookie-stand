'use strict';

// Global variables
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var bakeryNames = ['Alki', 'Big Island', 'Manila', 'Jersey Shore', 'Seattle'];

// Bakery table and form in html
var bakeryTable = document.getElementById('bakery-table');
var bakeryForm = document.getElementById('location-form');

// Array containing all bakery objects
Bakery.allBakeries = [];
function Bakery(name, avgCookiesPerCust, minHrlyCust, maxHrlyCust) {
  this.bakeryName = name;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.minHourlyCustomers = minHrlyCust; 
  this.maxHourlyCustomers = maxHrlyCust;
  this.cookiesSoldPerHour = [];
  this.totalCookiesSold = 0;
  Bakery.allBakeries.push(this);
  this.calculateCookiesPerHour = function() {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesSoldPerHour[i] = Math.floor(this.calculateRandomNumCustPerHour() * this.avgCookiesPerCust);
    }
  };
  this.calculateRandomNumCustPerHour = function() {
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  };
  this.calculateTotalCookiesSold = function() {
    for (var i = 0; i < this.cookiesSoldPerHour.length; i++) {
      this.totalCookiesSold += this.cookiesSoldPerHour[i];
    }
  };
} // end Bakery Object definition

Bakery.addNewLocation = function(event) {
  event.preventDefault(); // The preventDefault() prevents reload of page

  var newName = event.target.locationname.value;
  var newAvgCust = parseFloat(event.target.locationavgcookiespercust.value);
  var newMinHrlyCust = parseInt(event.target.locationminhrlycust.value);
  var newMaxHourlyCust = parseInt(event.target.locationmaxhrlycust.value);

  var newLocation = new Bakery(newName, newAvgCust, newMinHrlyCust, newMaxHourlyCust);
  // Bakery.allBakeries.push(newLocation);
  newLocation.calculateCookiesPerHour();
  newLocation.calculateTotalCookiesSold();

  Bakery.renderAllBakeries();
  Bakery.generateHourlyTotals();
}; // end addNewLocation function

Bakery.renderAllBakeries = function() {
  // Clears the content of table and renders the table with all bakery objects 
  bakeryTable.textContent = '';
  Bakery.renderHeader();
  for (var i = 0; i < Bakery.allBakeries.length; i++) {
    Bakery.allBakeries[i].renderTable();
  }
}; // end renderAllBakeries function

// Creates a table header and appends to bakery table element
Bakery.renderHeader = function() {
  var headerRow = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = '                 ';
  headerRow.appendChild(thEl);
  
  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    headerRow.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  headerRow.appendChild(thEl);

  //Append row to table
  bakeryTable.append(headerRow);
};  // end Bakery.renderHeader function

// Creates a table that displays all the bakery locations and the number of
// cookies produced each hour for each bakery.
Bakery.prototype.renderTable = function() {
  // Create tr element
  var trElem = document.createElement('tr');
  // Create td element
  var tdElem = document.createElement('td');
  // Add content to td element
  tdElem.textContent = this.bakeryName;
  // Append to tr element
  trElem.appendChild(tdElem);
  // Append tr element to table
  bakeryTable.append(trElem);

  for (var i = 0; i < hours.length; i++) {
    tdElem = document.createElement('td');
    tdElem.textContent = this.cookiesSoldPerHour[i];
    trElem.appendChild(tdElem);
  }

  // Create a tr element setting the content to total cookies sold for whole day
  tdElem = document.createElement('td');
  tdElem.textContent = this.totalCookiesSold;
  trElem.appendChild(tdElem);
};  // end Bakery.prototype.renderTable

// Compute the total cookies per hour for each bakery and display each total
// at the bottom of table under each hour
Bakery.generateHourlyTotals = function() {
  var hourlyTotal = 0;
  var grandTotal = 0;
  var totalCookiesPerHour = [];
  var trElem = document.createElement('tr');
  var tdElem = document.createElement('td');
  
  tdElem.textContent = 'Totals';
  trElem.appendChild(tdElem);

  // Add up all the cookies sold per hour per bakery and store the sum
  // in an array
  for ( var i = 0; i < hours.length; i++) {
    for (var j = 0; j < Bakery.allBakeries.length; j++) {
      hourlyTotal += Bakery.allBakeries[j].cookiesSoldPerHour[i];
    }
    totalCookiesPerHour[i] = hourlyTotal;
    grandTotal += hourlyTotal;
    hourlyTotal = 0;
  }

  // Display at the bottom of table each hourly total under appropriate column.
  for ( i = 0; i < totalCookiesPerHour.length; i++) {
    // Create td element, set text content and append to table
    tdElem = document.createElement('td');
    tdElem.textContent = totalCookiesPerHour[i];
    trElem.appendChild(tdElem); 
  }

  // Create td element, set text content to grand total cookies sold and append to table
  tdElem = document.createElement('td');
  tdElem.textContent = grandTotal;
  trElem.appendChild(tdElem);    
  bakeryTable.append(trElem);
};  // end Bakery.generateHourlyTotals method

// Create Bakery Table beginning with table header
Bakery.renderHeader();

// Create Bakery instances
var alkiBakery = new Bakery('Alki', 3.7, 11, 38);
alkiBakery.calculateCookiesPerHour();
alkiBakery.calculateTotalCookiesSold();

var bigIslandBakery = new Bakery('Big Island', 4.6, 2, 16);
bigIslandBakery.calculateCookiesPerHour();
bigIslandBakery.calculateTotalCookiesSold();

var jerseyShoreBakery = new Bakery('Jersey Shore', 2.3, 20, 38);
jerseyShoreBakery.calculateCookiesPerHour();
jerseyShoreBakery.calculateTotalCookiesSold();

var manilaBakery = new Bakery('Manila', 6.3, 23, 65);
manilaBakery.calculateCookiesPerHour();
manilaBakery.calculateTotalCookiesSold();

var seattleBakery = new Bakery('Seattle', 1.2, 3, 24);
seattleBakery.calculateCookiesPerHour();
seattleBakery.calculateTotalCookiesSold();

Bakery.renderAllBakeries();
Bakery.generateHourlyTotals();

bakeryForm.addEventListener('submit', Bakery.addNewLocation);