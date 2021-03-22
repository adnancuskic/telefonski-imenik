"use strict";

var defaultPic = "assets/images/profilepic.jpg";

var priljubljen = "";

function steviloVseh() {
  document.getElementById(
    "steviloKontaktov"
  ).innerHTML = `Število kontaktov: ${localStorage.steviloKontaktov}`;
}

function addToDom(participant) {
  if (participant.priljubljen == true) {
    priljubljen = "fav";
  } else {
    priljubljen = "";
  }
  document.querySelector(".content .containerContact .kontakt").innerHTML += `
  <div class="kartica ${priljubljen}" data-id="${participant.id}">
            <div class="col-12">
              <img class="slikaKontakt" src="${localStorage.getItem("linkec")}">
            </div>
            <div class="col-12">
              <p>
                <span class="ime">${participant.ime}</span>
                <span class="priimek">${participant.priimek}</span>
              </p>
            </div>
            <div class="col-12">
              <p class="fonska">${participant.stevilka}</p>
            </div>
            <div class="col-12 gumbiNaKontaktih">
              <div class="col-4 poravnava call" onClick='klicanje("${
                participant.ime
              }","${participant.priimek}")'>
                <img src="assets/images/phone-call.png">
              </div>
              <div class="col-4 poravnava edit">
                <img src="assets/images/edit.png">
              </div>
              <div class="col-4 poravnava delete" onClick="domRemoveParticipant(${
                participant.id
              })">
                <img src="assets/images/cancel.png">
              </div>
            </div>
          </div>
          `;
  localStorage.setItem("linkec", defaultPic);
  steviloVseh();
}
function klicanje(ime, priimek) {
  alert("KLIČEM " + ime + " " + priimek);
}

function domRemoveParticipant(dataId) {
  if (confirm("Ali zelite zbrisati ta element?")) {
    $(".kartica").filter(`[data-id="${dataId}"]`).remove();
    removeFromStorage(dataId);
    console.log(dataId);
  }
}

function removeFromStorage(id) {
  localStorage.steviloKontaktov = Number(localStorage.steviloKontaktov) - 1;
  var currentParticipants = JSON.parse(localStorage.getItem("participants"));
  var newP = currentParticipants.filter((participant) => participant.id != id);
  localStorage.setItem(`participants`, JSON.stringify(newP));
  steviloVseh();
}

function domAddParticipant(participant) {
  addToDom(participant);

  if (localStorage.getItem("participants") === null) {
    console.log(JSON.stringify([participant]));
    localStorage.setItem("participants", JSON.stringify([participant]));
  } else {
    var currentParticipants = JSON.parse(localStorage.getItem("participants"));
    console.log(currentParticipants);
    currentParticipants.push(participant);
    localStorage.setItem(`participants`, JSON.stringify(currentParticipants));
  }
  console.log(JSON.stringify(participant));
}
$(() => {
  $("#izberiSliko").click(function () {
    $("#file-input").click();
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#izberiSliko").attr("src", e.target.result);
        localStorage.setItem("linkec", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#file-input").change(function () {
    readURL(this);
  });
});

function addParticipant(event) {
  // TODO: Get values
  const ime = document.querySelector("#ime").value;
  const priimek = document.querySelector("#priimek").value;
  const stevilka = document.querySelector("#stevilka").value;
  const priljubljen = document.querySelector("#favorite").checked;

  //console.log(ime, priimek, stevilka, priljubljen, slika);

  // TODO: Set input fields to empty values
  document.querySelector("#ime").value = "";
  document.querySelector("#priimek").value = "";
  document.querySelector("#stevilka").value = "";
  document.querySelector("#favorite").checked = false;

  // Create participant object
  const participant = {
    ime: ime,
    priimek: priimek,
    stevilka: stevilka,
    priljubljen: priljubljen,
    id: localStorage.steviloKontaktov,
  };
  localStorage.steviloKontaktov = Number(localStorage.steviloKontaktov) + 1;

  // Add participant to the HTML
  domAddParticipant(participant);
  $("#izberiSliko").attr("src", defaultPic);

  // Move cursor to the first name input field
  document.getElementById("ime").focus();
}

// $(() => {
//   $(".gumbiNaKontaktih .delete").click(function () {
//     console.log("test");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // This function is run after the page contents have been loaded
  // Put your initialization code here

  steviloVseh();
  if (!localStorage.steviloKontaktov) {
    localStorage.steviloKontaktov = 0;
  }
  document.getElementById("dodaj").onclick = addParticipant;
  readFromStorage();
});

function readFromStorage() {
  steviloVseh();
  var currentParticipants = [];

  if (localStorage.getItem("participants") !== null) {
    currentParticipants = JSON.parse(localStorage.getItem("participants"));
    for (var i = 0; i < currentParticipants.length; i++) {
      addToDom(currentParticipants[i]);
    }
  }
}

window.onload = function () {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};
