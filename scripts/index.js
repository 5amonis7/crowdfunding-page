import "../styles/index.scss";

const hamburger = document. querySelector("#hamburger");
const mobileMenu = document.querySelector("#nav-links");
const backdrop = document.querySelector("#backdrop");
const selection = document.querySelector("#selection-screen");
const closeMenu = document.querySelector("#close-menu");
const selectionBtn = document.querySelectorAll(".selection-btn");
const radioBtn = document.querySelectorAll(".radio-btn");
const yourPledge = document.querySelectorAll(".your-pledge");

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

    const tabContainer = target.parentNode;
    const mainContainer = tabContainer.parentNode;


    selectRadio(`#${selected}`)
}

function selectRadio(content){

    document.querySelector(content).checked = true

    const secondContainer = document.querySelector(content).parentNode
    const mainContainer = secondContainer.parentNode;

    mainContainer.querySelector('.enter-pledge').setAttribute("data-visible", true)

}

radioBtn.forEach(e => {
    e.addEventListener("click", () => {
        document.querySelector('[data-visible="true"]').setAttribute("data-visible", false)

        const secondContainer = e.parentNode
        const mainContainer = secondContainer.parentNode;

        mainContainer.querySelector('.enter-pledge').setAttribute("data-visible", true)

    })
})

// Pledge amount

yourPledge.forEach(e => {
    e.addEventListener("keyup", changePledge)
})

function changePledge() {
    const parent = document.querySelector('[data-visible="true"]');
    const value = parent.querySelector("input").value;
    const amount = parent.querySelector("#amount")

    amount.innerHTML = value;

}