// funzione per far apparire la sezione icone-numeri e numeri sezione About_us
let colNumbers = document.querySelectorAll(".colNumbers")
let immagineAbout = document.querySelector(".immagineAbout")
let numAbout1 = document.querySelector(".numAbout1")
let numAbout2 = document.querySelector(".numAbout2")
let aboutUsText = document.querySelector(".aboutUsText");
let isChecked = false;
// interval number
function createInterval(element, final, number) {
    let counter = 0;

    let interval = setInterval(() => {
        if (counter < final) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        } 
    
    }, number);    
}
let observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting && isChecked == false){
            colNumbers.forEach(element=>{
                element.style.opacity = 1;
            });
            aboutUsText.style.opacity = 1;
            createInterval(numAbout1, 1234, 1);
            createInterval(numAbout2, 1234, 1);           
            isChecked = true
        }
    })
});
observer.observe(immagineAbout);

// sezione our_services
let check = false
let n = 0.5;
let ourServicesRow = document.querySelector(".ourServicesRow");
let ourSerObs = document.querySelector(".ourSerObs");
let observerSer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        if(check == false && entry.isIntersecting){
            check = true
            fetch("/resources/servizi.json")
            .then(response => response.json())
            .then(data =>{data.forEach(element =>{
            n = n + 0.3
            let div = document.createElement("div");
            div.classList.add("col-12", "col-md-4");
            div.innerHTML= `
            <div class="card my-3 ourCard" style=" opacity: 0; animation-duration: ${n}s;">
              <div class="overflow-hidden">
                <img src="./resources${element.url}" class="card-img-top ourCardPhoto" alt="...">
              </div>
              <div class="card-body text-center tagCard">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <a href="#" class="text-decoration-none"style="color: #ab7442;">Read More<i class="fa-solid fa-arrow-right ms-1"></i></a>
              </div>
            </div>  `
            ourServicesRow.appendChild(div)
            }) 
        })
     }
    })
});
observerSer.observe(ourSerObs);

// Sezione Why Choose Us
let textWhyChooseUs = document.querySelector(".textWhyChooseUs")
let immagineWhyChooseUs = document.querySelector(".immagineWhyChooseUs")
let checkWhy = false
let observerWhy = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting && checkWhy == false){
            textWhyChooseUs.style.opacity = 1;          
            checkWhy = true
        }
    })
});
observerWhy.observe(immagineWhyChooseUs);

// sezione Our Projects
let modal = document.querySelector(".modal-content")
let proRow = document.querySelector(".proRow")
let ourprojectUl= document.querySelector(".ourprojectUl")
let ourProjectsRow = document.querySelector(".ourProjectsRow")
let ourProjObs = document.querySelector(".ourProjObs")
let checkPro = false
let b = 0.3;
let observerProject = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        if(checkPro == false && entry.isIntersecting){
            checkPro = true
            fetch("/resources/servizi.json")
            .then(response => response.json())
            .then(data =>{
                function setCategory() {
                    let categories = [];
                    data.forEach(element => {
                        if (!categories.includes(element.category)) {
                            categories.push(element.category)
                        }
                    });    
                categories.forEach(element=>{
                    let div = document.createElement("div")
                    div.innerHTML =`
                    <li class="mx-md-2 mx-1 ourProli" id="${element}">${element}</li>
                    `;
                    ourprojectUl.appendChild(div)    
                })
             } 
            setCategory();
            // Cards Our Project
            function projectCardsCreator(array){
                ourProjectsRow.innerHTML = ``;
                array.forEach(element=>{
                    b = b + 0.3
                    let div = document.createElement("div")
                    div.classList.add("col-12", "col-md-4");
                    div.innerHTML = `
                    <div class="card mb-3 w-100 mx-md-3 proCard" style="animation-duration: ${b}s;">
                        <div class="overflow-hidden position-relative">
                            <div class="tendina justify-content-center align-items-center position-absolute ourCardPhoto">
                            <i class="fa-regular fa-eye" onclick="openModal();currentSlide(${element.id})" class="hover-shadow"></i>
                            <i class="fa-solid fa-link"></i>
                            </div>
                            <img src="./resources${element.url}" class="card-img-top ourCardPhoto" alt="...">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-center text-start tagCard">
                            <p class="cardProj-title">${element.category}</p>
                            <h5 class="cardProj-text">${element.projects}</h5>
                        </div>
                    </div>`;
                    ourProjectsRow.appendChild(div);
                })
            }
            // function per modale
            function modalcreator(array) {
                array.forEach(element =>{
                    let div2 = document.createElement("div");
                    div2.classList.add("mySlides");
                    div2.innerHTML = `       
                    <div class="numbertext">image ${element.id} of ${array.length}</div>
                    <span class="close cursor" onclick="closeModal()">&times;</span>
                    <img src="./resources${element.url}" class="h-100 img-fluid" style="width:100%">     
                    `;
                    modal.appendChild(div2);
                })
            }

            // per mettere in ordine in base all'id ed essere uguale all'originale ^.^//
            let dataSort = data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            projectCardsCreator(dataSort);
            modalcreator(dataSort);
            proRow.style.opacity = 1;
            let ourProli = document.querySelectorAll(".ourProli")

            function filterCategory(categoria) {
                let filtered = dataSort.filter(element => element.category == categoria);
        
                projectCardsCreator(filtered);
                }
                ourProli.forEach(element=>{
                element.addEventListener("click",()=>{
                    let categorySelected = element.id
                    if (categorySelected == "all") {
                    projectCardsCreator(dataSort)
                    }else{
                    filterCategory(categorySelected)
                    }
                    ourProli.forEach(element=>{
                    element.classList.remove("active")
                    })
                    element.classList.add("active")
                    })
                })
            })
        }else{
        }
    })
})
observerProject.observe(ourProjObs);

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  } 
  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  let slideIndex = 1;
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  function showSlides(n) {
    let next = document.querySelector(".next")
    let prev = document.querySelector(".prev")
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n == slides.length){ 
    next.classList.remove("d-flex")
    next.classList.add("d-none")
    }else{
        next.classList.add("d-flex")
        next.classList.remove("d-none")
    }
    if (n == 1) {
        prev.classList.remove("d-flex")
        prev.classList.add("d-none")
    }else{
        prev.classList.remove("d-none")
        prev.classList.add("d-flex")
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";

  }

//   Our Team Section
let teamTitle = document.querySelector(".teamTitle");
let rowTeam = document.querySelector(".rowTeam");
let checkTeam = false
let observe2 = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        if(checkTeam == false && entry.isIntersecting){
            checkTeam = true
            fetch("/resources/staff.json")
            .then(response => response.json())
            .then(data =>{
            function teamCardCreator(data){
                let c = 0.3
                rowTeam.innerHTML = ``;
                data.forEach(element=>{
                    c = c + 0.3
                    let div = document.createElement("div")
                    div.classList.add("col-12","col-md-3");
                    div.innerHTML = `
                    <div class="card teamCard ourCard w-100" style="width: 16rem; animation-delay: ${c}s; opacity: 0;">
                        <div class="overflow-hidden position-relative">
                            <div class="position-absolute flex-column teamFloatIcons ourCardPhoto">
                            <a class="teamIcons" href="#">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a class="teamIcons" href="#">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                            <a class="teamIcons" href="#">
                                <i class="fa-brands fa-instagram"></i>
                            </a>    
                        </div>
                        <img src="./resources/${element.url}" class="card-img-top teamPhoto ourCardPhoto" alt="...">
                    </div> 
                    <div class="card-body text-center tagCard">
                        <h6 class="mb-0 mt-1 fs-5">${element.name}</h6>
                        <p class="card-text teamText mt-0">${element.designation}</p>
                    </div>
                    </div>
                    `;
                    rowTeam.appendChild(div);
                })
            }
            teamCardCreator(data);
  } ) }} )})
  observe2.observe(teamTitle);

// navbar
let backArrow = document.querySelector(".back-to-top")
let navbar = document.querySelector(".navbar");
window.addEventListener("scroll",() =>{
    let scrolled = window.scrollY;
    if(scrolled > 250){
        navbar.classList.add("sticky-top","carouselH1");
        backArrow.classList.remove("d-none");
    }else{
        navbar.classList.remove("sticky-top","carouselH1");
        backArrow.classList.add("d-none");
    }
})

// Swiper
let swiper = new Swiper(".mySwiper", {
    loop : true,
    runCallbacksOnInit: false,
    direction: `horizontal`,
    loopedSlides: 2,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 60,
    effect: 'coverflow',
    coverflowEffect: {
      scale: 0.7,
      rotate: 0,
      depth: 0,
      slideShadows: false,
    },
    breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40
        },
      },
    pagination: {
      el: ".swiper-pagination",
      type: "none",
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

// DarkMode

let darkButton = document.querySelector(".darkButton")
let isClicked = true

function dark() {
    isClicked = false
    document.documentElement.style.setProperty('--light', 'rgb(53,53,53)');
    document.documentElement.style.setProperty('--sec', 'rgb(45,45,45)');
    document.documentElement.style.setProperty('--acc', 'rgb(245, 245, 245)')
    darkButton.innerHTML=`
    <i class="fa-solid fa-sun iconInt2" style="color: #ffae00;"></i>
    `
}

function light() {
    isClicked = true
    document.documentElement.style.setProperty('--light', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--sec', 'rgb(245, 245, 245)');
    document.documentElement.style.setProperty('--acc', 'rgb(53,53,53)')
    darkButton.innerHTML=`
    <i class="fa-solid fa-moon iconInt2" style="color: #fff700;"></i>
    `
}

darkButton.addEventListener("click",()=>{
    if (isClicked) {
        dark();
        localStorage.setItem(`theme`,`dark`)
    } else {
        light(); 
        localStorage.setItem(`theme`,`light`)
    }   
})  
 
let theme = localStorage.getItem(`theme`)
if (theme == "dark") {
    dark()
} else {
    light()
}