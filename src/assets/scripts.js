document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-overflow="false"]').forEach((elements) => {
        const hideTarget = elements.getAttribute('data-hide-target');
        elements.addEventListener('toggleAfter', function (event) {
            if (window.easyToggleState.isActive(event.target)) {
                document.documentElement.classList.add('overflow-hidden');
                hideTarget && document.querySelector(hideTarget).classList.add('hidden');
            } else {
                document.documentElement.classList.remove('overflow-hidden');
                hideTarget && document.querySelector(hideTarget).classList.remove('hidden');
            }
        });
    });

    document.querySelectorAll('.button_toggle_comment').forEach((elements) => {
        elements.addEventListener('click', initComments('.elcreative_comment'));
    });

});


var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}
var themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', function () {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});







(btnScrollTop = document.getElementById("back-to-top")),
    window.addEventListener("scroll", function () {
        200 < document.body.scrollTop ||
            200 < document.documentElement.scrollTop
            ? (btnScrollTop.style.display = "flex")
            : (btnScrollTop.style.display = "none");
    }),
    btnScrollTop.addEventListener("click", function (e) {
        e.preventDefault(),
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });



/**
    document.querySelectorAll('img').forEach(function(img) {
        img.src = img.src.replace('/s72-c','/s1600');
    });
 */


/* ==========================================
scrollTop() >= 300
Should be equal the the height of the header
========================================== */


let MainPagesList = document.getElementById("MainPagesList");
let theTopofHeader = MainPagesList.getBoundingClientRect().top;
let myContent = document.getElementById("myContent");
function hyperHeader () {
	if (MainPagesList.getBoundingClientRect().top == 0) {
		MainPagesList.classList.add("fixed-header");
		myContent.style.paddingTop = myContent.getBoundingClientRect().top;
	} else {
		MainPagesList.classList.remove("fixed-header");
		myContent.style.paddingTop = "";
	}
}
window.addEventListener("scroll", hyperHeader);




// mainMenuNav
let mainMenuNav = document.querySelectorAll("#mainMenuNav > li"),
    mySubMenu = mainMenuNav[mainMenuNav.length - 1],
    z = 0;

mySubMenu.addEventListener("mouseenter", () => {
    document.getElementById("nestedMenu").classList.remove("hidden");
});
mySubMenu.addEventListener("mouseleave", () => {
    document.getElementById("nestedMenu").classList.add("hidden");

});

SubMenu = `
    <span class="dropDown">
        ${mySubMenu.querySelector("a").innerText}...
    </span>

    <ul id="nestedMenu" class="flex flex-col items-center justify-center gap-y-2 w-[200px] p-4 rounded-md text-[var(--dark4)] dark:text-[var(--light1)] bg-[var(--light2)] dark:bg-[var(--dark3)] absolute shadow-md hidden">
        <li class="p-2">
            <a class="" href="#">Just Link</a>
        </li>
        <li class="p-2">
            <a class="" href="#">Just Link</a>
        </li>
    </ul>
`;

mySubMenu.innerHTML = SubMenu;


// add active class to linkPage
document.querySelectorAll("#mainMenuNav > li > a").forEach(function (a) {
    a.getAttribute("href") == window.location.href ? a.parentElement.classList.add("bg-white", "text-[var(--favColor)]") : "";
});




// tags In Aside
var backgrounds = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
var tags = document.querySelectorAll("#tagsInAside li");
var len = backgrounds.length;
for (i = 0; i < tags.length; i++) {
    tags[i].className += ' ' + backgrounds[i % len];
}


// navMenuMobile
let menuForMobile = document.getElementById("menuForMobile");
document.getElementById("navMenuMobile").addEventListener("click",()=>{
	menuForMobile.classList.toggle("hidden");
	menuForMobile.classList.toggle("flex");
});