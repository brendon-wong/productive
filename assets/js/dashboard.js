// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {
  
  // Notes
  // Should generalize with exact user location (lat, lon)for max usability
  
  // User information
  var userCity;
  var currentTemp;
  var currentDescription;
  
  // Utility functions
  // Source: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // IP geolocation
  function userLocation() {
    $.getJSON('https://api.ipdata.co', function(data) {
      userCity = data.city;
      currentWeather(userCity);
    });
  }
  
  // Current weather data
  // openweathermap API key: 9f4d6a2d14dfdbbcecbb0dcddffa8db4
  function currentWeather(userCity) {
    // API call with units in Fahrenheit = imperial
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    userCity + "&units=imperial" + "&APPID=9f4d6a2d14dfdbbcecbb0dcddffa8db4";
    $.getJSON(currentWeatherURL, function (data) {
      currentTemp = data.main.temp;
      currentDescription = data.weather[0].description.toTitleCase();
      weatherIconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      console.log(currentTemp, currentDescription, weatherIconURL)
      $("#weather-info").append('<p>'+ currentTemp + '° Fahrenheit, Condition: ' + 
      currentDescription + '</p><img class="line-icon" src="' + weatherIconURL + '">');
    });
  }
  
  // New York Times
  function latestNYT() {
    var nyt_url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    nyt_url += '?' + $.param({
      'api-key': "efbb8eea500b42d9ba1ef7e42eb548bc"
    });
    $.getJSON(nyt_url, function(data) {
      // Results is an array of article objects inside the response object "data"
      var articles = data.results;
      // set i < articles.length to display all articles
      for (var i = 0; i < 5; i++) {
        var article = articles[i]
        $('#nyt-articles').append(
          '<p class="article">' + '<a target="_blank" href="' + article.url + '">' + 
          article.title + '</a>' + '<p>' + article.abstract + '</p>' + '</p>');
      };
    });    
  }
  
  // Investing
  // AV API key: 7BXOVHUTKOGBASAQ
  function liveBTC() {
    var btc_url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=USD&apikey=7BXOVHUTKOGBASAQ";
    $.getJSON(btc_url, function(data) {
      var latestTime = data['Meta Data']['7. Last Refreshed'];
      var latestPrice = Math.round(data['Time Series (Digital Currency Intraday)'][latestTime]['1a. price (USD)'] * 100) /  100;
      console.log(latestTime);
      console.log(latestPrice);
      $("#finance-info").append("<p>Bitcoin: $" + latestPrice.toString() + "</p>");
    });    
  }
  
  function liveETH() {
    var eth_url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=ETH&market=USD&apikey=7BXOVHUTKOGBASAQ";
    $.getJSON(eth_url, function(data) {
      var latestTime = data['Meta Data']['7. Last Refreshed'];
      var latestPrice = Math.round(data['Time Series (Digital Currency Intraday)'][latestTime]['1a. price (USD)'] * 100) /  100;
      console.log(latestTime);
      console.log(latestPrice);
      $("#finance-info").append("<p>Ethereum: $" + latestPrice.toString() + "</p>");
    });    
  }
  
  function liveXRP() {
    var eth_url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=XRP&market=USD&apikey=7BXOVHUTKOGBASAQ";
    $.getJSON(eth_url, function(data) {
      var latestTime = data['Meta Data']['7. Last Refreshed'];
      var latestPrice = Math.round(data['Time Series (Digital Currency Intraday)'][latestTime]['1a. price (USD)'] * 100) /  100;
      console.log(latestTime);
      console.log(latestPrice);
      $("#finance-info").append("<p>Ripple: $" + latestPrice.toString() + "</p>");
    });    
  }
  
  function inspiration() {
    $.getJSON("https://quotes.rest/qod.json?category=inspire", function(data) {
      console.log(data);
      quoteBody = data.contents.quotes[0].quote;
      quoteAuthor = data.contents.quotes[0].author;
      $("#quotes").append('<p>"' + quoteBody + '"&nbsp; – ' + quoteAuthor + '</p>');
    });
  }
    
  
  // Run program
  userLocation();
  latestNYT();
  liveBTC();
  liveETH();
  liveXRP();
  inspiration();

// End of JS code: close the $(document).ready() function
});


/*

// Use to log JSON in console/doc
console.log(JSON.stringify(data, null, 2));
document.write(JSON.stringify(data));;
console.log(currentTemp, currentDescription);
document.write(JSON.stringify(data));

// alternate openweathermap API key from internet: 886705b4c1182eb1c69f28eb8c520e20

// Unusable because of complex data format
function todayWeather (userCity) {
  // API call with units in Fahrenheit = imperial
  var todayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
  userCity + "&units=imperial" + "&APPID=9f4d6a2d14dfdbbcecbb0dcddffa8db4";
  $.getJSON(todayWeatherURL, function (data) {
    todayTemp = data.list[0].main.temp;
    todayHigh = data.list[0].main.temp_max;
    todayLow = data.list[0].main.temp_min;
    //todayDescription = data.list[0].main.weather[0].description.toTitleCase();
    console.log(todayTemp, todayHigh, todayLow);
    console.log(data);
  });
}

*/
