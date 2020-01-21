$("#modalLRForm").modal({
  backdrop: 'static',
  keyboard: false
});

// Display Users in Console
$.ajax({
  method: "GET",
  url: "/api/users"
}).then(function (data) {
  console.log("Current Users")
  console.log(data)
})

// Display availabilities in console
$.ajax({
  method: "GET",
  url: "/api/availability"
}).then(function (data) {
  console.log("Current Availabilities")
  console.log(data)
})

let currentDays = []
let currentDates = []

// Function to assign the names of the days
let dayNames = function () {
  let i = 0
  let dayNum = currentDay
  while (i <= 6) {
    currentDays.push(dayNumToWord(dayNum))
    i++
    if (dayNum > 6) {
      dayNum = 0
    }
    dayNum++
  }
}

// Function to assign the actual date
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
      // If data exists for users
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          // If both the name input and password input have a match in the database
          if (member.user === data[i].user && member.password === data[i].password) {
            // Set the logged in memberId
            let memberId = data[i].id;
            localStorage.clear();
            localStorage.setItem("member Id", memberId);
            // Call the function to retrieve availabilities for comparison
            getMemAvail(memberId);
            alert("Welcome Back!");
            return
            // If no user name or pass word matches, alert the user  
          } else if (i === (data.length - 1) && (member.user !== data[i].user || member.password !== data[i].password)) {
            alert("No users found. Please try again, or register.")
            return location.reload()
          }
        }
        // If not data exists alert the user
      } else {
        alert("No users found. Please try again, or register.")
        return location.reload()
      }
    });
}



function getMemAvail(id) {

  let currentUserSchedule = []
  let otherUsersInfo = []
  let availableFriendsData = []
  let availableFriends = []
  let otherUserID;
  let otherUserSchedule;

  // Get all availabilities
  $.ajax({
    method: "GET",
    url: "/api/availability/"
  }).then(function (availabilityData) {
    for (let i = 0; i < availabilityData.length; i++) {
      let userInfo = availabilityData[i]
      // If the member id equals a user info id
      if (id === userInfo.UserId) {
        // Set the schedule for the logged in user
        currentUserSchedule.push(
          userInfo.day1,
          userInfo.day2,
          userInfo.day3,
          userInfo.day4,
          userInfo.day5,
          userInfo.day6,
          userInfo.day7
        )
        // Push all other user info to another array
      } else {
        otherUsersInfo.push(userInfo)
      }
    }
    // Going through each of the other members info....
    for (let i = 0; i < otherUsersInfo.length; i++) {
      // Set the user ID and schedule for each other member
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
      // Call the function to compare the availabilities
      compareAvail(currentUserSchedule, otherUserSchedule, availableFriendsData, otherUserID)
    }

    // See the final results
    console.log("Available Friends (expand to view): ")
    console.log(availableFriendsData)
    displayFriends(availableFriendsData)


  });
}

function compareAvail(Sched1, Sched2, arr, id) {

  let otherUserName;
  finalComparison = []

  // Get list of all users
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).then(function (data) {
    for (let i = 0; i < data.length; i++) {
      // If the 'otherUserID' equals one of the user ID's
      if (id === data[i].id) {
        // Save the matching user name
        otherUserName = data[i].user
      }
    }
    // Going through both the logged in user's schedule and the other user's schedule
    for (let i = 0; i < 7; i++) {
      availableInfo = {}
      // If the first schedule instance is true and equal to the same instance from the other schedule
      if (Sched1[i] === true && Sched1[i] === Sched2[i]) {
        // Set the values for the available info Object
        availableInfo.name = otherUserName
        availableInfo.day = currentDays[i]
        availableInfo.date = currentDates[i]
        // Push the object to the available friends array
        arr.push(availableInfo)
      }
    }
  })
}

function displayFriends (arr) {

  console.log(arr)

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