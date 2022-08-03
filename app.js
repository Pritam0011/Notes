window.addEventListener("load", () => {
  show();
});
let an = document.getElementById("an");
let tn = document.getElementById("tn");
tn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fun();
  }
});
an.addEventListener("click", fun);
function fun() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.push(tn.value);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  tn.value = "";
  show();
}

let show = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
        <div class="card cardcc row my-2 mx-2" style="width: 18rem">
        <div class="card-body justify-content-center">
          <h5 class="card-title">${"Note -" + (index + 1)}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-outline-danger" id='${index}' onclick='delnot(this.id)'>DELETE</button>
        </div>
        </div>
        `;
  });

  let noteEle = document.getElementById("notess");
  if (noteObj.length != 0) {
    noteEle.innerHTML = html;
  } else {
    // noteEle.innerHTML = `<h3>Nothing to show</h3>`;
  }
};
function delnot(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let c = confirm("Sure?");
  if (c == true) {
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    show();
    window.location.reload();
  }
}

let search = document.getElementById("seTxt");
search.addEventListener("input", function () {
  let val = search.value.toLowerCase();
  let card = document.getElementsByClassName("cardcc");
  Array.from(card).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
