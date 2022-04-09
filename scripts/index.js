import "../styles/index.scss";

const hamburger = document. querySelector("#hamburger");
const mobileMenu = document.querySelector("#nav-links");
const backdrop = document.querySelector("#backdrop");
const selection = document.querySelector("#selection-screen");
const closeMenu = document.querySelector("#close-menu");
const selectionBtn = document.querySelectorAll(".selection-btn");
const radioBtn = document.querySelectorAll(".radio-btn");
const yourPledge = document.querySelectorAll(".your-pledge");
const success = document.querySelector("#success");
const next = document.querySelectorAll(".continue");
const finished = document.querySelector("#finished");
const innerBar = document.querySelector(".innerbar");
const textSelect = document.querySelector(".text-select");
const bookmark = document.querySelectorAll("#bookmark");

// Nav Menu
hamburger.addEventListener("click", menu);
window.addEventListener("scroll", () => {
    mobileMenu.setAttribute("data-visible", false);
        mobileMenu.style.height = "0";
        hamburger.src = "/images/icon-hamburger.svg";
        backdrop.style.opacity = "0";
        setTimeout(function() {
            backdrop.style.display = "none";
        }, 600)
})

function menu() {
    const visibilty = mobileMenu.getAttribute("data-visible");

    if(visibilty === "false"){
        mobileMenu.setAttribute("data-visible", true);
        mobileMenu.style.height = "100%";
        hamburger.src = "./images/icon-close-menu.svg";
        backdrop.style.opacity = ".5";
        backdrop.style.display = "block";
        
    }else{
        mobileMenu.setAttribute("data-visible", false);
        mobileMenu.style.height = "0";
        hamburger.src = "/images/icon-hamburger.svg";
        backdrop.style.opacity = "0";
        setTimeout(function() {
            backdrop.style.display = "none";
        }, 600)
    }
}

// Selection menu

closeMenu.addEventListener("click", selectionMenu);

function selectionMenu() {
    selection.style.opacity = "0";
    setTimeout(function() {
        selection.style.display = "none";
    }, 600)
}

selectionBtn.forEach(btn => {
    btn.addEventListener("click", selectionMenuOpen);
})

function selectionMenuOpen(e) {
    selection.style.opacity = "1";
    selection.style.display = "flex";
    window.scrollTo(0, 0)

    const target = e.target;
    const selected = target.getAttribute("aria-controls")

    selectRadio(`#${selected}`)
}

function selectRadio(content){

    document.querySelector(content).checked = true

    const secondContainer = document.querySelector(content).parentNode
    const mainContainer = secondContainer.parentNode;

    mainContainer.querySelector('.enter-pledge').setAttribute("data-visible", true)
    pledgedAmount = mainContainer.querySelector('.amount').innerHTML

}

radioBtn.forEach(e => {
    e.addEventListener("click", () => {
        document.querySelector('[data-visible="true"]').setAttribute("data-visible", false)

        const secondContainer = e.parentNode
        const mainContainer = secondContainer.parentNode;

        mainContainer.querySelector('.enter-pledge').setAttribute("data-visible", true)
        pledgedAmount = mainContainer.querySelector('.amount').innerHTML

    })
})

// Pledge amount

yourPledge.forEach(e => {
    e.addEventListener("keyup", changePledge)
})

let pledgedAmount = 0;
let changedAmount = 0;

function changePledge() {
    const parent = document.querySelector('[data-visible="true"]');
    const value = parent.querySelector("input").value;
    const amount = parent.querySelector(".amount")

    amount.innerHTML = value;

    if(value === ""){
        amount.innerHTML = pledgedAmount;
        changedAmount = parseInt(pledgedAmount);
    }else{
        amount.innerHTML = value;
        changedAmount = parseInt(value);
    }
    

}


// Updated numbers

const moneyBacked = document.querySelector("#money-backed");
const totalBackers = document.querySelector("#total-backers");

let totalMoney = 89914
let backers = 5007

function updateNumbers(){
    moneyBacked.innerHTML = '$' + totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalBackers.innerHTML = backers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if(totalMoney.toString().length === 5){
        innerBar.style.width = `${totalMoney.toString().slice(0, 2)}%`;
    }else{
        innerBar.style.width = `${totalMoney.toString().slice(0, 3)}%`;
    }

    
}

// Success 

next.forEach(e => {
    e.addEventListener("click", thankYou);
})

function thankYou() {
    selectionMenu()

    window.scrollTo(0, 0)
    success.style.display = "flex";

    backers++
    if(changedAmount === 0){
        totalMoney += parseInt(pledgedAmount)
    }else{
        totalMoney += parseInt(changedAmount)
    }

    updateNumbers()

    const parent = document.querySelector('[data-visible="true"]');
    parent.querySelector("input").value = "";
    
}

finished.addEventListener("click", closeThankYou)

function closeThankYou() {
    success.style.display = "none";
}


// Create bookmark
bookmark.addEventListener("click", createBookmark);

let createBookmark = browser.bookmarks.create({
    title: "crowdfunding",
    url: "https://developer.mozilla.org/Add-ons/WebExtensions/API/bookmarks/create"
  });


