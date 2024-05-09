const urlParams = new URLSearchParams(window.location.search);
const user_id = localStorage.getItem("user_id");
const course_id = urlParams.get("id");
let price = 0;

const buyNow = () => {
  const checkout = document.getElementById("checkout");
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.columnGap = "100px";
  div.style.justifyContent = "center";
  fetch(`https://quiz-zone-backend.onrender.com/course/list/${course_id}/`)
    .then((res) => res.json())
    .then((data) => {
      price = data.price;
      div.innerHTML = `
          <img class="rounded" src="${data.image}" alt="">
          <div>
              <h2>${data.name}</h2>
              <p>Course Details: ${data.details}</p>
              <p>Price: ${data.price}</p>
              <button onclick="pay()">Pay</button>
          </div>
          `;
      checkout.appendChild(div);
    });
};

buyNow();

const pay = () => {
    console.log("hi");
    const info = {
        user_id,
        course_id,
        price,
    };

    fetch("https://quiz-zone-backend.onrender.com/payment/pay/", {
        method: "POST",
        headers: { 
            "content-type": "application/json",
        },
        body: JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data) => {
        displayCheckOut(data)
    });
};

const displayCheckOut=(data)=>{
    console.log(data);
    window.location.href = data.GatewayPageURL
}