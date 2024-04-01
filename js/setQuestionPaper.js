const questionPaper = (event) => {
  event.preventDefault();
  const question_category = document.getElementById("question_category_select").value;
  const difficulty = document.getElementById("question_difficulties_select").value;
  const name = document.getElementById("qname").value;
  const mark = document.getElementById("mark").value;
  const time = document.getElementById("time").value;
  const info = {
    question_category,
    name,
    difficulty,
    mark,
    time,
  };
  fetch("https://quiz-zone-backend.onrender.com/question/question_paper/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("You are successfully added a question paper!")
      console.log(data);
      window.location.href="admin.html"
    });
};

const questionCategoryLoad = () => {
  const question_category_select = document.getElementById("question_category_select");
  fetch("https://quiz-zone-backend.onrender.com/question/category/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        console.log(item);
        const option = document.createElement("option");
        option.textContent = item.name;
        option.value = item.id;
        question_category_select.appendChild(option);
      });
    });
};
questionCategoryLoad();

