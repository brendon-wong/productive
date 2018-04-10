// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {

// Notification settings for visual and audio notifications
var visual = true;
var audio = true;

// Alert scheduling data
var alert_interval;
// Defaults to a low score to quickly trigger an alert when the website is loaded
// 1 in production, use <1 for testing
var current_productivity = 1;

// Initialize program by requesting notifications
// Consider launching manager separately to begin countdown
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
  // Set current_productivity to 1 so that users are notified until they check-in
  current_productivity = 1;
}

// Create global variables for alert intervals in minutes to display to the user
var s1_interval = 1;
var s2_interval = 3;
var s3_interval = 5;
var s4_interval = 10;
var s5_interval = 15;
var s6_interval = 20;
var s7_interval = 30;
var interval;

// Use current productivity score to determine minutes until next alert
function calculate_alert_interval(current_productivity) {
  if (current_productivity == 1) {
    interval = s1_interval;
  }
  else if (current_productivity == 2) {
    interval = s2_interval;
  }
  else if (current_productivity == 3) {
    interval = s3_interval;
  }
  else if (current_productivity == 4) {
    interval = s4_interval;
  }
  else if (current_productivity == 5) {
    interval = s5_interval;
  }
  else if (current_productivity == 6) {
    interval = s6_interval;
  }
  else if (current_productivity == 7) {
    interval = s7_interval;
  }
  else {
    // Use for user-driven notification testing and internal testing
    interval = 0.1;
  }
  return interval;
}

// Create global variable for recurring display_countdown task
// so other functions can deactivate the recurring task
var display_countdown;

// Displays the time in minutes and seconds until the next alert
function time_until_alert(alert_interval) {
  var next_alert = new Date();
  next_alert.setSeconds(next_alert.getSeconds() + (alert_interval * 60));
  display_countdown = setInterval(function() {
      var now = new Date().getTime();
      var time_difference = next_alert - now;
      var minutes = Math.floor((time_difference/1000/60) % 60);
      var seconds = Math.floor((time_difference/1000) % 60 );
      if (seconds < 10 && time_difference >= 0) {seconds = "0" + seconds};
      if (time_difference < 0) {minutes = 0; seconds = 00};
      $("#time_until_alert").text(minutes + ":" + seconds);
      if (time_difference <=100) {clearInterval(display_countdown);};
  }, 100)
}

// Create global variables for scheduled calling of trigger_alert and manager
// so other functions can deactivate the scheduled calls
var schedule_alert;
var schedule_manager;

// Trigger alerts and restart the manager function at the end of the alert interval
function set_next_alert(minutes) {
  schedule_alert = setTimeout(trigger_alert, (minutes * 60 * 1000));
  schedule_manager = setTimeout(manager, (minutes * 60 * 1000));
}

// Triggers visual or audio alerts depending on user settings
function trigger_alert() {
  if (visual) {
    // Use Push.js to trigger a push notification
    Push.create("Please update Productive.gq");
  }
  if (audio) {
    var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3');
    a.play();
  }
}

// If a current_productivity button is clicked, stop countdown and scheduled
// alert/manager calls, and reset timer using the current_productivity button value
$(".modern-button").click(function() {
  current_productivity = $(this).text();
  clearInterval(display_countdown);
  clearTimeout(schedule_alert);
  clearTimeout(schedule_manager);
  manager();
});

// Trigger an alert quickly
$("#notify").click(function() {
  current_productivity = 0.1;
  clearInterval(display_countdown);
  clearTimeout(schedule_alert);
  clearTimeout(schedule_manager);
  manager();
});

// Display remain on page prompt; enable in production
/* window.onbeforeunload = function() {
    return true;
}; */

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
