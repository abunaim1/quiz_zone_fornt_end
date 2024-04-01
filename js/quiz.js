const urlParams = new URLSearchParams(window.location.search);
const category_slug = urlParams.get("category_slug");
const params = new URLSearchParams(window.location.search).get("question_category");

const loadQuiz = (category_slug) => {
  fetch(`https://quiz-zone-backend.onrender.com/quiz/list/?category_slug=${category_slug}`)
    .then((res) => res.json())
    .then((data) => {
      if (category_slug == data[0].quiz_category[0]) {
        displayQuiz(data);
      } else {
        displayEmptyQuiz(data);
      }
    });
};

const displayEmptyQuiz = (data) => {
  const banner = document.getElementById("banner");
  const div = document.createElement("div");
  div.classList.add("inner");
  div.innerHTML = `
  <h1>${category_slug} Test</h1>
  <p>Hope quiz will be added soon.</p>
  `;
  banner.appendChild(div);

  const two_id = document.getElementById("two");
  two_id.innerHTML = " ";
  two_id.innerHTML = `
    <h1 class="text-center">No Quiz Available for ${category_slug} Test</h1>
  `;
};

const displayQuiz = (data) => {
  const banner = document.getElementById("banner");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("inner");
    div.innerHTML = `
        <span class="image">
        <img src="images/pic07.jpg" alt="" />
        </span>
        <header class="major">
        <h1>${item.quiz_category}</h1>
        <p>${item.quiz_description}</p>
        </header>
        <div class="content">
        </div>
        `;
    banner.appendChild(div);
  });
};

const loadQuestionCategory = () => {
  fetch("https://quiz-zone-backend.onrender.com/question/category/")
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("one");
      data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("inner");
        div.innerHTML = `
                <header class="major">
                </header>
                <a class="button primary" 
                href="quiz.html?category_slug=${category_slug}&question_category=${item.name}">
                ${item.name}
                </a>
            `;
        parent.appendChild(div);
      });
    });
};

const loadQuestionPaperByType = () => {
  fetch(`https://quiz-zone-backend.onrender.com/quiz/list/?category_slug=${category_slug}`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";
      div.style.flexWrap = "wrap";
      div.style.rowGap = "10px";
      div.style.columnGap = "10px";
      data.forEach((item) => {
        item.question_paper.forEach((qc) => {
          if (qc.question_category === params) {
            displayQuestionPaperByType(div, qc);
          }
        });
      });
      const question_paper = document.getElementById("question_paper");
      question_paper.appendChild(div);
    });
};

const displayQuestionPaperByType = (container, item) => {
  const question_paper = document.getElementById("question_paper");
  question_paper.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="card-body" style="width: 20rem;">
      <h5 class="card-title text-center" style="font-size:17px;"><a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="quesionPopUp('${item.name}', '${item.difficulty}', ${item.id}, ${item.mark}, '${item.question_category_name}', '${item.time}')">${item.name}</a></h5>
    </div>
  `;
  container.appendChild(div);
};

const loadQuestionPaper = (category_slug) => {
  fetch(`https://quiz-zone-backend.onrender.com/quiz/list/?category_slug=${category_slug}`)
    .then((res) => res.json())
    .then((data) => {
      displayQuestionPaper(data);
    });
};

const displayQuestionPaper = (data) => {
  const question_paper = document.getElementById("question_paper");
  data[0].question_paper.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-light" style="width: 20rem;" >
      <div class="card-body" >
        <h5 class="card-title text-center" style="font-size:17px;"><a type="button" class="card-title text-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="quesionPopUp('${item.name}', '${item.difficulty}', ${item.id}, ${item.mark}, '${item.question_category_name}', '${item.time}')">${item.name}</a></h5>
      </div>
      </div>
       `;
    question_paper.appendChild(div);
  });
};

const quesionPopUp = (name, difficulty, id, mark, question_category, time) => {
  const question_modal_head = document.getElementById("question_modal_head");
  question_modal_head.innerHTML = "";
  const question_modal_body = document.getElementById("question_modal_body");
  question_modal_body.innerHTML = "";
  const question_modal_footer = document.getElementById("question_modal_footer");
  question_modal_footer.innerHTML = "";
  const div1 = document.createElement("div");
  const span = document.createElement("span");
  const div2 = document.createElement("div");
  span.style.display = "flex";
  span.style.alignItems = "center";
  span.style.columnGap = "350px";
  div1.innerHTML = `
        <div>
            <p>Time: ${time}</p>
            <p>Question Category: ${question_category}</p>
            <p>Mark: ${mark}</p>
            <p>Difficulty: ${difficulty}</p>
        </div>
        `;
  span.innerHTML = `
        <h1 class="modal-title fs-5" id="exampleModalLabel">${name}</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> 
        `;
  div2.innerHTML = `
    <button type="button" class="button" data-bs-dismiss="modal">Later</button>
    <a href="question.html?question_category=${name}" type="button" class="button">Start Quiz</a>
    `;
  question_modal_body.appendChild(div1);
  question_modal_head.appendChild(span);
  question_modal_footer.appendChild(div2);
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

loadQuiz(category_slug);
loadQuestionCategory();
loadQuestionPaper(category_slug);
loadQuestionPaperByType();
navMenu();
