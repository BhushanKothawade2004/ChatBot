let delBtn = document.querySelector(".delete");


delBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
    if (event.target.matches(".delete")) {
        if (confirm("Do you want to really delete your chat?")) {
            // Your delete logic here
            console.log("Chat deleted");
        } else {
            console.log("Deletion canceled");
        }
    }
  // Implement your deletion logic here (e.g., using fetch API)
  console.log("Delete chat logic goes here!");
  window.alert("Do you want to really delete your chat?");
});
