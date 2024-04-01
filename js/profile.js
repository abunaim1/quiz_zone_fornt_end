const navMenu = () => {
  const parent = document.getElementById("xyz");
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  if ((token, user_id)) {
    if (user_id == 1) {
      const forAdmin = document.getElementById("forAdmin");
      forAdmin.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="leaderboard.html">Leaderboard</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="aboutUs.html">About Us</a></li>
        <li><a href="admin.html">Admin Panel</a></li>
        <li><a href="contactUs.html">Contact Us</a></li>
      `;
    }
    const div = document.createElement("div");
    div.innerHTML = `
      <li onclick="userLogout()" class="button fit">Logout</li>
      `;
    parent.appendChild(div);
  } else {
    parent.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
          <li><a href="registration.html" class="button fit">Sign Up</a></li>
          <li><a href="login.html" class="button primary fit">Log In</a></li>
      `;
    parent.appendChild(div);
  }
};

const profile = () => {
  const user_id = localStorage.getItem("user_id");
  const parent = document.getElementById("profile");
  fetch(`https://quiz-zone-backend.onrender.com/authentication/user/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <h4>User Id: ${data[0].id}</h4>
      <h4>Username: ${data[0].username}</h4>
      <h4>First Name: ${data[0].first_name}</h4>
      <h4>Last Name: ${data[0].last_name}</h4>
      <h4>Email: ${data[0].email}</h4>
      <button>Update Your Profile</button>
      `;
      parent.appendChild(div);
    });
};

const userImageUpload = (event) => {
  event.preventDefault();
  const image = document.getElementById("profileImage").files[0];
  const user_id = localStorage.getItem("user_id");
  const formData = new FormData();

  fetch(`https://quiz-zone-backend.onrender.com/authentication/user/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      const user = data[0].id;
      formData.append("image", image);
      formData.append("user", user);

      fetch("https://quiz-zone-backend.onrender.com/authentication/image/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Image Uploaded Successfully!!");
        });
    })
    .catch((error) => console.error("Error fetching user data:", error));
};

const userImageShow = () => {
  const user_id = localStorage.getItem("user_id");
  fetch("https://quiz-zone-backend.onrender.com/authentication/image/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        if (user_id == item.user) {
          const parent = document.getElementById("userImage");
          const wpm = document.getElementById("wpm");
          wpm.innerHTML = "";
          const div = document.createElement("div");
          div.innerHTML = `
        <img style="height: 350px; width:350px; border-radius:50%;" src="${item.image}" alt="Profile Picture" />
        `;
          parent.appendChild(div);
        }
      });
    });
};

navMenu();
profile();
userImageShow();
