$("#loginSubmit").on("click", function (event) {
  event.preventDefault();
  console.log("this might work");

  let newUser = {
    User: $("#modalLRInput10").val().trim(),
    Password: $("#modalLRInput11").val().trim(),
  };
  console.log(newUser);
   let isUserValid //= userFormat(newUser.user)

  if (!isUserValid || !newUser.password) {
    //alert("Please complete all fields.")
    return
  } 

  $.get("api/users", newUser).then(function (data) {
    if (data.message) {
      alert("Password or user incorrect. Please try again or register to the site.")
    } else {
      loggedIn = localStorage.setItem("loggedIn", true);
      localStorage.clear();
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);

    }
  });
});

$("#signup").on("click", function (event) {
  event.preventDefault();
  console.log("this works!!!!!!");

  let member = {
    User: $("#modalLRInput12").val().trim(),
    Password: $("#modalLRInput13").val().trim(),
  };
  console.log(member)
  let isUserValid //= userFormat(member.user)
  let isEmptyString //= checkForEmptyEntries(member)

  if (!isUserValid) {
    //alert("Please complete all fields.")
    return
  };

  $.post("api/users", member).then(function (data) {
    console.log(data)
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