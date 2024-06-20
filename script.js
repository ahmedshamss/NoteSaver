// Catching elements from HTML
let userInput = document.getElementById("userInput")
let addBtn = document.getElementById("addBtn")
let newForm = document.getElementById("newForm")
let scrollBtn = document.getElementById("scrollBtn")
let counter = document.getElementById("counter")
// Function to auto focus on the input
window.onload = _ => {
    userInput.focus()
}
// Checking if there's elements stored in localstorage
let inputArr;
let filterArr = new Set();
if(localStorage.data != null){
    inputArr = JSON.parse(localStorage.data)
    inputArr.forEach(element => {
        filterArr.add(element)
    });
    showdata()
}else {
     inputArr = [];
     filterArr.clear()
}
// Function to show counter
userInput.addEventListener("keyup", function() {
    counter.innerHTML = `${userInput.value.length}`
    if (userInput.value.length > 50){
        counter.style.cssText = "color: red;"
    }else {
        counter.style.cssText = "color: green;"
    }
  });
// Function to trigger click button when click on enter
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
// Function to add user inputs to inputArr
addBtn.addEventListener("click", function(){
    if (userInput.value != ""  && userInput.value.length <= 50) {
        filterArr.add(userInput.value)
        inputArr = [...filterArr]
        localStorage.setItem("data", JSON.stringify(inputArr))
        createTask()
        userInput.value = '';
        counter.innerHTML = "0"
    }
})
// Function to create task
function createTask(){
    let collector = ''
    if(inputArr.length != 0){
        for(let i = 0; i < inputArr.length; i++){
            collector += `Note [${i+1}]<div class="addedtask"> - ${inputArr[i]}<button onclick="deleteTask(${i})">Delete</button></div>`
            newForm.className = "newform"
        }
    }else {
        newForm.removeAttribute("class")
    }
    newForm.innerHTML = collector
}
// Function to show data
function showdata(){
    for(let i = 0; i <= inputArr.length; i++){
        createTask(inputArr[i])
    }
}
// Function to delete data
function deleteTask(i){
    inputArr.splice(i,1)
    filterArr.clear()
    inputArr.forEach(element => {
        filterArr.add(element)
    });
    localStorage.data = JSON.stringify(inputArr)
    showdata()
}
window.onscroll = _ => {
    if (scrollY >= "200"){
        scrollBtn.style.cssText = "display: block"
    } else {
        scrollBtn.style.cssText = "display: none"
    }

    scrollBtn.onclick = _ => {
        scrollTo({
            top:0,
            behavior: "smooth"
        })
    }
}