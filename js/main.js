import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "../validate";

const petForm = document.getElementById("pet-form");

petForm.addEventListener("submit", fetchAnimals);

// Fetch Animals from api
function fetchAnimals(e) {
  // Get User Input
  const animal = document.getElementById("animal").value;
  const zip = document.getElementById("zip").value;

  // Validate Zip
  if (!isValidZip(zip)) {
    showAlert("Please Enter A Valid Zipcode", "danger");
  } else {
    const results = document.getElementById("results");
    results.innerHTML = "<h1>Loading Please Wait...</h1>";
  }

  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=7bec9c7514d4e1627003a8d320ba4286&animal=${animal}&location=${zip}&callback=pol`,
    {
      jsonpCallbackFunction: "pol",
    }
  )
    .then((res) => res.json())
    .then((data) => showAnimals(data.petfinder.pets.pet))
    .catch((err) => console.log(err));

  e.preventDefault();
}

// show listing of Pets
function showAnimals(pets) {
  console.log(pets);
  const results = document.getElementById("results");
  results.innerHTML = "";

  // LoopsThrough Pets
  pets.forEach((pet) => {
    const email = pet.contact.email.$t
      ? pet.contact.email.$t
      : `<span class="text-danger">No available</span>`;
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
    <div class="row">
    <div class="col-sm-6">
      <h4>${pet.name.$t} (${pet.age.$t})</h4>
      <p class="text-secondary">${pet.breeds.breed.$t}</p>
      <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
      <ul class="list-group">
        <li class="list-group-item">Phone : ${pet.contact.phone.$t}</li>
        <li class="list-group-item">Email : ${email}</li>
        <li class="list-group-item">ID : ${pet.id.$t}</li>
      </ul>
    </div>
    <div class="col-sm-6 text-center">
    <img class="img-fluid rounded-circle mt-2" src="${pet.media.photos.photo[3].$t}"></img>
    </div>
  </div>
    `;
    results.appendChild(div);
  });
}
