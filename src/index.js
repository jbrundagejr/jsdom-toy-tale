let addToy = false;

const toyFormContainer = document.querySelector(".container")
const toyCollection = document.querySelector("#toy-collection")
const addNewToyButton = document.querySelector("#new-toy-btn")
const submitButton = document.querySelector("submit")

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(function(toys){
  toys.forEach(function(toy){
    turnToyToDiv(toy)
  })
})  

function turnToyToDiv(toy) {
  let toyDiv = document.createElement("div")
  let h2 = document.createElement("h2")
  let toyImage = document.createElement("img")
  let p = document.createElement("p")
  let likeButton = document.createElement("button")
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"
  h2.innerText = toy.name
  toyDiv.className = "card"
  p.innerText = `${toy.likes} likes`
  likeButton.className = "like-btn"
  likeButton.innerText = "Like this!"
  toyDiv.append(h2, toyImage, p, likeButton)
  toyCollection.append(toyDiv)
    likeButton.addEventListener("click", function(){
      fetch(`http://localhost:3000/toys/${toy.id}`,
        {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            likes : toy.likes + 1
          })
        }
      )
        .then(res => res.json())
        .then(function(toyUpdatedCount){
          toy = toyUpdatedCount
          p.innerText = toyUpdatedCount.likes
        })
    })
}




addNewToyButton.addEventListener("click", function(){
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
  // addNewToyButton.addEventListener("click", function () {
  // evt.PreventDefault() 
  // fetch(`http://localhost:3000/toys/`,
  //     {
  //       method: "POST",
  //       headers: {
  //         'Content-type': 'application/json',
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "name": "Optimus Prime",
  //         "image": "https://cdn.shopify.com/s/files/1/0169/6995/7440/products/F0662xxxx_DIO_TRA_KINGDOM_OPTIMUSPRIME_2_Online_300DPI_1024x1024.jpg?v=1601047458",
  //         "likes": 3
  //       })
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(function (newToy) {
  //       function(newToy)
  //     })
  //   })
  })

