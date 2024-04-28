const courseLoad = () => {
  const main = document.getElementById("main");
  fetch("https://quiz-zone-backend.onrender.com/course/list/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("card", "m-2");
        div.style.width = "18rem";
        div.innerHTML = `
            <img style="height:200px" src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <span class="h6 fw-bold card-title">${item.name}</span>
                <p class="h6 card-title">Duration: ${item.hour}</p>
                <p class="h6 card-title">Price: ${item.price}</p>
                <a href="checkout.html?id=${item.id}" class="text-light btn btn-secondary">Buy Now</a>
            </div>
          `;
        main.appendChild(div);
      });
    });
};

if (window.location.href.endsWith("course.html")) {
  courseLoad();
}

const buyNow = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const checkout = document.getElementById("checkout");
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.columnGap = "100px";
  div.style.justifyContent = "center";
  fetch(`https://quiz-zone-backend.onrender.com/course/list/${productId}/`)
    .then((res) => res.json())
    .then((data) => {
      div.innerHTML = `
        <img class="rounded" src="${data.image}" alt="">
        <div>
            <h2>${data.name}</h2>
            <p>Course Details: ${data.details}</p>
            <p>Price: ${data.price}</p>
            <button>Pay</button>
        </div>
        `;
      checkout.appendChild(div);
    });
};

buyNow();
