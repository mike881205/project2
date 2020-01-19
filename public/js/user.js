$(".loginSubmit").on("click", function (event) {
  event.preventDefault();
  console.log("this might work");

  let userName = $("#modalLRInput10")
  let userPassWord = $("#modalLRInput11")

  let member = {
    user: userName.val().trim(),
    password: userPassWord.val().trim(),
  };
  console.log(member);
  // let isUserValid //= userFormat(member.user)

  // if (!isUserValid || !member.password) {
  //   //alert("Please complete all fields.")
  //   return
  // }

  let dbID;

  $.get("/api/users", member)
    .then(function (data) {

      dbID = data[0].id
      let dbUser = data[0].user
      let dbPassword = data[0].password
      let userLogIn = member.user
      let passLogIn = member.password

      if (dbUser !== userLogIn && dbPassword !== passLogIn) {
        alert("Password or user incorrect. Please try again or register to the site.")
      } else {
        console.log("logged in as: ", dbID, dbUser)
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