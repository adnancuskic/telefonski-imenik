"use strict";
var defaultPic = "assets/images/profilepic.jpg";

var priljubljen = "normal";

function steviloVseh() {
  document.getElementById(
    "steviloKontaktov"
  ).innerHTML = `Število kontaktov: ${localStorage.steviloKontaktov}`;
}

function addToDom(participant) {
  if (participant.priljubljen == true) {
    priljubljen = "fav";
  } else {
    priljubljen = "normal";
  }
  document.querySelector(".content .containerContact .kontakt").innerHTML += `
  <div class="kartica ${priljubljen}" data-id="${participant.id}">
            <div class="col-12">
              <img class="slikaKontakt" src="${participant.slika}">
            </div>
            <div class="col-12">
              <p>
                <span class="ime">${participant.ime} ${participant.priimek} <br> <span class="stevilka">${participant.stevilka}<span> </span>
              </p>
            </div>
            <div class="col-12 gumbiNaKontaktih">
              <div class="col-4 poravnava call" onClick='klicanje("${participant.ime}","${participant.priimek}")'>
                <img src="assets/images/phone-call.png">
              </div>
              <div class="col-4 poravnava edit" onClick="editData(${participant.id})">
                <img src="assets/images/edit.png">
              </div>
              <div class="col-4 poravnava delete" onClick="domRemoveParticipant(${participant.id})">
                <img src="assets/images/cancel.png">
              </div>
            </div>
          </div>
          `;
  steviloVseh();
}
function klicanje(ime, priimek) {
  alert("KLIČEM " + ime + " " + priimek);
}

function showAll() {
  refresh();
}
function isci() {
  // var b = document.getElementById("iskanje").value;

  var a = document.querySelectorAll(".kontakt .kartica");
  // console.log(a);

  var input = document.getElementById("iskanje");
  var filter = input.value.toUpperCase();

  for (var i = 0; i < a.length; i++) {
    console.log("hehe");
    var c = a[i].getElementsByTagName("span")[0];
    var txtValue = c.textContent || c.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function filtiraj() {
  var a = document.querySelectorAll(".kontakt .kartica.normal");
  Array.prototype.forEach.call(a, function (node) {
    node.parentNode.removeChild(node);
  });
  // console.log("hehe");
  // var currentParticipants = JSON.parse(localStorage.getItem("participants"));
  // var priljubljeniSamo = [];
  // var priljubljeniVsi = currentParticipants.filter(
  //   (participant) => participant.priljubljen == true
  // )[0];
  // priljubljeniSamo.push(priljubljeniVsi);
  // console.log(priljubljeniSamo);
  // localStorage.setItem("priljubljeni", JSON.stringify(priljubljeniSamo));
  //refresh();
}

function domRemoveParticipant(dataId) {
  if (confirm("Ali zelite zbrisati ta element?")) {
    $(".kartica").filter(`[data-id="${dataId}"]`).remove();
    removeFromStorage(dataId);
    console.log(dataId);
  }
}
function refresh() {
  location.reload();
}
function updateData() {
  var ime = document.querySelector("#ime").value;
  var priimek = document.querySelector("#priimek").value;
  var stevilka = document.querySelector("#stevilka").value;

  if (/^([a-z]){0,}$/.test(stevilka) == true) {
    alert("Vnesi validno številko - uporabni samo številke!");
  } else {
    if (ime == "" || priimek == "" || stevilka == "") {
      alert("Izpolni vsa polja z zvezdico");
    } else {
      var tex = document.getElementById("skriti").value;
      var currentParticipants = JSON.parse(
        localStorage.getItem("participants")
      );
      var newP = currentParticipants.filter(
        (participant) => participant.id == tex
      )[0];

      var slikaL = document.getElementById("izberiSliko").getAttribute("src");
      var imeL = document.getElementById("ime").value;
      var priimekL = document.getElementById("priimek").value;
      var stevilkaL = document.getElementById("stevilka").value;
    }
  }
}

function editData(id) {
  document.getElementById("dodaj").style.display = "none";
  document.getElementById("shrani").style.display = "block";
  var currentParticipants = JSON.parse(localStorage.getItem("participants"));
  var newP = currentParticipants.filter(
    (participant) => participant.id == id
  )[0];
  //console.log(newP["ime"]);

  var slikaL = document.getElementById("izberiSliko");
  var imeL = document.getElementById("ime");
  var priimekL = document.getElementById("priimek");
  var stevilkaL = document.getElementById("stevilka");
  var priljubljenostL = document.getElementById("favorite");
  var skrit = document.getElementById("skriti");

  slikaL.setAttribute("src", newP["slika"]);
  imeL.value = newP["ime"];
  priimekL.value = newP["priimek"];
  stevilkaL.value = newP["stevilka"];
  priljubljenostL.value = newP["favorite"];
  skrit.value = newP["id"];

  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  document.querySelector(".modal-header h2").innerHTML = "Shrani kontakt";

  //$(".kartica").filter(`[data-id="${dataId}"]`).remove();
  //removeFromStorage(dataId);
}

function removeFromStorage(id) {
  localStorage.steviloKontaktov = Number(localStorage.steviloKontaktov) - 1;
  var currentParticipants = JSON.parse(localStorage.getItem("participants"));
  var newP = currentParticipants.filter((participant) => participant.id != id);
  localStorage.setItem(`participants`, JSON.stringify(newP));
  steviloVseh();
}

function domAddParticipant(participant) {
  localStorage.setItem("linkec", defaultPic);

  addToDom(participant);

  if (localStorage.getItem("participants") === null) {
    console.log(JSON.stringify([participant]));
    localStorage.setItem("participants", JSON.stringify([participant]));
  } else {
    var currentParticipants = JSON.parse(localStorage.getItem("participants"));
    //console.log(currentParticipants);
    currentParticipants.push(participant);
    localStorage.setItem(`participants`, JSON.stringify(currentParticipants));
  }
  //console.log(JSON.stringify(participant));
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
  //linkec = defaultPic;
  //console.log(ime, priimek, stevilka, priljubljen, slika);
  if (/^([a-z]){0,}$/.test(stevilka) == true) {
    alert("Vnesi validno številko - uporabni samo številke!");
  } else {
    if (ime == "" || priimek == "") {
      alert("Izpolni vsa polja z zvezdico");
    } else {
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
        slika: localStorage.linkec,
        id: localStorage.steviloKontaktov,
      };
      localStorage.steviloKontaktov = Number(localStorage.steviloKontaktov) + 1;

      // Add participant to the HTML
      domAddParticipant(participant);

      // Move cursor to the first name input field
      document.getElementById("ime").focus();
      document.getElementById("izberiSliko").setAttribute("src", defaultPic);
    }
  }
}

// $(() => {
//   $(".gumbiNaKontaktih .delete").click(function () {
//     console.log("test");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // This function is run after the page contents have been loaded
  // Put your initialization code here
  var span = document.getElementById("ura");

  function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    span.textContent =
      ("0" + h).substr(-2) +
      ":" +
      ("0" + m).substr(-2) +
      ":" +
      ("0" + s).substr(-2);
  }

  setInterval(time, 1000);

  localStorage.setItem("linkec", defaultPic);

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
  document.getElementById("dodaj").value = "Dodaj nov kontakt";
  document.querySelector(".modal-header h2").innerHTML = "Dodaj nov kontakt";
  document.getElementById("ime").setValue = "";

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    document.getElementById("shrani").style.display = "none";
    document.getElementById("dodaj").style.display = "block";
    document.getElementById("izberiSliko").setAttribute("src", defaultPic);
    document.getElementById("priimek").value = "";
    document.getElementById("stevilka").value = "";
    document.querySelector(".modal-header h2").innerHTML =
      "Ustvari nov kontakt";
    document.getElementById("ime").value = "";

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
