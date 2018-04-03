// Display remain on page prompt; enable in production
/* window.onbeforeunload = function() {
    return true;
}; */

// Alerts
// Subtle alert
//setTimeout(function(){alert("Please check in with Productive.gq")}, 5000);
// Intensive alert
//setTimeout(function(){window.confirm("Please check in with Productive.gq")}, 5000);
// Desktop Notifications
//Push.create("Please check in with Productive.gq")
// Play Audio
//var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
//setTimeout(function(){Push.create("Please check in with Productive.gq")}, 5000);

// Prompt user for notification permissions if permissions not granted
var can_push;
Push.Permission.request(onGranted, onDenied);

function onGranted() {
  var can_push = true;
  setTimeout(function(){Push.create("Please check in with Productive.gq")}, 2000);
}

function onDenied() {
  var can_push = false;
  var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
}

/*
if (Push.Permission.DEFAULT || Push.Permission.DENIED) {
  Push.Permission.request();
  // audio: http://soundbible.com/2156-Text-Message-Alert-3.html
  var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
} else {
  setTimeout(function(){Push.create("Please check in with Productive.gq")}, 5000);
} */
