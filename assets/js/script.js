// 
$(document).ready(function() {


// Notification settings
var visual = true;
var audio = true;
var disruptive = true;

// Alert settings 
// var alert_interval = 2;
var alert_interval;
// Start with low productivity to activate alert interval faster if no response
var current_productivity = 0.9;

//var next_alert = new Date();
//next_alert.setMinutes(now.getMinutes() + 30);

function manager() {
  alert_interval = calculate_alert_interval(current_productivity);
  set_next_alert(alert_interval);
  time_until_alert(alert_interval);
}

function time_until_alert(alert_interval) {
  var next_alert = new Date();
  next_alert.setSeconds(next_alert.getSeconds() + (alert_interval * 60));
  var interval = setInterval(function() {
      var now = new Date().getTime();
      var time_difference = (next_alert - now);
      var minutes = Math.floor((time_difference/1000/60) % 60);
      var seconds = Math.floor((time_difference/1000) % 60 );
      if (seconds < 10) {seconds = "0" + seconds};
      //if (time_difference < 0) {minutes = 0; seconds = 00};
      //$(#time_until_alert).text(minutes + ":" + seconds) // display time on homepage
      $("#time_until_alert").text(minutes + ":" + seconds)
      //var remaining_time = document.getElementById("time_until_alert");
      //remaining_time.innerHTML = 
      //document.getElementById('time_until_alert').innerHTML(time_difference);
      if (time_difference <=100) {clearInterval(interval)};
  }, 100)
  //"+hour_12+":"+mins+":"+secs"
}

function trigger_alert() {
  if (visual) {
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

// Moved to separate function to allow audio alerts and push notifications to
// continue to sound even if the alert is not dismissed by the user
function disruptive_alert() {
  setTimeout(function(){window.alert("Please update Productive.gq")}, 1000);
}

function set_next_alert(minutes) {
  setTimeout(trigger_alert, (minutes * 60 * 1000));
  setTimeout(manager, (minutes * 60 * 1000));
}

function calculate_alert_interval(current_productivity) {
  // Turn current_productivity into minutes
  let interval;
  if (current_productivity == 1 || current_productivity == 2) {
    interval = 2;
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

manager();











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

// End with closing
});
