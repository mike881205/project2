let isEditing = false

const freeDays = {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false
}

$("#edit-btn").on("click", function(){
    if (!isEditing){
        isEditing = true
    } else {
        isEditing = false
    }
    console.log(`isEditing = ${isEditing}`)
})
$(".calendar-day").on("click", function(){
    if(isEditing){
        if($(this).attr("is-available") === "false"){
            $(this).addClass("calendar-day-free")
            $(this).attr("is-available", "true")
        }else{
            $(this).removeClass("calendar-day-free")
            $(this).attr("is-available", "false")
        }
        
    } 
})
