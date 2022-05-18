//This function below helps retrieve the needed API
fetch("https://api.hatchways.io/assessment/students").then((data) => {
    //console.log(data);
    return data.json();
}).then((completedata) => {
    let data1 = " ";
    completedata.students.map((values) => {
        //This code below helps display the average grades in a percentage
let numGrades = values.grades.map(Number);

    let avg = ((numGrades.reduce((previousValue,currentValue)=>(previousValue+currentValue)))/values.grades.length).toFixed(2);
        data1 += `<div class="card">
    <img src=${values.pic} id="" alt="API Image"/>
    <div class="sectional">
  <p id="" class="name list-item">
    ${values.firstName} ${values.lastName}
    </p>
    <p class="list-item">Email: ${values.email}</p>
    <p class="list-item">Company: ${values.company} </p>
    <p class="list-item">Skill: ${values.skill} </p>
    <p>Average:${avg}% </p>
   
   <span onClick="show_hide()" class="material-symbols-outlined">
add
</span>
    
    <ul id="show">
    <li>Test 1: ${values.grades[0]}</li>
    <li> Test 2: ${values.grades[1]} </li>
    <li> Test 3: ${values.grades[2]} </li>
    <li> Test 4: ${values.grades[3]} </li>
    <li> Test 5: ${values.grades[4]} </li>
    <li> Test 6: ${values.grades[5]} </li>
    <li> Test 7: ${values.grades[6]} </li>
    <li> Test 8: ${values.grades[7]} </li>
    </ul>
<section class="container">
  <section class="inner">
    <div class="tags-container"></div>
    <div class="tag-field js-tags">
      <input class="js-tag-input" placeholder="Add a tag">
    </div>
  </section>
</section>
<hr/>
 
  </div>`;
    });
    document.getElementById("root").innerHTML += data1;
    tagFunctionality()
}).catch((err) => {
    console.log(err);
})


//onClick Function
var a;
function show_hide() {
    if (a == 1) {
        document.getElementById("show").style.display = "inline";
        return a = 0;
    } else {
        document.getElementById("show").style.display = "none";
        return a = 1;
    }
}

//Search Function
document.querySelector("#search-input").addEventListener("input", filterList);

function filterList() {
    const searchInput = document.querySelector("#search-input");
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-item");

    listItems.forEach((item) => {
        let text = item.textContent;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = " ";
        } else {
            item.style.display = "none";
        }
    });

}

//Tag Function
function tagFunctionality() {
    let allTagInputs = document.querySelectorAll(".js-tag-input");
    allTagInputs.forEach((input) => {
        input.addEventListener("keyup", (event) => {
            // when enter is pressed
            if (event.keyCode === 13) {
                let inputValue = input.value;
                let tagsContainer = input.parentElement.previousElementSibling;
                tagsContainer.innerHTML += `
                <span class="tag">${inputValue} <span class="tagCloseIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg></span></span>
                `;
                updateTagRemoveFunctionality();
                input.value = "";
            }
        })
    })
}

function updateTagRemoveFunctionality() {
    let allCloseIcons = document.querySelectorAll(".tagCloseIcon");
    allCloseIcons.forEach((icon)=>{
        icon.addEventListener("click",()=>{
            icon.parentElement.remove();
        })
    })
}