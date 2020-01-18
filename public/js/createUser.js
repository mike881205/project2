$(".loginSubmit").on("click", function (event) {
  event.preventDefault();
  console.log("this might work");

  let member = {
    user: $("#modalLRInput10").val().trim(),
    password: $("#modalLRInput11").val().trim(),
  };
  console.log(member);
  // let isUserValid //= userFormat(member.user)

  // if (!isUserValid || !member.password) {
  //   //alert("Please complete all fields.")
  //   return
  // }

  $.get("/api/users", member)
    .then(function (data) {
      // if (data.message) {
      //   alert("Password or user incorrect. Please try again or register to the site.")
      // } else {
      //   loggedIn = localStorage.setItem("loggedIn", true);
      //   localStorage.clear();
      //   localStorage.setItem("name", data.name);
      //   localStorage.setItem("userId", data.id);

      // }
      console.log(data[0])

      let dbUser = data[0].user
      let dbPassword = data[0].password
      let userLogIn = member.user
      let passLogIn = member.password

      if (dbUser !== userLogIn && dbPassword !== passLogIn) {
        console.log("not a user")
      } else {
        console.log("logged in")
      }

    });
});

$(".signup").on("click", function (event) {
  event.preventDefault();
  console.log("this works!!!!!!");

  let newUser = {
    user: $("#modalLRInput12").val().trim(),
    password: $("#modalLRInput13").val().trim()
  };
  console.log(newUser)
  // let isUserValid //= userFormat(newUser.user)
  // let isEmptyString //= checkForEmptyEntries(newUser)

  // if (!isUserValid) {
  //   //alert("Please complete all fields.")
  //   return
  // };

  let freeDays = {
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false
  };

  $.post("/api/users", newUser)
    .then(function (data) {
      console.log(data)
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);
    });

  // $.post("/api/availability", freeDays)
  //   .then(function (data) {
  //     console.log(data)
  //   });
});

/* function userFormat(user) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let format = (user.match(regex));
  if (!user || !format) {
    return false
  }
  return true
};

function checkForEmptyEntries(entry) {
  for (let key in entry) {
    if (!entry[key]) {
      return false
    };
  };
}; */