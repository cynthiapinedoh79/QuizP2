/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quiz-form");
    const resultDiv = document.getElementById("result");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      let totalScore = 0;
      const formData = new FormData(form);
  
      for (let [key, value] of formData.entries()) {
        totalScore += parseInt(value, 10);
      }
  
      resultDiv.classList.remove("hidden");
      resultDiv.innerText = `Your Score: ${totalScore} / 10`;
  
      if (totalScore >= 6) {
        resultDiv.innerText += "\nYou might benefit from bookkeeping help. Redirecting...";
        setTimeout(() => {
          window.location.href = "format1040.html";
        }, 3000);
      } else {
        resultDiv.innerText += "\nYou're doing great! Keep it up.";
      }

      resultDiv.classList.remove("hidden");
resultDiv.classList.add("alert", "alert-info", "mt-3");





    });
  });
  
  