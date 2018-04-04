// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {

// Notification settings for visual/push, audio/tone, and disruptive/alert notifications
var visual = true;
var audio = true;
var disruptive = true;

// Alert scheduling data
var alert_interval;
// Consider the default of having a low default score to quickly trigger alerts on load (1 in production) 
var current_productivity = 0.9;

// Initialize program by requesting notifications
Push.Permission.request(onGranted, onDenied);

function onGranted() {
  manager();
}

function onDenied() {
  manager();
}

// Manage the entire app, restarted after the alert triggers
function manager() {
  // Compute minutes until next alert
  alert_interval = calculate_alert_interval(current_productivity);
  // Display a countdown to the user
  time_until_alert(alert_interval);
  // Set an internal countdown to trigger an alert
  set_next_alert(alert_interval);
}

// Use current productivity score to determine minutes until next alert
function calculate_alert_interval(current_productivity) {
  let interval;
  if (current_productivity == 1 || current_productivity == 2) {
    interval = 1.5;
  }
  else if (current_productivity == 3) {
    interval = 5;
  }
  else if (current_productivity == 4) {
    interval = 10;
  }
  else if (current_productivity == 5) {
    interval = 15;
  }
  else if (current_productivity == 6) {
    interval = 20;
  }
  else if (current_productivity == 7) {
    interval = 30;
  }
  else {
    // For testing, switch to more reasonable number later
    interval = 0.25;
  }
  return interval;
}

// Displays the time in minutes and seconds until the next alert
function time_until_alert(alert_interval) {
  var next_alert = new Date();
  next_alert.setSeconds(next_alert.getSeconds() + (alert_interval * 60));
  var interval = setInterval(function() {
      var now = new Date().getTime();
      var time_difference = (next_alert - now);
      var minutes = Math.floor((time_difference/1000/60) % 60);
      var seconds = Math.floor((time_difference/1000) % 60 );
      if (seconds < 10) {seconds = "0" + seconds};
      $("#time_until_alert").text(minutes + ":" + seconds);
      if (time_difference <=100) {clearInterval(interval);};
  }, 100)
}

// Trigger alerts and restart the manager function at the end of the alert interval
function set_next_alert(minutes) {
  setTimeout(trigger_alert, (minutes * 60 * 1000));
  setTimeout(manager, (minutes * 60 * 1000));
}

// Triggers visual, audio, or disruptive alerts depending on user settings
function trigger_alert() {
  if (visual) {
    // Use Push.js to trigger a push notification
    Push.create("Please update Productive.gq");
  }
  if (audio) {
    var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3');
    a.play();
  }
  if (disruptive) {
    disruptive_alert();
  }
}

// disruptive_alert is in a separate function so visual and audio alerts continue
// to prompt the user even if the disruptive alert is not dismissed by the user
function disruptive_alert() {
  setTimeout(function(){window.alert("Please update Productive.gq")}, 1000);
}


// End of JS
// Close $(document).ready()
});









// START REFERENCE SECTION


// Display remain on page prompt; enable in production
/* window.onbeforeunload = function() {
    return true;
}; */

//var msg = new SpeechSynthesisUtterance('Hello World');
//window.speechSynthesis.speak(msg);

// One line speech
// window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello World'))



/*
// Track if push notifications are enabled
var can_push;
// Prompt user for notification permissions if permissions not granted
// This will call onGranted if notifications are granted, or onDenied if 
// notifications are blocked or if the decision is deferred
// May be able to call Push.Permission.has(); for permissions status
Push.Permission.request(onGranted, onDenied);

// Trigger changes if notifications are granted
function onGranted(callback) {
  can_push = true;
}

// Trigger changes if notifications are denied/deferred
function onDenied() {
  can_push = false;
}
*/



/* Testing code 
console.log("is false");
setTimeout(function(){Push.create("Please check in with Productive.gq")}, 2000);
// audio: http://soundbible.com/2156-Text-Message-Alert-3.html
var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
*/

/* Alert code
// Subtle alert
setTimeout(function(){alert("Please check in with Productive.gq")}, 5000);
// Intensive alert
setTimeout(function(){window.alert("Please check in with Productive.gq")}, 4000);
// Desktop Notifications
Push.create("Please check in with Productive.gq")
// Play Audio
var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
setTimeout(function(){Push.create("Please check in with Productive.gq")}, 5000);
*/

/* timer debugging code
//var remaining_time = document.getElementById("time_until_alert");
//remaining_time.innerHTML = 
//document.getElementById('time_until_alert').innerHTML(time_difference);

//if (time_difference < 0) {minutes = 0; seconds = 00}; // in case time_difference decreases below 0
//$(#time_until_alert).text(minutes + ":" + seconds) // display time on homepage
*/
