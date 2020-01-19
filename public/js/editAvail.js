let isEditing = true

let freeDays = {
  day1: false,
  day2: false,
  day3: false,
  day4: false,
  day5: false,
  day6: false,
  day7: false
};

const setBusy = function (day) {
  switch (day) {
    case "day1":
      freeDays.day1 = false;
      break;
    case "day2":
      freeDays.day2 = false;
      break;
    case "day3":
      freeDays.day3 = false;
      break;
    case "day4":
      freeDays.day4 = false;
      break;
    case "day5":
      freeDays.day5 = false;
      break;
    case "day6":
      freeDays.day6 = false;
      break;
    case "day7":
      freeDays.day7 = false;
      break;
  }
};

const setFree = function (day) {
  switch (day) {
    case ("day1"):
      freeDays.day1 = true;
      break;
    case ("day2"):
      freeDays.day2 = true;
      break;
    case ("day3"):
      freeDays.day3 = true;
      break;
    case ("day4"):
      freeDays.day4 = true;
      break;
    case ("day5"):
      freeDays.day5 = true;
      break;
    case ("day6"):
      freeDays.day6 = true;
      break;
    case ("day7"):
      freeDays.day7 = true;
      break;
  };
};

$(".edit-btn").on("click", function () {
  if (!isEditing) {
    isEditing = true
    $(".edit-btn").text("Submit")
    $(".calendar-container").addClass("calendar-container-editing")
  } else {
    isEditing = false
    $(".edit-btn").text("Edit")
    $(".calendar-container").removeClass("calendar-container-editing")

    $.put("/api/availability", freeDays)
      .then(function (data) {
        console.log(data)
      })
  }
  console.log(`isEditing = ${isEditing}`)
})

$(".calendar-day").on("click", function () {
  if (isEditing) {
    if ($(this).attr("is-available") === "false") {
      $(this).addClass("calendar-day-free");
      $(this).attr("is-available", "true");
      thisDay = $(this).attr("id");
      console.log(thisDay);
      setFree(thisDay)
      console.log(freeDays)
    } else {
      $(this).removeClass("calendar-day-free")
      $(this).attr("is-available", "false")
      thisDay = $(this).attr("id");
      console.log(thisDay)
      setBusy(thisDay)
      console.log(freeDays)
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
// for (let i=1; i<=7; i++){
//   if ($(`#day${i}`).attr("is-available") === "false"){
//     $(`#day${i}`).addClass(".calendar-day-unavail")
//   }
// }

  }
})
