const menuToggle = document.querySelector(".navigation__toggle"),
    navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

const list = document.querySelectorAll(".navigation__link");

function activeLink() {
    list.forEach((link) => {
        link.classList.remove("active");
        this.classList.add("active");
    });
}

list.forEach((link) => link.addEventListener("click", activeLink));
