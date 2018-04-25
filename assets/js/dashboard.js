// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {
  
  // User information
  var userCity; // Current implementation does not require declaration outside function
  
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
      var currentTempF = data.main.temp;
      var currentTempC = Math.round(((currentTempF - 32) * (5/9))*100) / 100
      var currentDescription = data.weather[0].description.toTitleCase();
      var weatherIconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      $("#weather-header").text("Local Weather in " + userCity)
      $("#weather-info").append('<p>'+ currentTempF + '° Fahrenheit | ' + currentTempC + '° Celsius</p>')
      $("#weather-info").append('<div class="flex-oneline"><p>Condition: '+ 
      currentDescription + '</p>' + '<img class="line-icon" src="' + weatherIconURL + '"></div>');
      $("#weather-info").append('<p> Sunrise: '+ sunrise + '</p>')
      $("#weather-info").append('<p> Sunset: '+ sunset + '</p>')
    });
  }
  
  // New York Times
  // NYT API key: efbb8eea500b42d9ba1ef7e42eb548bc
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
      $("#finance-info").append("<p>Bitcoin (BTC): $" + latestPrice.toString() + "</p>");
    });    
  }
  
  function liveETH() {
    var eth_url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=ETH&market=USD&apikey=7BXOVHUTKOGBASAQ";
    $.getJSON(eth_url, function(data) {
      var latestTime = data['Meta Data']['7. Last Refreshed'];
      var latestPrice = Math.round(data['Time Series (Digital Currency Intraday)'][latestTime]['1a. price (USD)'] * 100) /  100;
      $("#finance-info").append("<p>Ethereum (ETH): $" + latestPrice.toString() + "</p>");
    });    
  }
  
  function liveXRP() {
    var eth_url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=XRP&market=USD&apikey=7BXOVHUTKOGBASAQ";
    $.getJSON(eth_url, function(data) {
      var latestTime = data['Meta Data']['7. Last Refreshed'];
      var latestPrice = Math.round(data['Time Series (Digital Currency Intraday)'][latestTime]['1a. price (USD)'] * 100) /  100;
      $("#finance-info").append("<p>Ripple (XRP): $" + latestPrice.toString() + "</p>");
    });    
  }
  
  // Standard inspirational quote
  /* function inspiration() {
    $.getJSON("https://quotes.rest/qod.json?category=inspire", function(data) {
      quoteBody = data.contents.quotes[0].quote;
      quoteAuthor = data.contents.quotes[0].author;
      $("#quotes").append('<p>"' + quoteBody + '"&nbsp; – ' + quoteAuthor + '</p>');
    }); */
    
    // Design inspirational quote
    function inspiration() {
      $.ajax({
        // JSONP API
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=myCallback",
        //the name of the callback function
        jsonpCallback: "myCallback",
        dataType: "jsonp",
        success: function(data) {
          quoteBody = data[0].content;
          quoteAuthor = data[0].title;
          $("#quotes").append(quoteBody + '&nbsp; – ' + quoteAuthor);
        }
      });
    }    
  
  // Run program
  // Gets location from IP then runs weather service
  userLocation();
  latestNYT();
  liveBTC();
  liveETH();
  liveXRP();
  inspiration();

// End of JS code: close the $(document).ready() function
});

/* REFERENCE

// Could incorporate this function to delay an a tag redirect until 
// the navbar button ripple animations are complete
function linkDelay (URL) {
  setTimeout(function() { window.location = URL }, 500);
}

*/
