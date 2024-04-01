const leaderBoard = () => {
  const leaderboard = document.getElementById("leaderboard");
  fetch("https://quiz-zone-backend.onrender.com/question/scriptSubmission/")
    .then((res) => res.json())
    .then((data) => {
      data.sort((a, b) => b.mark - a.mark);
      data.forEach((item) => {
        const tr = document.createElement("tr");
        fetch(`https://quiz-zone-backend.onrender.com/authentication/user/?user_id=${item.user}`)
          .then((res) => res.json())
          .then((data) => {
            if (data[0].id == item.user) {
              tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${data[0].username}</td>
                    <td>${data[0].last_name} ${data[0].first_name}</td>
                    <td>${item.mark}</td>
                    `;
              leaderboard.appendChild(tr);
            }
          });
      });
    });
};
leaderBoard();
