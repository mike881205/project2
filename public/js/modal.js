let calendar = $(".calendar-container")
let memberInput = $("#modalLRInput10")
let memPassInput = $("#modalLRInput11")
let memberId;
let newUserName = $("#modalLRInput12")
let newUserPass = $("#modalLRInput13")

let memAvail;

$("#modalLRForm").modal({
  backdrop: 'static',
  keyboard: false
});

// =======================================================================
// Current Member Log In
// =======================================================================

$(".loginSubmit").on("click", function (event) {
  event.preventDefault();

  if (!memberInput.val().trim().trim() || !memPassInput.val().trim().trim()) {
    alert("Please enter your Name AND Password")
    return location.reload()
  }

  let member = {
    user: memberInput.val().trim(),
    password: memPassInput.val().trim(),
  };

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

      getMemAvail(memberId)

    });

});

function getMemAvail(id) {

  $.ajax({
    method: "GET",
    url: "/api/availability/" + id
  }).then(function (data) {
    console.log(data)
    displayMemAvail()
  });

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