const questionSelect = () => {
  const question = document.getElementById("question");
  const fetchPage = (url) => {
    const secureUrl = url.replace(/^http:\/\//i, "https://");
    fetch(secureUrl)
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((item) => {
          const option = document.createElement("option");
          option.textContent = item.name;
          option.value = item.id;
          question.appendChild(option);
        });
        if (data.next) {
          fetchPage(data.next);
        }
      });
  };
  fetchPage("https://quiz-zone-backend.onrender.com/question/list/");
};
questionSelect();


const addAnswerOption = (event) => {
  event.preventDefault();
  const questionId = document.getElementById("question").value;
  const answer_text = document.getElementById("name").value;
  const is_correct = document.getElementById("correct_answer").checked;
  fetch(`https://quiz-zone-backend.onrender.com/question/list/${questionId}/`)
  .then(res=>res.json())
  .then(data=>{
    const question = {     
        "name": data.name,
        "mark": data.mark,
        "question_paper": data.question_paper,
    }
    const requestBody = {
      question,
      answer_text,
      is_correct,
    };
    fetch("https://quiz-zone-backend.onrender.com/question/answer_option/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
    .then((res) => res.json())
    .then((data) => {
      alert("A Option added to your selected question perfectly!")
      window.location.href = "admin.html"
    })
    .catch((error) => console.error("Error:", error));
  })
};



