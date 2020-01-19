let calendar = $(".calendar-container")
let memberInput = $("#modalLRInput10")
let memPassInput = $("#modalLRInput11")
let memberId;
let newUserName = $("#modalLRInput12")
let newUserPass = $("#modalLRInput13")

let memAvail;

// =======================================================================
// Current Member Log In
// =======================================================================

$(".loginSubmit").on("click", function (event) {
  event.preventDefault();

  if (!memberInput.val().trim().trim() || !memPassInput.val().trim().trim()) {
    return;
  }

  let member = {
    user: memberInput.val().trim(),
    password: memPassInput.val().trim(),
  };

  // console.log(member);

  validateMember(member)

  getMemAvail(memberId);

});

function validateMember(member) {

  $.get("/api/users")
    .then(function (data) {

      for (let i = 0; i < data.length; i++) {

        if (member.user === data[i].user && member.password === data[i].password) {
          memberId = data[i].id;
          console.log("logged in as: ", data[i].user);
          console.log("memberId (" + memberId + ") stored");
          alert("Welcome Back!")
          return
        } else if (i === (data.length - 1) && (member.user !== data[i].user || member.password !== data[i].password)) {
          alert("No users found. Please try again, or register.")
          return location.reload()
        }

      }

    });

}

function getMemAvail(memberId) {

  let getRoute = "/api/availability/" + ":" + memberId

  console.log(getRoute);

  $.get("/api/availability/" + ":" + memberId, function (data) {
    console.log(getRoute);
    memAvail = data;

  }).then(displayMemAvail)

}

function displayMemAvail() {
  console.log("almost there")
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