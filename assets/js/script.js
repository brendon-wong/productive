// Notification settings
var visual = true;
var audio = true;
var disruptive = true;

// Alert settings 
// var alert_interval = 2;
var alert_interval;
// Start with low productivity to activate alert interval faster if no response
var current_productivity = 0.2;

//var next_alert = new Date();
//next_alert.setMinutes(now.getMinutes() + 30);

function manager() {
  alert_interval = calculate_alert_interval(current_productivity);
  set_next_alert(alert_interval);
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
  setTimeout(function(){window.alert("Please update Productive.gq")}, 5000);
}

function set_next_alert(minutes) {
  setTimeout(trigger_alert, (minutes * 60 * 1000));
  setTimeout(manager, (minutes * 60 * 1000));
}

function calculate_alert_interval(current_productivity) {
  let interval = 0.1;
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
