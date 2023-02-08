let product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dburger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    cartListItems = document.querySelector('.wrapper__navbar-checklist');



burgerBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        addAmount(this)
    })
})

function addAmount(btn) {
    // closest() - метод который позволяет подключится к указаному ближайшему родителю
    // getAttribute() - метод который позволяет получить значение любого указаного атрибута
    let parent = btn.closest('.wrapper__list-card');
    let id = parent.getAttribute('id')
    product[id].amount++
    basket();
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))




function basket() {
    let korzinka = []
    for (let key in product) {
        let burger = product[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if (burger.amount > 0) {
            korzinka.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        } else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allCount = totalAmount()
    if (allCount > 0) {
        cartAmount.classList.add('active')
    } else {
        cartAmount.classList.remove('active')
    }
    cartAmount.innerHTML = allCount

    cartListItems.innerHTML = ''

    korzinka.forEach((burger) => {
        cartListItems.innerHTML += createBurger(burger)
    })
//
    cartTotalPrice.innerHTML = totalSumBurgers()
    korzinka.length == 0 || korzinka == '' ? cartListItems.innerHTML = `<h2 class="pusto">Пусто</h2>` : ''
}

function totalSumBurgers() {
    let sum = 0;
    for (let key in product) {
        sum += product[key].totalSum
    }
    return sum + 'сумм'
}


function totalAmount() {
    let total = 0;
    for (let key in product) {
        total += product[key].amount
    }
    return total
}


function createBurger(burger) {
    return `<div class="nav__item"  id="${burger.name.toLowerCase()}-burger">
    <div class="nav__item-left">
        <img src="${burger.img}" alt="">
        <div class="nav__item-info">
            <p>${burger.name}</p>
            <p>${burger.totalSum} сум</p>
        </div>
    </div>
    <div class="nav__item-right">
        <button data-symbol="-" class="nav__item-btn">-</button>
        <output class="nav__item-count">${burger.amount}</output>
        <button data-symbol="+" class="nav__item-btn">+</button>
    </div>
</div>`
}


window.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__item-btn')) {
        let dataValue = event.target.getAttribute('data-symbol')
        let parentBurger = event.target.closest('.nav__item')
        if (parentBurger) {
            let id = parentBurger.getAttribute('id').split('-')[0]
            if (dataValue == '-') {
                product[id].amount--
            } else if (dataValue == '+') {
                product[id].amount++
            }
            basket()
        }
    }
})

let box = document.querySelector('.box');

box.addEventListener('click', () => {
    cartList.classList.remove('active')
})