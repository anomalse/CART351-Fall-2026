window.onload = function () {
  document.querySelector("#queryChoice").selectedIndex = 0;
  /***** Get the data from drop down selection ****/
  let querySelectDropDown = document.querySelector("#queryChoice");

  querySelectDropDown.onchange = function () {
    console.log(this.value);
    let copyVal = this.value;
    console.log(copyVal);
    runQueryDebug(copyVal);
  };

  /******************* RUN QUERY***************************  */
  async function runQueryDebug(queryPath) {
    // // //build the url -end point
    const url = `/${queryPath}`;
    try {
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON);
      //printResults
      printResults(resJSON.results)
    } catch (err) {
      console.log(err);
    }
  }
  function printResults(data){
  
   let parent = this.document.querySelector("#results");
   parent.innerHTML = ""
   for(let i = 0; i< data.length; i++){

    let para = document.createElement("p");
    para.innerHTML = `<br> ENTRY: ${i}`
    parent.appendChild(para)

    let list = document.createElement("ul");

      for(el in data[i]){
         let li = document.createElement("li")
         li.innerHTML = `${el}: ${data[i][el]}`;
         list.appendChild(li)
         }

    parent.appendChild(list)


   }
  }
};
