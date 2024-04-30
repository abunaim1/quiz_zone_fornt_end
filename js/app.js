const loadQuizCategory = () => {
  fetch("https://quiz-zone-backend.onrender.com/quiz/category/")
    .then((res) => res.json())
    .then((data) => displayData(data));
};

const displayData = (data) => {
  const parent = document.getElementById("one");
  data.forEach((item) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <li style="padding: 10px;" class="p"><a class="home-angor" href="quiz.html?category_slug=${item.category}" target='_blank' class="link">${item.category}</a></li>
    `;
    parent.appendChild(div);
  });
};
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
        <li><a href="course.html">Our Courses</a></li>
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
    <li><a href="registration.html" class="button primary fit">Sign Up</a></li>
		<li><a href="login.html" class="button fit">Log In</a></li>
    `;
    parent.appendChild(div);
  }
};

navMenu();
loadQuizCategory();
