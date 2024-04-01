const question = (event) => {
  event.preventDefault();
  const question_paper = document.getElementById("question_paper_select").value;
  const name = document.getElementById("name").value;
  const mark = document.getElementById("mark").value;
  const info = {
    name,
    mark,
    question_paper,
  };
  fetch("https://quiz-zone-backend.onrender.com/question/list/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("You are doing mistake to set information!");
      }
      return res.json();
    })
    .then((data) => {
      alert("Successfully added question!!")
      window.location.href="admin.html"
    })
    .catch(error=>{
      alert(error.message)
    })
};

const questionPaperNameLoad = () => {
  const question_paper_select = document.getElementById("question_paper_select");
  fetch("https://quiz-zone-backend.onrender.com/question/question_paper/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item.name;
        option.value = item.id;
        question_paper_select.appendChild(option);
      });
    });
};
questionPaperNameLoad();
