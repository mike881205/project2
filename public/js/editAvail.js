let isEditing = false

const freeDays = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false
};

const setBusy = function(day){
    switch (day) {
      case "mon":
        freeDays.mon = false;
        break;
      case "tue":
        freeDays.tue = false;
        break;
      case "wed":
        freeDays.wed = false;
        break;
      case "thu":
        freeDays.thu = false;
        break;
      case "fri":
        freeDays.fri = false;
        break;
      case "sat":
        freeDays.sat = false;
        break;
      case "sun":
        freeDays.sun = false;
        break;
    }
  };
  const setFree = function(day){
    switch(day){
        case("mon"):
        freeDays.mon = true;
        break;
        case("tue"):
        freeDays.tue = true;
        break;
        case("wed"):
        freeDays.wed = true;
        break;
        case("thu"):
        freeDays.thu = true;
        break;
        case("fri"):
        freeDays.fri = true;
        break;
        case("sat"):
        freeDays.sat = true;
        break;
        case("sun"):
        freeDays.sun = true;
        break;
    };
};

$("#edit-btn").on("click", function(){
    if (!isEditing){
        isEditing = true
        $("#edit-btn").text("Submit")
        $(".calendar-container").addClass("calendar-container-editing")
    } else {
        isEditing = false
        $("#edit-btn").text("Edit")
        $(".calendar-container").removeClass("calendar-container-editing")
    }
    console.log(`isEditing = ${isEditing}`)
})
$(".calendar-day").on("click", function(){
    if(isEditing){
        if($(this).attr("is-available") === "false"){
            $(this).addClass("calendar-day-free");
            $(this).attr("is-available", "true");
            thisDay = $(this).attr("id");
            console.log(thisDay);
            setFree(thisDay)
            console.log(freeDays)
        }else{
            $(this).removeClass("calendar-day-free")
            $(this).attr("is-available", "false")
            thisDay = $(this).attr("id");
            console.log(thisDay)
            setBusy(thisDay)
            console.log(freeDays)
        }
        
    } 
})
