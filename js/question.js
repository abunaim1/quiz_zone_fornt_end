const urlParams = new URLSearchParams(window.location.search);
const question_category = urlParams.get("question_category");
var all_mark = 0;
const question = (page) => {
  fetch(`https://quiz-zone-backend.onrender.com/question/list/?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((item) => {
        if (item.question_paper == question_category) {
          displayQuestionAndAnswer(item);
        } else {
          const parent = document.getElementById("question");
          const answer_op = document.getElementById("answer_op");
          const question_pagination = document.getElementById("question_pagination");
          parent.innerHTML = "";
          answer_op.innerHTML = "";
          question_pagination.innerHTML = "";
          const div = document.createElement("div");
          div.innerHTML = `
          <h1> No Data Found <i class="fa-regular fa-face-grin-tongue"></i></h1>
          <p>You are done now! Go for next quiz</p>

          <button onclick="rateIt()" type="button" class="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate It</button>

          <button onclick="questionPaperSubmit()">Submit</button>
          `;
          answer_op.appendChild(div);
        }
      });
    });
};

const displayQuestionAndAnswer = (item) => {
  const parent = document.getElementById("question");
  const answer_op = document.getElementById("answer_op");
  answer_op.innerHTML = "";
  parent.innerHTML = "";
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div1.innerHTML = `
        <h2>${item.id}. Question</h2>
        <h3>${item.name}</h3> 
        <h5>Mark: ${item.mark}</h5> 
    `;
  fetch(`https://quiz-zone-backend.onrender.com/question/answer_option/?question=${item.id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((answer) => {
        const answer_op = document.getElementById("answer_op");
        const div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="" id="${answer.id}">
            <label class="form-check-label" for="${answer.id}">
            ${answer.answer_text}
            </label>
            `;
        answer_op.appendChild(div);
      });

      const answer_op = document.getElementById("answer_op");
      answer_op.addEventListener("submit", function (event) {
        event.preventDefault();
        const checkboxes = answer_op.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function (checkbox) {
          fetch(`https://quiz-zone-backend.onrender.com/question/answer_option/?question=${item.id}`)
            .then((res) => res.json())
            .then((data) => {
              data.forEach((cor) => {
                if (cor.is_correct && cor.id == checkbox.id) {
                  all_mark = all_mark + cor.question.mark;
                  console.log(all_mark);
                }
              });
            });
        });
      });

      const div = document.createElement("div");
      div.style.marginLeft = "30px";
      div.style.marginTop = "30px";
      div.innerHTML = `
        <button class="button primary" type="reset">Reset</button>
		<button type="submit">Submit</button>
        `;
      answer_op.appendChild(div);
    });
  parent.appendChild(div1);
  parent.appendChild(div2);
};

const next = (question_category) => {
  fetch(`https://quiz-zone-backend.onrender.com/question/list/`)
    .then((res) => res.json())
    .then((data) => {
      for (var i = 1; i <= data.count; i++) {
        const question_pagination = document.getElementById("question_pagination");
        const div = document.createElement("div");
        div.innerHTML = `
          <li class="border" onclick="question('${i}')" style="cursor: pointer; background-color: transparent;" 
                onmouseover="this.style.backgroundColor='lightgray'" 
                onmouseout="this.style.backgroundColor='transparent'" 
                onmousedown="this.style.backgroundColor='gray'" 
                onmouseup="this.style.backgroundColor='lightgray'">
              ${i}
          </li>
          `;
        question_pagination.appendChild(div);
      }
    });
};
if (question_category) {
  next(question_category);
}
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
    <li><a href="registration.html" class="button fit">Sign Up</a></li>
		<li><a href="login.html" class="button primary fit">Log In</a></li>
    `;
    parent.appendChild(div);
  }
};

const questionPaperSubmit = () => {
  const user_id = localStorage.getItem("user_id");
  const formData = new FormData();
  fetch(`https://quiz-zone-backend.onrender.com/authentication/user/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      user = data[0].id;
      formData.append("user", user);
      formData.append("mark", all_mark);
      fetch("https://quiz-zone-backend.onrender.com/question/scriptSubmission/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data);
        });
    });
};

question(1);
navMenu();

// All Category have 20 question paper
