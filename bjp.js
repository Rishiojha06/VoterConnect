let btn = document.getElementById("submit-btn");
btn.addEventListener("click", async (event) => {
  console.log("Btn clicked");
  let name = document.getElementById("name").value;
  let area = document.getElementById("area").value;
  let epicid = document.getElementById("epicid").value;
  if (epicid.length === 0) {
    if (name.length === 0 || area === "") {
      var error = document.getElementById("error-div");
      error.textContent =
        "Please enter the Name and Constituency or enter the EPIC ID";
      return; // Stop execution if inputs are invalid
    }
    try {
      let usableUrl = `http://137.59.53.68:9001/elections2024admin/data/name/${name},${area}`;
      let response = await fetch(usableUrl);
      if (response.ok) {
        let recordsArray = await response.json();
        if (recordsArray.length === 0) {
          var error = document.getElementById("error-div");
          error.textContent = "No voter found. Try changing the Name/Constituency.";
        } else {
          localStorage.setItem("records", JSON.stringify(recordsArray));
          window.location.href = "bjp2.html"; // Redirect to another page
        }
      } else {
        var error = document.getElementById("error-div");
        error.textContent = "No voter information received from Server. Please retry.";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    window.location.href = `bjp4.html?epicid=${epicid}`
  }
});