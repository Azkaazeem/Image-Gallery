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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
        color: "rgb(132, 0, 255)",
        confirmButtonColor: "rgb(132, 0, 255)",
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
        color: "rgb(132, 0, 255)",
        confirmButtonColor: "rgb(132, 0, 255)",
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
        color: "rgb(132, 0, 255)",
        confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
          color: "rgb(132, 0, 255)",
          confirmButtonColor: "rgb(132, 0, 255)",
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
          color: "rgb(132, 0, 255)",
          confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
      color: "rgb(132, 0, 255)",
      confirmButtonColor: "rgb(132, 0, 255)",
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
        color: "rgb(132, 0, 255)",
        confirmButtonColor: "rgb(132, 0, 255)",
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

























/* =============================================     HOME FUNCTIONALITY     ============================================= */

const fileInput = document.getElementById("fileUpload");
const uploadBtn = document.querySelector(".upload-btn");
const gallery = document.getElementById('cardsContainer');

  //    A:   UPLOAD FILE

async function UploadFile() {
    const file = fileInput.files[0];

    if (!file) {
        return Swal.fire("Required", "Please select a file first.", "warning");
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return Swal.fire("Access Denied", "Please Login to upload File.", "error"); 
        location.href = "login.html";
    }

    Swal.fire({
        title: 'Uploading...',
        text: 'Saving your File to the gallery.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    const fileName = `${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("Images")
        .upload(fileName, file);

    if (uploadData) {

        const { data: pubData } = supabase.storage.from("Images").getPublicUrl(fileName);
        const finalUrl = pubData.publicUrl;

        const { error: dbErr } = await supabase.from("userImages").insert({
            image_url: finalUrl,
            image_name: file.name,
            user_id: user.id
        });

        if (dbErr) {
            Swal.fire("Database Error", dbErr.message, "error");
        } else {
            Swal.fire("Success!", "File has been added to your gallery.", "success");
            fileInput.value = "";
            fetchGallery();
        }
    } else {
        Swal.fire("Upload Failed", uploadErr.message, "error");
    }
}


  // B: FETCH FILE

// async function fetchGallery() {
//     gallery.innerHTML = "";
    
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data, error } = await supabase
//         .from('userImages')
//         .select('*')
//         .eq('user_id', user.id); 

//     if (data && data.length > 0) {
//         data.forEach(item => {
//             gallery.innerHTML += `
//             <div class="img-card" style="display:inline-block; margin:10px; border:1px solid #ddd; padding:10px; border-radius:8px; background:#fff;">
//                 <img src="${item.image_url}" alt="${item.image_url}" width="200" style="border-radius:4px; display:block;">
//                 <div style="margin-top:10px; text-align:center;">
//                     <button class="btn btn-info btn-sm" onclick="startEdit(${item.id}, '${item.image_url}')">Edit</button>
//                     <button class="btn btn-danger btn-sm" onclick="deleteImage(${item.id}, '${item.image_url}')">Delete</button>
//                 </div>
//             </div>`;
//         });
//     } else {
//         gallery.innerHTML = "<p>No File found in your gallery.</p>";
//     }
// }

async function fetchGallery() {
    const gallery = document.getElementById('cardsContainer');
    
    gallery.innerHTML = "";
    
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (!user || userErr) {
        console.log("User not logged in");
        return;                                                    
    }

    const { data, error } = await supabase
        .from('userImages')
        .select('*')
        .eq('user_id', user.id); 

    if (error) {
        console.error("Fetch error:", error.message);
        gallery.innerHTML = `<p style="color:white;">Error loading gallery: ${error.message}</p>`;
        return;
    }

    if (data && data.length > 0) {
        data.forEach(item => {
            gallery.innerHTML += `
            <div class="img-card">
                <img src="${item.image_url}" alt="${item.image_name || 'Gallery Image'}">
                <div style="margin-top:10px; text-align:center;">
                    <button class="btn btn-info btn-sm" onclick="startEdit(${item.id}, '${item.image_url}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteImage(${item.id}, '${item.image_url}')">Delete</button>
                </div>
            </div>`;
        });
    } else {
        gallery.innerHTML = "<p style='color:white; text-align:center; grid-column: 1/-1;'>Your gallery is empty. Upload your first image!</p>";
    }
}

if (uploadBtn) {
    uploadBtn.addEventListener("click", UploadFile);
}

window.onload = fetchGallery;


  // C: DELETE FILE

const editFileInput = document.getElementById('editFileInput');
let currentEditId = null;
let currentOldUrl = null;

window.deleteImage = async (id, imageUrl) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the image.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        try {
            const fileName = imageUrl.split('/').pop(); 
            await supabase.storage.from('Images').remove([fileName]);

            const { error } = await supabase.from('userImages').delete().eq('id', id);

            if (error) throw error;

            Swal.fire('Deleted!', 'The image has been removed successfully.', 'success');
            fetchGallery();
        } catch (err) {
            Swal.fire('Error', 'Failed to delete image: ' + err.message, 'error');
        }
    }
};


// D: EDIT FILE

window.startEdit = (id, url) => {
    currentEditId = id;
    currentOldUrl = url;
    editFileInput.click();
};
editFileInput.addEventListener('change', async () => {
    const newFile = editFileInput.files[0];
    if (!newFile) return;

    Swal.fire({ title: 'Updating...', didOpen: () => Swal.showLoading() });

    try {
        const fileName = `${Date.now()}_${newFile.name}`;
        
        const { data: upData, error: upErr } = await supabase.storage
            .from('Images')
            .upload(fileName, newFile);

        if (upErr) throw upErr;

        const { data: { publicUrl } } = supabase.storage.from('Images').getPublicUrl(fileName);

        const { error: dbErr } = await supabase.from('userImages')
            .update({ image_url: publicUrl, image_name: newFile.name })
            .eq('id', currentEditId);

        if (dbErr) throw dbErr;

        Swal.fire('Updated!', 'Image has been replaced successfully.', 'success');
        fetchGallery();
    } catch (err) {
        Swal.fire('Update Failed', err.message, 'error');
    }
});