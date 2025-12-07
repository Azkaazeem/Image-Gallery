import supabase from "./config.js";

//  pasword toggle button for both sign up and login page 

const passwordInput = document.getElementById("password");
const toggleIcon = document.querySelector(".toggle-password");

if (passwordInput && toggleIcon) {
  toggleIcon.addEventListener("click", () => {
    // Check current type
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    // Icon Icon Change Logic
    if (type === "text") {
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  });
}

//    Sign up page functionality

let sUName = document.getElementById("name");
let sEmail = document.getElementById("email");
let sPass = document.getElementById("password");
let sPhn = document.getElementById("ph-no.");
let sBtn = document.querySelector(".btn-signup");

//  SIGN UP FUNCTIONALITY
async function signUp(e) {
  e.preventDefault();

  if (!sUName.value.trim() ||
    !sEmail.value.trim() ||
    !sPass.value.trim() ||
    !sPhn.value.trim()) {
    Swal.fire({
      title: "All fields required!",
      text: "Please fill all fields before signup.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    })

    return
  };

  if (sPhn.value.length !== 11) {
    Swal.fire({
      title: "Incorrect Phone Number!",
      text: "Phone number must be exactly 11 digits.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "Try Again",
      customClass: {
        popup: "glass-alert"
      }

    }).then(() => {
      sPhn.value = "";
    })
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email: sEmail.value,
        password: sPass.value,
        options: {
          data: {
            user_name: sUName.value,
            phone_no: sPhn.value,
          }
        }
      })

    if (error) {
      console.log(error);
      Swal.fire({
        title: "Signup Failed!",
        text: error.message,
        icon: "error",
        draggable: true,
        background: "#f9fbfc",
        color: "#45a049",
        confirmButtonColor: "#45a049",
        confirmButtonText: "OK",
        padding: "20px",
        borderRadius: "15px",
        customClass: {
          popup: "glass-alert"
        }
      }).then(() => {
        sUName.value = "";
        sEmail.value = "";
        sPass.value = "";
        sPhn.value = "";

      })
      return;
    }

    // --- STEP 2: Admin Table ('profiles') mein data bhejo ---
    // (Ye Naya Code Hai Jo Zaroori Hai)
    const { error: dbError } = await supabase
      .from('Users') // Table ka naam
      .insert({
        username: sUName.value,
        email: sEmail.value,
        phone: sPhn.value
        // Password save nahi kar rahy (Safe practice)
      });

    if (dbError) {
      console.log("Database Error:", dbError);
      // Agar table mn error aye to bhi user ko batao, lkn account ban chuka hota ha usually
      Swal.fire({
        title: "Database Error!",
        text: dbError.message,
        icon: "error",
        color: "#45a049",
        confirmButtonColor: "#45a049",
        confirmButtonText: "OK",
        padding: "20px",
        borderRadius: "15px",
      });

    } else {
      Swal.fire({
        title: "Signup successfully!",
        text: "Welcome to Ticket Manager",
        icon: "success",
        draggable: true,
        background: "#f9fbfc",
        color: "#45a049",
        confirmButtonColor: "#45a049",
        confirmButtonText: "Go to Home",
        padding: "20px",
        borderRadius: "15px",
        customClass: {
          popup: "glass-alert"
        }

      })
        .then(() => {
          location.href = "home.html"
        })
    }
  } catch (err) {
    console.log(err)
    Swal.fire({
      title: "System error!",
      html: `Something went wrong internally! <br></br> <b>${err.message || "Unknown error"}</b>`,
      icon: "error",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "Report issue",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      sUName.value = "";
      sEmail.value = "";
      sPass.value = "";
      sPhn.value = "";

    })
  }
}
sBtn && sBtn.addEventListener("click", signUp);

// Login page functionality

let lEmail = document.getElementById("email");
let lPass = document.getElementById("password");
let lBtn = document.querySelector(".btn-primary");

async function login(e) {
  e.preventDefault();
  let email = lEmail.value.trim();
  let pass = lPass.value.trim();
  if (!email) {
    Swal.fire({
      title: "Please enter your email address.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    });
    return;
  }
  if (!email.includes("@") || !email.includes("gmail.com")) {
    Swal.fire({
      title: "Please enter a valid Gmail address.",
      text: "Example: yourname@gmail.com",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      lEmail.value = "";
      lPass.value = "";
    })
    return;
  }
  if (!pass) {
    Swal.fire({
      title: "Password field is empty.",
      text: "Please enter your password.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    });
    return;
  }
  if (pass.length < 6) {
    Swal.fire({
      title: "Invalid password!",
      text: "Password must be at least 6 characters long.",
      icon: "warning",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "OK",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      lPass.value = "";
    })
    return;
  }
  if (email === "admin@gmail.com" && pass === "admin12345") {
    Swal.fire({
      title: "Admin logged in Successfully!",
      icon: "success",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "Go to Admin portal..",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      location.href = "/crud/admin.html";
    });
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass
    });
    if (error) {
      console.log("Supabase Error: ", error);
      if (error.message.includes("Invalid login credentials")) {
        Swal.fire({
          title: "Login failed!",
          text: "Incorrect Email or Password. Please try again.",
          icon: "error",
          background: "#f9fbfc",
          color: "#45a049",
          confirmButtonColor: "#45a049",
          confirmButtonText: "Try Again!",
          padding: "20px",
          customClass: {
            popup: "glass-alert"
          }
        }).then(() => {
          lEmail.value = "";
          lPass.value = "";
        })
      }
      else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          background: "#f9fbfc",
          color: "#45a049",
          confirmButtonColor: "#45a049",
          confirmButtonText: "Try Again!",
          padding: "20px",
          customClass: {
            popup: "glass-alert"
          }
        }).then(() => {
          lEmail.value = "";
          lPass.value = "";
        })
      }
      return;
    }
    Swal.fire({
      title: "Successfully logged in!",
      icon: "success",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "Go to Home",
      padding: "20px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      location.href = "home.html";
    });

  } catch (err) {
    console.log(err);
    Swal.fire({
      title: "System error!",
      html: `Something went wrong internally!<br></br> <b> ${(err.message) || "Unknown error"}</b>`,
      icon: "error",
      background: "#f9fbfc",
      color: "#45a049",
      confirmButtonColor: "#45a049",
      confirmButtonText: "Report issue",
      padding: "20px",
      borderRadius: "15px",
      customClass: {
        popup: "glass-alert"
      }
    }).then(() => {
      lEmail.value = "";
      lPass.value = "";
    })
  }
}

lBtn && lBtn.addEventListener("click", login);

//Logout functionality

let logoutBtn = document.getElementById("logout-btn")
console.log(logoutBtn);
async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      Swal.fire({
        title: "Successfully logged out!",
        icon: "success",
        background: "#f9fbfc",
        color: "#45a049",
        confirmButtonColor: "#45a049",
        confirmButtonText: "Go to Login page",
        padding: "20px",
      }).then(() => {
        location.href = "/Authentication/login.html";
      });
    }
  } catch (err) {
    console.log(err)
  }
}
logoutBtn && logoutBtn.addEventListener("click", logout)               

// MOOD CHANGER

// MODE TOGGLE BUTTON
const modeBtn = document.querySelector(".mode-toggle");
const modeIcon = document.getElementById("modeIcon");

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // icon change
    if (document.body.classList.contains("dark-mode")) {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");
    } else {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");
    }
});
