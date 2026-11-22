window.onload = function () {
console.log("button")
let hasBeenClicked =false;
document.querySelector(".button-to-click").addEventListener("click", async function(){

    if(hasBeenClicked ===false){

    
    const url = `/insertData`;
    try {
       document.querySelector("#message").innerHTML = "INSERTING DATA DO NOT CLICK AGAIN"
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON)
      document.querySelector("#message").innerHTML = "DONE DO NOT CLICK AGAIN"
      hasBeenClicked = true;
      return
    
    } catch (err) {
      console.log(err);
    }
 }   
  })

};