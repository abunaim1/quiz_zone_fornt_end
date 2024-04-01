const addCategory = (event) => {
  event.preventDefault();
  const category = document.getElementById("category").value;
  const description = document.getElementById("category_description").value;
  const slug = document.getElementById("slug").value
  const info = {
    category,
    description,
    slug,
  };
  console.log(info);
  fetch(`https://quiz-zone-backend.onrender.com/quiz/category/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) =>{
        alert("A new category added successfully!")
        window.location.href = "admin.html"
    });
};
