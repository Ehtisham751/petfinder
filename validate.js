// Validate ZipCode
export function isValidZip(zip) {
  return /^\d{5}(-\d(4))?$/.test(zip);
}

// Display Alert Message
export function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  // ADD text
  div.appendChild(document.createTextNode(message));
  // Get container
  const container = document.querySelector(".container");
  const Form = document.querySelector("#pet-form");
  // Insert the alert
  container.insertBefore(div, Form);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
