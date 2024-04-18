const course = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const details = document.getElementById("details").value;
  const hour = document.getElementById("hour").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").files[0];
  const formData = new FormData();
  formData.append("name", name);
  formData.append("details", details);
  formData.append("hour", hour);
  formData.append("price", price);
  formData.append("image", image);
  fetch("https://quiz-zone-backend.onrender.com/course/list/", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("You are doing mistake to set information!");
      }
      return res.json();
    })
    .then((data) => {
      alert("Successfully added Course!!");
      window.location.href = "admin.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
