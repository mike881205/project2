let nightMode = false

$(".night-toggle").on("click", function() {
    if (!nightMode){
        console.log("this is working");
        $(".bg").addClass("night-mode");
        $(".night-toggle").addClass("night-toggle-active");
        nightMode = true
    }else{
        $(".bg").removeClass("night-mode");
        $(".night-toggle").removeClass("night-toggle-active");
        nightMode = false
    }
});
