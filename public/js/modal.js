let calendar = $(".calendar-container")
let memberName = $("#modalLRInput10")
let memPassWord = $("#modalLRInput11")
let memberId;
let newUserName = $("#modalLRInput12")
let newUserPass = $("#modalLRInput13")

let memAvail;

$(".loginSubmit").on("click", function (event) {
  event.preventDefault();

  if (!memberName.val().trim().trim() || !memPassWord.val().trim().trim()) {
    return;
  }

  let member = {
    user: memberName.val().trim(),
    password: memPassWord.val().trim(),
  };

  console.log(member);

  validateMember(member)

});

function validateMember(member) {

  let memberLogin = member.user
  let passLogIn = member.password

  $.get("/api/users")
    .then(function (data) {

      for (let i = 0; i < data.length; i++) {

        let dbUser = data[i].user
        let dbPassword = data[i].password

        if (memberLogin !== dbUser && passLogIn !== dbPassword) {
          alert("Password or user incorrect. Please try again or register to the site.")
          return location.reload()
        } else {
          console.log("logged in as: ", dbUser)
          memberId = data[i].id
          getMemAvail()
          return
        }

      }

    });

}

function getMemAvail() {

  $.get("/api/availability" + ":" + memberId, function (data) {
    console.log("Availability", data);
    memAvail = data;

  }).then(displayMemAvail)

}

function displayMemAvail() {
console.log("almost there")
}

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

  $.post("/api/users", newUser)
    .then(function (data) {
      console.log(data)
      localStorage.clear();
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);
    });

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