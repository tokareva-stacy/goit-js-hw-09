const formData = {
  email: "",
  message: "",
};

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || ""; 
      formData.message = parsedData.message || "";

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

loadFromLocalStorage();

form.addEventListener("input", (event) => {
  if (event.target.name === "email" || event.target.name === "message") {
    formData[event.target.name] = event.target.value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields"); 
    return; 
  }

  console.log(formData); 

  localStorage.removeItem(STORAGE_KEY);

  formData.email = "";
  formData.message = "";

  form.reset(); 
});