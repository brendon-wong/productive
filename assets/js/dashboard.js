// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {
  
  // Set defaults
  var userCity = "San Francisco";

  // IP Geolocation
  $.getJSON('https://api.ipdata.co', function(data) {
    userCity = data.city;
  });
  
  // 
  // openweathermap API key: 9f4d6a2d14dfdbbcecbb0dcddffa8db4
  // stolen API key: 886705b4c1182eb1c69f28eb8c520e20
  var openweathermapURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
  userCity + "&units=imperial" + "&APPID=886705b4c1182eb1c69f28eb8c520e20";
  
  $.getJSON(openweathermapURL, function (data) {
            document.write(JSON.stringify(data));
  });
  

// End of JS code: close the $(document).ready() function
});


/*

// Use to log JSON in console/doc
console.log(JSON.stringify(data, null, 2));
document.write(JSON.stringify(data));;

*/
