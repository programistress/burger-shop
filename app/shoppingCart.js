// variables 
const cartElement = document.getElementById('cart')
const dropDown = document.getElementById('dropdown')
const burgersEl = document.querySelector('#burgers-el')
const cartItemsEl = document.querySelector('#cart-items')
const totalEl = document.querySelector('#total')
const totalItemsEl = document.querySelector('#total-items')
const freeDeliveryEl = document.querySelector('#free-delivery')
const closeCartBtn = document.querySelector('#close-cart')
const snacksProducts = document.querySelector('#snacks')
const snacksEl = document.querySelector('#snacks-el')
const snacksTitle = document.querySelector('#snacks-title')
const burgersProducts = document.querySelector('#burgers')
const burgersTitle = document.querySelector('#burgers-title')

function tabFunction() {
  snacksEl.classList.remove("hidden")
  snacksTitle.classList.remove("hidden")
  burgersEl.classList.add("hidden")
  burgersTitle.classList.add("hidden")
  burgersProducts.classList.remove("active")
  snacksProducts.classList.add("active")
}

function burgerTabFunction() {
  burgersEl.classList.remove("hidden")
  burgersTitle.classList.remove("hidden")
  snacksEl.classList.add("hidden")
  snacksTitle.classList.add("hidden")
  burgersProducts.classList.add("active")
  snacksProducts.classList.remove("active")
}

snacksProducts.addEventListener('click', tabFunction)
burgersProducts.addEventListener('click', burgerTabFunction)

// dropdown cart using toggle
// Метод toggle объекта classList чередует заданный CSS класс элемента: добавляет класс, если его нет и удаляет, если есть.
function makeActive() {
  dropDown.classList.toggle("hidden");
}

// for close button
function notActive() {
  dropDown.classList.add("hidden");
}

closeCartBtn.addEventListener('click', notActive)

// rendering products from the products.js 
function renderProducts(type) {
  // can also do for loop
  // Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве.
  products.forEach( (product) => { 
    burgersEl.innerHTML += `
    <div class="bg-white p-1 comp:p-3 min-w-[145px] max-w-[300px] rounded-xl">
    <img class="min-w-[137px] min-h-[120px] object-cover rounded-lg mb-[10px]" src="${product.imgSrc}" alt="${product.name}">
    <p class="mb-1 text-m">${product.price}$</p>
    <h3 class="mb-4 text-m">${product.name}</h3>
    <p class="mb-[7px] text-m text-desc-grey">${product.weight}g</p>
    <!-- using onclick to call a function -->
    <button class="bg-grey rounded-lg py-[9px] w-full text-m" onclick="addToCart(${product.id})">Add</button>
    </div>
    `
  })
}

renderProducts()



// cart array
// before setting up local storage it was let cart = []
// getItem() метод об'єкту localStorage який повертає значення ключа за його назвою у локальному сховищі даних браузера.
// parse() - метод об'єкту JSON який розбирає рядок формату даних JSON і повертає о'бєкт.
// if nothing is in the local storage it wll be || [] instead of null
let cart = JSON.parse(localStorage.getItem("CART")) || []
updateCart()

// add to cart
function addToCart(id) {
  // checking if product alredy exists in cart using some() method
  // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
  if(cart.some( (item) => item.id === id)) {
    changeQuantity('plus', id)
  } else {
    // find the id we clicked on in products array
    const item = products.find( (product) => product.id === id )
    // add it to the cart array
    cart.push({
      // destructuring the item
      ...item,
      // adding new property
      quantity: 1
    })
  }
  updateCart()
}

// update cart
function updateCart() {
  renderCartItems()
  renderTotal()
  // save info to local storage
  // stringify() метод об'єкту JSON який перетворює зрачення JavaScript у рядок формату JSON.
  // setItem() метод об'єкту localStorage який записує значення у локальне сховище даних браузера або змінює його якщо ключ key уже існує.
  localStorage.setItem("CART", JSON.stringify(cart))
}

// render cart items
function renderCartItems(){
  // clear the cart element because the forEach() doesnt override what is already in the cart because of += it adds new products on top of the old ones
  cartItemsEl.innerHTML = ""
  cart.forEach( (item) => {
    cartItemsEl.innerHTML += `
    <div id="cart-item" class="border-y border-grey mt-[8px] py-10 text-s flex place-content-between items-center small2:text-m">
      <div class="flex">
        <div>
        <img class="h-[52px] small2:h-[72px] rounded-lg mr-[6px] tablet:h-[52px]" src="${item.imgSrc}" alt="${item.name}">
        </div>
        <div class="flex-grow flex flex-col">
          <h3>${item.name}</h3>
          <p class="text-desc-grey">${item.weight}g</p>
          <p id="cart-price">${item.price}$</p>
        </div>
      </div>
      <div class="relative">
      <button class="absolute top-[-18px] right-[4px]" id="remove" onclick="removeItemFromCart(${item.id})">x</button>
        <div class="px-[8px] py-[7px] rounded-lg bg-grey flex justify-center text-s items-center gap-x-[18px] h-[30px] mt-[5px] mr-[10px] small2:text-m">
          <!-- add onclick event to change quantity -->
          <button onclick="changeQuantity('minus', ${item.id})">-</button>
          <p id="cart-quantity">${item.quantity}</p>
          <button onclick="changeQuantity('plus', ${item.id})">+</button>
        </div>
      </div> 
    </div>
    `
    cartElement.addEventListener('click', makeActive)
  })
}

// change quantity of items in cart
// the parametrs are plus/minus and id
function changeQuantity(action, id) {
  // looking for item with the same id as selected using map method
  // Метод map позволяет применить заданную функцию для каждого элемента массива. При этом метод не изменяет исходный массив, а возвращает измененный.
  cart = cart.map( (item) => {
    // getting the old quantity
    let quantity = item.quantity
    // changing the quantity
    if(item.id === id) {
      if(action === 'minus' && quantity > 1) {
        quantity--
      } else if(action === 'plus' && quantity < item.instock){
        quantity++
      }
    } 
    // То, что вернет эта функция через return для элемента массива, станет новым значением этого элемента 
    // returning a changed object
      return {
        ...item,
        quantity
      }
  })
  // updating interface after changing the cart array
  updateCart()
}

// calculate and render total
function renderTotal() {
  // setting new variables
  let totalPrice = 0
  let totalItems = 0
  // appliying function to every item ib cart using forEach()
  cart.forEach( (item) => {
    // totalPrice and totalItems is 0 += calculated number
    totalPrice += item.price * item.quantity
    totalItems += item.quantity
  })
  // removing the dropdown when theres nothing in cart
  if (totalItems === 0) {
    notActive()
    cartElement.removeEventListener('click', makeActive)
  } else if (totalItems < 0) {
    cartElement.addEventListener('click', makeActive)
  }
  // rendering the html for price
  // Метод toFixed производит округление числа до указанного знака в дробной части.
  totalEl.innerHTML = `
  ${totalPrice.toFixed(2)}$
  `
  // rendering total items in cart
  totalItemsEl.innerHTML = `
  ${totalItems}
  `
  // free delivery message
  if (totalPrice > 10) {
    freeDeliveryEl.innerHTML = `
        <img class="w-[24px] mr-[8px]" src="./styles/img/free-icon-delivery-2362252.svg" alt="">
        <p>Free delivery!</p>
    `
  } else {
    freeDeliveryEl.innerHTML = ``
  }
  

}

// remove item fron cart
function removeItemFromCart(id) {
  // Метод filter позволяется отфильтровать элементы массива, оставив только подходящие под определенное условие элементы.
  // changing our cart array so that in array stay only items that werent removed
  cart = cart.filter( (item) => item.id !== id)
  // updating cart so it updates the interface of cart items and totals
  updateCart()
}

