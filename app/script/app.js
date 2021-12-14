let tableAnimal = document.querySelector("#Table")
let bodyElement = document.querySelector("body");
let formAnimal = document.querySelector("#Form")

bodyElement.onload = () => {
  searchAnimals()
  formAnimals()

}

function searchAnimals() {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
      const listAnimals = JSON.parse(this.response);
      console.log(listAnimals)
      tableAnimals(listAnimals)
  }

  xhttp.open("GET", "http://localhost:3000/animal", true);
  xhttp.send();   
}


function tableAnimals  (listAnimals) {
  let table = `<table>
      <tr>
          <th>Nome</th>
          <th>Especie</th>
          <th>Descrição</th>
      </tr>`;
  

  listAnimals.forEach((item, index) => {
    table += `<tr>
      <td>${item.name}</td>
      <td>${item.species}</td>
      <td>${item.description}</td>
    </tr>`;
  })

  table += `</table>`;

  tableAnimal.innerHTML = table
}

function formAnimals() {
  let form = `<h3>Insira um animal</h3>
  <form id="formAnimals">
    <input id="name" type="text" placeholder="nome do Animal">
    <input id="species" type="text" placeholder = "especie">
    <input id="description" type="text" placeholder = "descrição">
    <input id="button" type= "submit" value= "CADASTRAR">
  </form>`

  formAnimal.innerHTML = form

  const animal = document.querySelector("#formAnimals");
  animal.onsubmit = function(event) {
      event.preventDefault();
      const name = document.querySelector("#name");
      const species = document.querySelector("#species");
      const description = document.querySelector("#description");
      if(name.value && species.value && description.value) {
          let animals = {name: name.value , species: species.value, description: description.value, user_id: "cf8d5a2d-8e4e-4c3c-af80-98c9dd7885a5"  }
          insertAnimals(animals)
          name.value="";
          species.value="";
          description.value="";
      }
      else {
          alert("Campos Nome e Preco obrigatórios");
      }
  }

}


function insertAnimals(animal) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange =  function() {
    if (xhttp.readyState = 4) {
      searchAnimals()
      var data = xhttp.responseText
      console.log(data)
    }
  }

  xhttp.open("POST", "http://localhost:3000/animal", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(animal));    
}
