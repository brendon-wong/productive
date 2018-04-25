// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {
  
  $("#new-goal").keypress( function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      newGoal = $("#new-goal").val();
      $("#goals-container").append('<div class="goal">' + newGoal + '</div>');
      $("#new-goal").val("");
    }
  });
  
  $(".goal").click( function() {
    if ($(this).hasClass("complete")) {
      $(this).removeClass("complete");
      $(this).children(".fa-check").remove();
    }
    else {
      $(this).addClass("complete");
      $(this).prepend('<i class="fas fa-check"></i>');
    }
  });

  /*
  function addGoal(e) {
    if (e.which == 13 || e.keyCode == 13) {
      newGoal = $("#new-goal").val();
      $("#goals-container").append('<div class="goal">' + newGoal + '</div>');
    }
  } */

// End of JS code: close the $(document).ready() function
});
