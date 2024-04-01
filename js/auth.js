const userRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  if (password == confirm_password) {
    fetch("https://quiz-zone-backend.onrender.com/authentication/registration/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Check Your Email To Activate Your Account!!");
        window.location.href = "login.html";
      });
  } else {
    document.getElementById("error").innerText = "You have to match the Password and confirm password";
  }
};

const userLogin = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  if ((username, password)) {
    fetch("https://quiz-zone-backend.onrender.com/authentication/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          if (username == "admin") {
            window.location.href = "admin.html";
          } else {
            window.location.href = "index.html";
          }
        }
      });
  }
};

const userLogout = () => {
  alert("Logout Sucessfully!!");
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  window.location.href = "index.html";
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};
