let upper = document.querySelector(".upper");
let plus = document.querySelector("#plus");
let minus = document.querySelector("#minus");
let count = document.querySelector("#count");
let addToCart2 = document.querySelector(".addToCart2");
let row = document.querySelector(".new-row");
let spanCount = document.querySelectorAll("#basket span");
let clearAll = document.querySelector(".clearAll");
let basket = document.querySelectorAll("#basket");
let empyt = document.querySelector(".empty");
let choosing = document.querySelector(".choosing");
let title = document.querySelector(".right-info h2");
let price = document.querySelector("#price");
let leftImage = document.querySelector(".left-image img");
let overlay = document.querySelector(".overlay");
let close2 = document.querySelector(".close2");
let overRow = document.querySelector(".over-row");
let bars = document.querySelector(".bars");
let closeAside = document.querySelector(".closeAside");
let aside1 = document.querySelector(".aside1");
let closeCart = document.querySelector(".flex2 i");
let asideCart = document.querySelector(".cart");
let up = document.querySelector(".up");
let closeUp = document.querySelector(".close1");

closeUp.addEventListener("click", function(){
    up.style.display = "none";
});

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
    }else{
        nav.style.transform = "translateY(calc(-100% + -1px))";
        upper.style.transform = "translateY(100%)";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0);
});

let list = [];

let cart;
if(localStorage.getItem("newItems2") == null){
    cart = [];
    checkBtn();
}else{
    cart = JSON.parse(localStorage.getItem("newItems2"));
    checkBtn();
};

let index1;

let getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayProducts(products);
};
getData();

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card1 card2">
        <div class="image">
            <img src="${item.image}" alt="">
            <button class="quick" onclick="openInfo(${index})">
                quick view
            </button>
        </div>
        <div class="card-body">
            <h4 class="name">${item.title}</h4>
            <div class="stars">
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
                <div class="star"><i class="fa-solid fa-star"></i></div>
            </div>
            <span class="price">${item.price}</span>
            <div class="card1-bot">
                <div class="left-icon ll">
                    <i class="fa-regular fa-heart"></i>
                </div>
                <button onclick="addProduct(${index})" class="addToCart siz">
                    <i class="fa-solid fa-bag-shopping"></i> add to cart
                </button>
                <div class="right-icon r">
                    <i class="fa-solid fa-signal"></i>
                </div>
            </div>
        </div>
        </div>
        `
    });
    row.innerHTML = card;
};

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        overRow.style.transform = "translateY(0)";
        overRow.style.opacity = "1";
    }, 100);
    title.textContent = list[index].title;
    price.textContent = list[index].price;
    leftImage.src = list[index].image;
};

close2.addEventListener("click", function(){
    overRow.style.transform = "translateY(-30%)";
    overRow.style.opacity = "0";
    setTimeout(() => {
    overlay.style.display = "none";
    count.innerHTML = 0;
    }, 400)
});

bars.addEventListener("click", function(){
    aside1.style.transform = "translateX(0)";
});

closeAside.addEventListener("click", function(){
    aside1.style.transform = "translateX(calc(-100% + -41px))";
});

basket.forEach((item) => {
    item.addEventListener("click", function(){
        asideCart.style.transform = "translateX(0)";
    });
});

closeCart.addEventListener("click", function(){
    asideCart.style.transform = "translateX(calc(100% + 2px))";
});

plus.addEventListener("click", function(){
    count.innerHTML++;
});

minus.addEventListener("click", function(){
    count.innerHTML--;
    if(count.innerHTML < 0){
        count.innerHTML = 0;
    };
});

function addProduct(index){
    let choosingProduct = list[index];
    let final = cart.find((item) => item.id == choosingProduct.id);
    if(final){
        final.count++;
    }else{
        cart.push({...choosingProduct, count: 1});
    };
    checkBtn();
    displayThings();
    localStorage.setItem("newItems2", JSON.stringify(cart));
};

addToCart2.addEventListener("click", function(){
    let choosingProduct = list[index1];
    let final = cart.find((item) => item.id == choosingProduct.id);
    if(count.innerHTML > 1 && final){
        final.count = count.innerHTML;
    }else{
        cart.push({...choosingProduct, count: 1});
    };
    checkBtn();
    displayThings();
    localStorage.setItem("newItems2", JSON.stringify(cart));
});

function displayThings(){
    let card = "";
    cart.forEach((item, index) => {
        card += `
        <div class="cardat">
        <div class="left-info">
            <h5>${item.title}</h5>
            <span class="price">${item.price}</span>
            <h6>Qty: ${item.count}</h6>
        </div>
        <div class="right-image">
            <i class="fa-solid fa-xmark" onclick="deleteElement(${index})"></i>
            <img src="${item.image}" alt="">
        </div>
        </div>
        `
    });
    choosing.innerHTML = card;
};
displayThings();

function deleteElement(index){
    cart.splice(index, 1);
    localStorage.setItem("newItems2", JSON.stringify(cart));
    checkBtn();
    displayThings();
};

clearAll.addEventListener("click", function(){
    cart.splice(0);
    localStorage.clear();
    checkBtn();
    displayThings();
});

function checkBtn(){
    if(cart.length == 0){
        clearAll.style.display = "none";
        empyt.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = 0;
        });
    }else{
        clearAll.style.display = "inline-block";
        empyt.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};