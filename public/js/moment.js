let currentWeek = moment().week()
//console.log(`Current week: ${currentWeek}`)

let currentDay = moment().day();
console.log(`Current day: ${currentDay}`)

let currentDate = moment().date();
console.log(`Current date: ${currentDate}`)

let currentMonth = moment().month() + 1;
//console.log(`Current month: ${currentMonth}`)

let dayNumToWord = function(dayNum){
    switch(dayNum){
        case(0):
            return "Sun"
            break;
        case(1):
            return "Mon"
            break;
        case(2):
            return "Tue"
            break;
        case(3):
            return "Wed"
            break;
        case(4):
            return "Thu"
            break;
        case(5):
            return "Fri"
            break;
        case(6):
            return "Sat"
            break;
    }
}
let displayDays = function(){
    let i = 1
    let dayNum = currentDay
    while (i <= 7){
        $(`#week-day${i}`).text(dayNumToWord(dayNum))
        i++;
        dayNum++;
        if(dayNum > 6){
            dayNum = 0;
        }
    }
}
let displayDates = function(){
    let i = 0
    while (i < 7){
        addedDay = moment().add(i, 'days').toObject()
        //console.log(addedDay.date)
        $(`#date${i+1}`).text(`${addedDay.date}`)
        i++
    }
}
    displayDates()
    displayDays()