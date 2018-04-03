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
if (Push.Permission.DEFAULT || Push.Permission.DENIED) {
  Push.Permission.request();
} else {
  var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
}
