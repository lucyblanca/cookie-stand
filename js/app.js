'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var bakeryNames = ['Alki', 'Big Island', 'Manila', 'Jersey Shore', 'Seattle'];
var storeIndex = 0;

function Bakery(avgCookiesPerCust, minHrlyCust, maxHrlyCust) {
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.minHourlyCustomers = minHrlyCust; 
  this.maxHourlyCustomers = maxHrlyCust;
  this.cookiesSoldPerHour = [];
  this.totalCookiesSold = 0;
  calculateCookiesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesSoldPerHour[i] = Math.floor(this.calculateRandomNumCustPerHour() * this.avgCookiesPerCust);
    }
  },
  calculateRandomNumCustPerHour: function() {
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
  },
  calculateTotalCookiesSold: function() {
    for (var i = 0; i < this.cookiesSoldPerHour.length; i++) {
      this.totalCookiesSold += this.cookiesSoldPerHour[i];
    }
  }
}

Bakery.prototype.renderTable = function () {

}

Bakery.renderHeader = function () {

}

Bakery.generateHourlyTotals = function () {

}

Bakery.prototype.displayCookiesPerHour: function() {
    var ulElem = document.getElementById('alkiBakery');
    ulElem.textContent = `${bakeryNames[storeIndex]} Bakery`;

    var ilElem;

    for (var i = 0; i < hours.length; i++) {
      ilElem = document.createElement('li');
      ilElem.textContent = `${hours[i]}:  ${this.cookiesSoldPerHour[i]} cookies`;
      ulElem.appendChild(ilElem);
    }

    ilElem = document.createElement('li');
    ilElem.textContent = `Total Cookies Sold:  ${this.totalCookiesSold} cookies`;
    ulElem.appendChild(ilElem);
  }
}



AlkiBakery.calculateCookiesPerHour();
AlkiBakery.calculateTotalCookiesSold();
AlkiBakery.displayCookiesPerHour();

storeIndex++;

BigIslandBakery.calculateCookiesPerHour();
BigIslandBakery.calculateTotalCookiesSold();
BigIslandBakery.displayCookiesPerHour();

storeIndex++;

JerseyShoreBakery.calculateCookiesPerHour();
JerseyShoreBakery.calculateTotalCookiesSold();
JerseyShoreBakery.displayCookiesPerHour();

storeIndex++;

ManilaBakery.calculateCookiesPerHour();
ManilaBakery.calculateTotalCookiesSold();
ManilaBakery.displayCookiesPerHour();

storeIndex++;

SeattleBakery.calculateCookiesPerHour();
SeattleBakery.calculateTotalCookiesSold();
SeattleBakery.displayCookiesPerHour();

storeIndex++;
