$("#modalLRForm").modal({
  backdrop: 'static',
  keyboard: false
});

let currentDays = []
let currentDates = []

let dayNames = function () {
  let i = 1
  let dayNum = currentDay
  while (i <= 7) {
    currentDays.push(dayNumToWord(dayNum))
    i++
    if (dayNum > 7) {
      dayNum = 1
    }
    dayNum++
  }
}
let dayDates = function () {
  let i = 0
  while (i < 7) {
    addedDay = moment().add(i, 'days').toObject()
    currentDates.push(`${addedDay.date}`)
    i++
  }
}

// =======================================================================
// Current Member Log In
// =======================================================================

let memberInput = $("#modalLRInput10")
let memPassInput = $("#modalLRInput11")
let finalComparison = []

$(".loginSubmit").on("click", function (event) {
  event.preventDefault();
  // Set the current days and dates
  currentDays = []
  dayNames();
  currentDates = []
  dayDates();
  // If the user doesn't fill out all forms, alert, and reload the page
  if (!memberInput.val().trim().trim() || !memPassInput.val().trim().trim()) {
    alert("Please enter your Name AND Password")
    return location.reload()
  }
  // Define member object for ajax calls
  let member = {
    user: memberInput.val().trim(),
    password: memPassInput.val().trim(),
  };
  // Call the validate member function with the current member as the paramater
  validateMember(member)
});

function validateMember(member) {
  console.log(member)
  // Get all users
  $.get("/api/users")
    .then(function (data) {
      console.log(data)
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          // If both the name input and password input have a match in the database
          if (member.user === data[i].user && member.password === data[i].password) {
            let memberId = data[i].id;
            localStorage.clear();
            localStorage.setItem("member Id", memberId);
            getMemAvail(memberId);
            alert("Welcome Back!");
            return
          } else if (i === (data.length - 1) && (member.user !== data[i].user || member.password !== data[i].password)) {
            alert("No users found. Please try again, or register.")
            return location.reload()
          }
        }
      } else {
        alert("No users found. Please try again, or register.")
        return location.reload()
      }
    });
}

function getMemAvail(id) {

  let currentUserSchedule = []
  let otherUsersInfo = []
  let availableFriends = []
  let otherUserID;
  let otherUserSchedule;

  $.ajax({
    method: "GET",
    url: "/api/availability/"
  }).then(function (availabilityData) {
    for (let i = 0; i < availabilityData.length; i++) {
      let userInfo = availabilityData[i]
      if (id === userInfo.UserId) {
        currentUserSchedule.push(
          userInfo.day1,
          userInfo.day2,
          userInfo.day3,
          userInfo.day4,
          userInfo.day5,
          userInfo.day6,
          userInfo.day7
        )
      } else {
        otherUsersInfo.push(userInfo)
      }
    }
    for (let i = 0; i < otherUsersInfo.length; i++) {
      otherUserID = otherUsersInfo[i].UserId
      otherUserSchedule = [
        otherUsersInfo[i].day1,
        otherUsersInfo[i].day2,
        otherUsersInfo[i].day3,
        otherUsersInfo[i].day4,
        otherUsersInfo[i].day5,
        otherUsersInfo[i].day6,
        otherUsersInfo[i].day7,
      ]
      compareAvail(currentUserSchedule, otherUserSchedule, availableFriends, otherUserID)
    }

    console.log("Available Friends (expand to view): ")
    console.log(finalComparison)

  });
}

function compareAvail(Sched1, Sched2, arr, id) {

  let otherUserName;

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).then(function (data) {
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id) {
        otherUserName = data[i].user
      }
    }
    for (let i = 0; i < 7; i++) {
      availableInfo = {}
      if (Sched1[i] === true && Sched1[i] === Sched2[i]) {
        availableInfo.name = otherUserName
        availableInfo.day = currentDays[i]
        availableInfo.date = currentDates[i]
        arr.push(availableInfo)
      }
    }
  })

  finalComparison = []

  finalComparison.push(arr)

}


// =======================================================================
// New Member Signup
// =======================================================================

let newUserName = $("#modalLRInput12")
let newUserPass = $("#modalLRInput13")

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

  $.get("/api/users", newUser)
    .then(function (data) {

      for (let i = 0; i < data.length; i++) {

        if (newUser.user === data[i].user) {

          alert("User name taken, please select another")

          return location.reload()

        }

      }

      $.post("/api/users", newUser)
        .then(function (data) {
          console.log(data)
          localStorage.clear();
          localStorage.setItem("name", data.name);
          localStorage.setItem("userId", data.id);
        });

    })

});