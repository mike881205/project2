let nightMode = false

$(".night-toggle").on("click", function() {
    if (!nightMode){
        console.log("this is working");
        $(".bg").addClass("night-mode");
        $(".night-toggle").addClass("night-toggle-active");
        $(".calendar-day").addClass("calendar-day-night");
        $(".edit-btn").addClass("edit-btn-night")
        $(".free-friend").addClass("container-night");
        $(".calendar-container").addClass("container-night");
        nightMode = true
    }else{
        $(".bg").removeClass("night-mode");
        $(".night-toggle").removeClass("night-toggle-active");
        $(".calendar-day").removeClass("calendar-day-night");
        $(".edit-btn").removeClass("edit-btn-night")
        $(".free-friend").removeClass("container-night");
        $(".calendar-container").removeClass("container-night");
        nightMode = false
    }
});

$(".calendar-day").on("click", function(){
    if(nightMode && isEditing === true){
    if (!$(this).attr("is-available")){
        console.log("hello")
        $(this).addClass("calendar-day-night-avail")
    } else {
        $(this).addClass("calendar-day-night-unavail")
    }
}
})
