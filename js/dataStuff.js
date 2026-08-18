 
 async function loadTitleHeader(){

    let elContainer = document.querySelector("#title-head");
  
    elContainer.textContent = 'CART 351 FALL 2026';
}

 async function loadNav(){

    let elContainer = document.querySelector("#cart351Nav");
    let response = await fetch('/nav.html')
    let htmlNav = await response.text();
    elContainer.innerHTML =htmlNav;
}

function loadTitle(){
let title = document.querySelector("title");
title.textContent = 'CART 351 FALL 2026';

}

loadTitle();
loadTitleHeader();
loadNav();
