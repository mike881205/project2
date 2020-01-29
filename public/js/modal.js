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
  currentDays = []
  currentDates = []
  dayNames();
  dayDates();

  let member = {
    user: memberInput.val().trim(),
    password: memPassInput.val().trim(),
  };

  //Empty Out the availability arrays
  let memberAvailability = [];
  let otherUsersAvailability = [];
  let finalComparison = []

  // If there are no user inputs
  if (!memberInput.val().trim().trim() || !memPassInput.val().trim().trim()) {
    alert("Please enter your Name AND Password")
    return location.reload()
  }
  else {

    // Get all available users
    $.get("/api/users").then(function (data) {
      // If there are users in the data base
      if (data.length > 0) {

        //===========================
        // Verify the member's Info
        //===========================

        // Loop through all user data
        for (let i = 0; i < data.length; i++) {
          // If the member's name and password have matches in the db
          if (member.user === data[i].user && member.password === data[i].password) {
            // Assign the member's user ID to a variable
            let memberId = data[i].id;

            // Clear local storage and store the memberID
            localStorage.clear();
            localStorage.setItem("memberId", memberId);
            alert("Welcome Back!");

            //===================================================
            // Get the availability of the member who logged in
            //===================================================

            $.get("/api/availability/" + memberId).then(function (memAvailData) {
              //Push the member's availability to the memberAvailability array
              memberAvailability.push(
                memAvailData.day1,
                memAvailData.day2,
                memAvailData.day3,
                memAvailData.day4,
                memAvailData.day5,
                memAvailData.day6,
                memAvailData.day7
              )
              console.log(memberAvailability)

              //==========================================
              // Get the availability of all other users
              //==========================================

              // Get all user availability
              $.get("/api/availability/").then(function (otherUsers) {
                // Loop through the data
                for (let i = 0; i < otherUsers.length; i++) {
                  // If the memberId doesn't not equal any other UserId's
                  if (memberId !== otherUsers[i].UserId) {

                    // Create the otherUserInfo object
                    let otherUserInfo = {};

                    // Set the object key/value pairs
                    // ID
                    otherUserInfo.Id = otherUsers[i].UserId
                    // Schedule
                    otherUserInfo.schedule = [
                      otherUsers[i].day1,
                      otherUsers[i].day2,
                      otherUsers[i].day3,
                      otherUsers[i].day4,
                      otherUsers[i].day5,
                      otherUsers[i].day6,
                      otherUsers[i].day7,
                    ]
                    // Push the otherUserInfo object to the otherUsersAvailability array
                    otherUsersAvailability.push(otherUserInfo)
                  }
                }
                console.log(otherUsersAvailability)

                //============================================================
                // Compare the member's availability against all other users
                //============================================================

                // Loop through all of the other users
                for (let i = 0; i < otherUsersAvailability.length; i++) {
                  // Loop through the availability of the other users and compare them to the member's availability
                  for (let j = 0; j < 7; j++) {
                    // If the the member is available on a specific day and another user is available on the same day
                    if (memberAvailability[j] === true && memberAvailability[j] === otherUsersAvailability[i].schedule[j]) {

                      let otherUserID = otherUsersAvailability[i].Id
                      let day = currentDays[j]
                      let otherUserObject = {}

                      $.get("/api/users/").then(function (otherUserData) {

                        for (let i = 0; i < otherUserData.length; i++) {

                          if (otherUserID === otherUserData[i].id) {

                            otherUserObject.name = otherUserData[i].user

                          }

                        }

                      })

                      otherUserObject.freeDay = day

                      finalComparison.push(otherUserObject)

                    }

                  }

                }

                console.log(finalComparison[3])

              })

            });

            return
          }

          else if (i === (data.length - 1) && (member.user !== data[i].user || member.password !== data[i].password)) {

            alert("No users found. Please try again, or register.")
            return location.reload()

          }
        }
      }

      else {

        alert("No Users Found, Please Register")
        return location.reload()

      }
    })

  }

})

// function getMemAvail(id) {

//   let currentUserSchedule = []
//   let otherUsers = []
//   let availableFriendsData = []
//   let otherUserID;
//   let otherUserSchedule;

//   // Get all availabilities
//   $.ajax({
//     method: "GET",
//     url: "/api/availability/"
//   }).then(function (memAvailData) {
//     for (let i = 0; i < memAvailData.length; i++) {
//       let memAvailData = memAvailData[i]
//       // If the member id equals a user info id
//       if (id === memAvailData.UserId) {
//         // Set the schedule for the logged in user
//         currentUserSchedule.push(
//           memAvailData.day1,
//           memAvailData.day2,
//           memAvailData.day3,
//           memAvailData.day4,
//           memAvailData.day5,
//           memAvailData.day6,
//           memAvailData.day7
//         )
//         // Push all other user info to another array
//       } else {
//         otherUsers.push(memAvailData)
//       }
//     }
//     // Going through each of the other members info....
//     for (let i = 0; i < otherUsers.length; i++) {
//       // Set the user ID and schedule for each other member
//       otherUserID = otherUsers[i].UserId
//       otherUserSchedule = [
//         otherUsers[i].day1,
//         otherUsers[i].day2,
//         otherUsers[i].day3,
//         otherUsers[i].day4,
//         otherUsers[i].day5,
//         otherUsers[i].day6,
//         otherUsers[i].day7,
//       ]
//       // Call the function to compare the availabilities
//       compareAvail(currentUserSchedule, otherUserSchedule, availableFriendsData, otherUserID)
//     }

//     // See the final results
//     console.log("Available Friends (expand to view): ")
//     console.log(availableFriendsData)

//   });
// }



// function compareAvail(Sched1, Sched2, arr, id) {

//   let otherUserName;
//   finalComparison = []

//   // Get list of all users
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).then(function (data) {
//     for (let i = 0; i < data.length; i++) {
//       // If the 'otherUserID' equals one of the user ID's
//       if (id === data[i].id) {
//         // Save the matching user name
//         otherUserName = data[i].user
//       }
//     }
//     // Going through both the logged in user's schedule and the other user's schedule
//     for (let i = 0; i < 7; i++) {
//       availableInfo = {}
//       // If the first schedule instance is true and equal to the same instance from the other schedule
//       if (Sched1[i] === true && Sched1[i] === Sched2[i]) {
//         // Set the values for the available info Object
//         availableInfo.name = otherUserName
//         availableInfo.day = currentDays[i]
//         availableInfo.date = currentDates[i]
//         // Push the object to the available friends array
//         arr.push(availableInfo)
//       }
//     }
//   })
// }

// function freeToday(arr){
//   for(let i=0; i<=arr.length; i++){
//     incrementDay = arr.i.date
//     if (incrementDay.parseInt() === moment().date()){
//       $("#free-friend-text").text(`Your friend ${arr.i.name} is free today!`)
//     }
//   }
// }

//=======================================================================
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