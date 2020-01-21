$("#modalLRForm").modal({
  backdrop: 'static',
  keyboard: false
});

let currentDays = []
let currentDates = []

// =======================================================================
// Current Member Log In
// =======================================================================

let memberInput = $("#modalLRInput10")
let memPassInput = $("#modalLRInput11")
let memberId;
let newUserName = $("#modalLRInput12")
let newUserPass = $("#modalLRInput13")

$(".loginSubmit").on("click", function (event) {

  currentDays = []
  dayNames();
  currentDates = []
  dayDates();

  console.log(currentDays)

  console.log(currentDates)


  event.preventDefault();

  if (!memberInput.val().trim().trim() || !memPassInput.val().trim().trim()) {
    alert("Please enter your Name AND Password")
    return location.reload()
  }

  let member = {
    user: memberInput.val().trim(),
    password: memPassInput.val().trim(),
  };

  validateMember(member)

});

function validateMember(member) {

  $.get("/api/users")

    .then(function (data) {

      for (let i = 0; i < data.length; i++) {

        if (member.user === data[i].user && member.password === data[i].password) {

          memberId = data[i].id;

          localStorage.clear();
          localStorage.setItem("member Id", memberId);

          getMemAvail(memberId);

          alert("Welcome Back!")

          return

        } else if (i === (data.length - 1) && (member.user !== data[i].user || member.password !== data[i].password)) {

          alert("No users found. Please try again, or register.")

          return location.reload()
        }

      }

    });

}

function getMemAvail(id) {

  $.ajax({
    method: "GET",
    url: "/api/availability/"
  })

    .then(function (data) {

      let currentUserInfo;
      let currentUserSchedule = [];
      let otherUserInfo = []

      for (let i = 0; i < data.length; i++) {

        let userInfo = data[i]

        if (id === userInfo.UserId) {

          currentUserInfo = userInfo

          currentUserSchedule.push(
            currentUserInfo.day1,
            currentUserInfo.day2,
            currentUserInfo.day3,
            currentUserInfo.day4,
            currentUserInfo.day5,
            currentUserInfo.day6,
            currentUserInfo.day7
          )

        } else {
          otherUserInfo.push(userInfo)
        }

      }

      console.log("Current User: ")
      console.log(currentUserInfo)
      console.log("Current User Schedule: ")
      console.log(currentUserSchedule)

      for (let i = 0; i < otherUserInfo.length; i++) {

        // console.log(otherUserInfo[i])

        let othertUserSchedule = [
          otherUserInfo[i].day1,
          otherUserInfo[i].day2,
          otherUserInfo[i].day3,
          otherUserInfo[i].day4,
          otherUserInfo[i].day5,
          otherUserInfo[i].day6,
          otherUserInfo[i].day7,
        ]

        let availableTogether = [];

        for (let j = 0; j < 7; j++) {

          if (currentUserSchedule[j] === othertUserSchedule[j]) {

            let availableDate = {}

            availableDate.day = currentDays[j]
            availableDate.date = currentDates[j]

            availableTogether.push(availableDate)

          }

        }

        console.log("Days Available Together: ")
        console.log(availableTogether)

      }

    });

}

let dayNames = function(){
  let i=0
  let incrementID = 1
  let dayNum = currentDay
  while (i <=7){
      currentDays.push(dayNumToWord(dayNum))
      i++
      incrementID++
      dayNum++
  }
}
let dayDates = function(){
  let i = 0
  while (i <= 7){
      addedDay = moment().add(i, 'days').toObject()
      //console.log(addedDay.date)
      currentDates.push(`${addedDay.date}`)
      i++
  }
}



// =======================================================================
// New Member Signup
// =======================================================================

$(".signup").on("click", function (event) {
  event.preventDefault();

  if (!newUserName.val().trim().trim() || !newUserPass.val().trim().trim()) {
    return;
  }

  let newUser = {
    user: newUserName.val().trim(),
    password: newUserPass.val().trim()
  };
  console.log(newUser)

  $.post("/api/users", newUser)
    .then(function (data) {
      console.log(data)
      localStorage.clear();
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);
    });

});