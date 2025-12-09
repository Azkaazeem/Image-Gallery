import supabase from "./config.js";

/* =======================================     PASSWORD TOGGLE BUTTON FUNCTIONALITY     ======================================= */

const passwordInput = document.getElementById("password");
const toggleIcon = document.querySelector(".toggle-password");

if (passwordInput && toggleIcon) {
  toggleIcon.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    if (type === "text") {
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  });
}












/* =============================================     SIGNUP PAGE FUNCTIONALITY     ============================================= */

let sUName = document.getElementById("name");
let sEmail = document.getElementById("email");
let sPass = document.getElementById("password");
let sPhn = document.getElementById("ph-no.");
let sBtn = document.querySelector(".btn-signup");

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

    const { error: dbError } = await supabase
      .from('Users')
      .insert({
        username: sUName.value,
        email: sEmail.value,
        phone: sPhn.value
      });

    if (dbError) {
      console.log("Database Error:", dbError);
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
        text: "Welcome to Image Gallery",
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













/* =============================================     LOGIN PAGE FUNCTIONALITY     ============================================= */

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












/* =============================================     LOGOUT PAGE FUNCTIONALITY     ============================================= */

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
        location.href = "login.html";
      });
    }
  } catch (err) {
    console.log(err)
  }
}
logoutBtn && logoutBtn.addEventListener("click", logout)












/* =============================================     MOOD TOGGLE FUNCTIONALITY     ============================================= */

const modeBtn = document.querySelector(".mode-toggle");
const modeIcon = document.getElementById("modeIcon");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }
});












/* =============================================      HOME PAGE FUNCTIONALITY      ============================================= */

/* 
<div class="img-preview" id="imgPreview"> 
  <img id="previewImg" src="" alt="Preview Image">
  <div class="actions">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </div>
</div>
*/

  let UploadFile = document.getElementById("fileUpload");
  let UploadBtn = document.querySelector(".upload-btn");
  let imgContainer = document.getElementById("imgPreview");

  let PublicD;
  let imgUrl;
  let upImgUrl;

async function uploadF(event) {

  console.log("BUTTON IS CLICKED!!");

    const fileName = UploadFile.files[0].name;
    const file = UploadFile.files[0];
    console.log(UploadFile.files[0]?.name);


  // ------------------------    UPLOAD IMAGE IN STORAGE    ------------------------

  const { data, error } = await supabase
    .storage
    .from("Images")
    .upload(fileName, file);

  // --------------------    GET PUBLIC URL IF DATA UPLOADED    --------------------

  if (data) {
    var FData = data.fullPath.split('/');
    console.log(FData[1]);
    PublicD = FData[1];
    console.log(PublicD);

    const { data: myData } = supabase.storage
      .from("Images")
      .getPublicUrl(PublicD);

    console.log(myData.PublicD);

    if (myData) {
      imgUrl = myData.PublicD;
      const { error } = await supabase
        .from("userPics")
        .insert({ image: imageUrl });
    }

    if (error) {
      console.log(error);
    } else {
      alert("picture uplaoded suc");
    }
  } else {
    console.log(error);
  }

}


UploadBtn && UploadBtn.addEventListener("click", uploadF);




