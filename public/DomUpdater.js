document.addEventListener("DOMContentLoaded", () => {
  fetch("/isLogedIn")
    .then((response) => response.json())
    .then((user) => {
      const signupBtn = document.querySelector(".btn.btn-primary.nav-link");
      const loginBtn = document.querySelector(".btn.btn-secondary.nav-link");
      const userProfile = document.getElementById("user-profile");

      if (user) {
        signupBtn.classList.add("d-none");
        loginBtn.classList.add("d-none");
        userProfile.classList.remove("d-none");

        const profilePic = userProfile.querySelector("img");
        if (user.PFP) {
          profilePic.src = user.PFP;
        } else {
          profilePic.src = "/assets/default.jpg"; // fallback if no profile picture exists
        }
      } else {
        signupBtn.classList.remove("d-none");
        loginBtn.classList.remove("d-none");
        userProfile.classList.add("d-none");
      }
    })
    .catch((error) => {
      console.error("Error fetching user login status:", error);
    });
});
