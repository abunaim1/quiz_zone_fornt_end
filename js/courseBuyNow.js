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
  