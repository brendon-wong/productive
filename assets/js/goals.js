// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {
  
  $("#new-goal").keypress( function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      newGoal = $("#new-goal").val();
      // jQuery Function Number 1
      $("#goals-container").append('<div class="goal">' + newGoal + '<i class="fas fa-times"></i></div>');
      $("#new-goal").val("");
    }
  });
  
  // jQuery Function Number 2
  $(document).on('click', '.goal', function() {
    // jQuery Function Number 3
    if ($(this).hasClass("complete")) {
      // jQuery Function Number 4
      $(this).removeClass("complete");
      // jQuery Function Number 5
      $(this).children(".fa-check").remove();
    }
    else {
      // jQuery Function Number 6
      $(this).addClass("complete");
      // jQuery Function Number 7
      $(this).prepend('<i class="fas fa-check"></i>');
    }  
  });
  
  $(document).on('click', '.fa-times', function() {
    // jQuery Function Number 8
    $(this).parent().remove();
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
