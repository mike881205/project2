let nightMode = false;

$(".night-toggle").on("click", function() {
  if (!nightMode) {
    console.log("this is working");
    $(".bg").addClass("night-mode");
    $(".night-toggle").addClass("night-toggle-active");
    $(".calendar-day").addClass("calendar-day-night");
    $(".edit-btn").addClass("edit-btn-night");
    $(".free-friend").addClass("container-night");
    $(".events-div").addClass("container-night");
    $(".calendar-container").addClass("container-night");
    $("#friends-avail-container").addClass("friends-avail-container-night").removeClass("free-friend");

    nightMode = true;
  } else {
    $(".bg").removeClass("night-mode");
    $(".night-toggle").removeClass("night-toggle-active");
    $(".calendar-day").removeClass("calendar-day-night");
    $(".calendar-day").removeClass("calendar-day-night-unavail");
    $(".calendar-day").removeClass("calendar-day-night-avail");
    $(".edit-btn").removeClass("edit-btn-night");
    $(".free-friend").removeClass("container-night");
    $(".events-div").removeClass("container-night");
    $(".calendar-container").removeClass("container-night");
    $("#friends-avail-container").removeClass("friends-avail-container-night").removeClass("container-night").addClass("free-friend");
    nightMode = false;
  }
});

$(".calendar-day").on("click", function() {
  if (nightMode && isEditing === true) {
    if (!$(this).attr("is-available")) {
      console.log("hello");
      $(this).addClass("calendar-day-night-avail");
    } else {
      $(this).addClass("calendar-day-night-unavail");
    }
  }
});