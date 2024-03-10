const loadQuizCategory = () => {
  fetch("https://quiz-zone-backend.onrender.com/quiz/category/")
    .then((res) => res.json())
    .then((data) => displayData(data));
};

const displayData = (data) => {
  const parent = document.getElementById("one");
  data.forEach((item) => {
    const article = document.createElement("article");
    article.innerHTML = `
    <div>
    <span class="image">
    <img src="images/pic01.jpg" alt="" />
    </span>
    <header class="major">
      <h3><a href="quiz.html?category_slug=${item.slug}" target='_blank' class="link">${item.category}</a></h3>
      <p>${item.description}</p>
      <p>I think you are on right Place.</p>
    </header>
    </div>
    `;
    parent.appendChild(article);
  });
};

const navMenu = () => {
  const parent = document.getElementById("xyz");
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  if ((token, user_id)) {
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
