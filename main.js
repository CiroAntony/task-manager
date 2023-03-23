let container = document.querySelector('.container');
let input1 = document.querySelector('.task');
let button = document.querySelector('.button');
let listContainer = document.querySelector('.list');

let list = JSON.parse(localStorage.getItem('list')) || [];

//Eliminar elemento del array
function deleteElement(index) {
  list.splice(index, 1); //Esto eliminar el elemento almacenado en el local storage
  localStorage.setItem('list', JSON.stringify(list));

  //Eliminar el elemento de li
  let listItem = listContainer.getElementsByClassName('sub-list')[index];
  listItem.remove();
}

const agregarTarea = () => {
  let listValue = input1.value;
  if (listValue !== "") {
    list.unshift(listValue);
    input1.value = "";

    let subList = document.createElement('li');
    subList.classList.add('sub-list');
    listContainer.insertBefore(subList, listContainer.firstChild);
    subList.innerText = listValue;

    let deleteBtn = document.createElement('button');
    let img = document.createElement('img');
    img.src = './assets/remove.png';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.addEventListener('click', function() {
      deleteElement(Array.from(listContainer.children).indexOf(subList));
    });
    subList.appendChild(deleteBtn);
    deleteBtn.appendChild(img);

    localStorage.setItem('list', JSON.stringify(list));
  }
};

button.onclick = agregarTarea;

input1.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    agregarTarea();
  }
});


// Mostrar los elementos almacenados en la pagina "li"
list.forEach((item, index) => {
  let subList = document.createElement('li');
  subList.classList.add('sub-list');
  listContainer.appendChild(subList);
  subList.innerText = item;

  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn-delete');
  let img = document.createElement('img');
  img.src = './assets/remove.png';
  subList.appendChild(deleteBtn);
  deleteBtn.appendChild(img);
  deleteBtn.addEventListener('click', function() {
    deleteElement(index);
  });
});
