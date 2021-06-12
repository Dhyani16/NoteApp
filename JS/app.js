console.log("welcome to the notes taking app");
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle=document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes); //if we are getting some notes from the local storage then we convert them into an array using JSON.parse
  }
  let myObj={
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj); // here we are adding the entered text via the addTxt.value tp the notes. When someone clicks the addBtn wala button this event is triggered
  //notesObj is now an array of objects 
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});
//function to show the elements from the local storage 
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //notesObj = []; (its upto us, we can comment this notesobj out or keep it as it is uncommented.)
  } 
  else {
    notesObj = JSON.parse(notes); //if we are getting some notes from the local storage then we convert them into an array using JSON.parse
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html = html + ` <div class="my-2 mx-2 card noteCard" style="width: 16rem;">
                <div class="card-body">
                    <h5 class="card-title"><b>${element.title}</b></h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" class="deleteButton">Delete note</button>  
                </div>
            </div>
        `;
  });
  //through this.id the id of the note/element which we want to delete is passed to the onclick function
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  }
  else{
    noteElm.innerHTML = `Nothing to show`
  }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
    //notesObj = [];
    } 
    else {
    notesObj = JSON.parse(notes); //if we are getting some notes from the local storage then we convert them into an array using JSON.parse
    }
    notesObj.splice(index,1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()
}

searchTxt=document.getElementById("searchTxt");
searchTxt.addEventListener("input",function(){
    let inputval=searchTxt.value.toLowerCase();
    let noteCard=document.getElementsByClassName("noteCard")
    Array.from(noteCard).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        //console.log(cardtxt)
        if(cardtxt.includes(inputval)){
            element.style.display="block"
        }
        else{
            element.style.display="none"
        }
    })
    
})

