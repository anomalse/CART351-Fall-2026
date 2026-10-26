window.onload = function () {
  
  //get the needed heights
  let divHeights ={

  }
    document.querySelectorAll(".part-button").forEach(function (el) {
    
    const idT = el.getAttribute("data-assoc");
    const elem = document.querySelector(`#${idT}`);
    elem.style.display = "block";
    elem.style.visibility = "hidden";
    //elem.style.position = "absolute";

    const height = elem.offsetHeight;
    console.log(height);
    divHeights[idT] = height

    // Reset styles
    elem.style.display = "none";
    elem.style.visibility = "";
    elem.style.height = "0px";
    elem.style.opacity = 0;
  });


  document.querySelectorAll(".part-button").forEach(function (el) {
    console.log(divHeights)
    el.addEventListener("click", displayStuff);
  });

  function displayStuff() {

    let id_of_part = this.getAttribute("data-assoc");
    let height_of_part = divHeights[id_of_part];
    let animateStep = 3;
    let opacityStep = (1/height_of_part)*animateStep;


    if (this.getAttribute("is_active") === "notactive") {
      document.querySelector(`#${id_of_part}`).style.display = "block";
      this.setAttribute("is_active", "active");
      this.classList.add("active-button");
      let ref = setInterval(function(){
        document.querySelector(`#${id_of_part}`).style.height = (parseInt(document.querySelector(`#${id_of_part}`).style.height)+animateStep)+"px";
        document.querySelector(`#${id_of_part}`).style.opacity = parseFloat(document.querySelector(`#${id_of_part}`).style.opacity)+opacityStep
        //console.log(document.querySelector(`#${id_of_part}`).style.height)
        if(parseInt(document.querySelector(`#${id_of_part}`).style.height) >=height_of_part){
            clearInterval(ref);

        }
      },1)
    

    } else {
      //document.querySelector(`#${id_of_part}`).style.display = "none";
      this.setAttribute("is_active", "notactive");
      this.classList.remove("active-button");
        let ref = setInterval(function(){
        document.querySelector(`#${id_of_part}`).style.height = (parseInt(document.querySelector(`#${id_of_part}`).style.height)-animateStep)+"px";
        document.querySelector(`#${id_of_part}`).style.opacity = parseFloat(document.querySelector(`#${id_of_part}`).style.opacity)-opacityStep;
        //console.log(document.querySelector(`#${id_of_part}`).style.height)
        if(parseInt(document.querySelector(`#${id_of_part}`).style.height) <=0){
            document.querySelector(`#${id_of_part}`).style.display = "none";
             document.querySelector(`#${id_of_part}`).style.opacity = 0;
              document.querySelector(`#${id_of_part}`).style.height = "0px";
            clearInterval(ref);

        }
      },1)
    }
  }
};
