window.onbeforeunload = function(e) {
  var dialogText = 'Remain productive and do not exit!';
  e.returnValue = dialogText;
  return dialogText;
};

/* Enable navigation prompt
window.onbeforeunload = function() {
    return true;
}; */
