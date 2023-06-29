// navbar
let backArrow = document.querySelector(".back-to-top")
let navbar = document.querySelector(".navbar");
let cardDisplay = document.querySelector(".cardDisplay")
let spinnerContainer = document.querySelector(".spinner-container")

setTimeout(()=>{
    spinnerContainer.classList.add("d-none")
    cardDisplay.classList.remove("d-none")
}, 2000);



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

// Selettori Globali
fetch(`/resources/servizi.json`)
            .then(response => response.json())
            .then(data => {
           
                let accordionBody = document.querySelector(".accordion-body")
                let uniqueCategories = []
                let cardsContainer = document.querySelector(".projCardPage")

                function createRadioButton() {
                    data.forEach(element => {
                    if (!uniqueCategories.includes(element.category)) {
                        uniqueCategories.push(element.category)
                    }
                    });
                    uniqueCategories.forEach(element =>{
                    let div = document.createElement("div")
                    div.classList.add('form-check')
                    div.innerHTML=`
                        <input class="form-check-input" type="radio" name="category" id="${element}">
                        <label class="form-check-label" for="${element}">${element}</label>
                        `
                    accordionBody.appendChild(div)
                    })
                }
            createRadioButton();

            function createCards(array) {
                spinnerContainer.classList.remove("d-none")
                cardDisplay.classList.add("d-none")
                setTimeout(()=>{
                    spinnerContainer.classList.add("d-none")
                    cardDisplay.classList.remove("d-none")
                }, 1000);

                cardsContainer.innerHTML = '';
                array.forEach(element => {
                    let div = document.createElement('div');
                    div.classList.add('col-12', 'col-md-6', 'my-5');
                    div.innerHTML = `
                        <div class="card">
                            <div class="overflow-hidden position-relative">
                                <img src="../../resources/${element.url}" class="w-100">
                                <div class="tagCard rounded-top text-category position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${element.category}</div>
                            </div>
                            <div class="card-body card-background">
                            <p class="text-price">${element.price}&euro;</p>
                            <h5 class="subtitle">${element.name}</h5>
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(div);
                })
            }
        
            createCards(data);
        

        let radioButtons = document.querySelectorAll(`.form-check-input`);

        function filterByCategory(array) {

            let arrayFromNodeList = Array.from(radioButtons);
            let checkedCategory = arrayFromNodeList.find(element => element.checked == true);
    
            let categorySelected = checkedCategory.id ;
            if (categorySelected == 'All') {
                return array;
            } else { 
                let filtered = array.filter(project => project.category == categorySelected);
                return filtered;
            }
        }
        filterByCategory(data); 


           // Filtro per prezzo
        let inputRange = document.querySelector('#inputRange');
        let numberPrice = document.querySelector('#numberPrice');
    

        function setPriceMax() {
            let prices = data.map(servizio => Number(servizio.price));
    
            let maxPrice = Math.max(...prices);
            inputRange.max = maxPrice;
            inputRange.value = maxPrice;
            numberPrice.innerHTML = `${maxPrice}&euro;`
            
        }
    
        setPriceMax();
    
        function filterByPrice(array) {
            let filtered = array.filter(servizio => Number(servizio.price) <= Number(inputRange.value));
    
            return filtered;
        }

           // Filtro per PAROLA
        let wordInput = document.querySelector('#wordInput');

        function filterByWord(array) {
        let filtered = array.filter(servizio => servizio.name.toLowerCase().includes(wordInput.value.toLowerCase()));

        return filtered;
    }

    // Catturare il messaggio Alert
    let message = document.querySelector('#message');

    function globalFilter() {
        let resultFilteredByCategory = filterByCategory(data);
        let resultFilteredByPrice = filterByPrice(resultFilteredByCategory);
        let resultFilteredByWord = filterByWord(resultFilteredByPrice);

        // Se ci sono dei risultati
        if (resultFilteredByWord.length > 0) {
            message.classList.add('d-none');
        } else { 
            message.classList.remove('d-none');
        }

        createCards(resultFilteredByWord);

    }


        
        radioButtons.forEach(radioButton => {
            radioButton.addEventListener('click', () => {
                globalFilter();
            })
        })
        inputRange.addEventListener('input', () => {       
            numberPrice.innerHTML = `${inputRange.value}&euro;`;
            globalFilter();
        })

        wordInput.addEventListener('input', () => {

            setTimeout(() => {
                globalFilter();
            }, 1000);
    
        })

        let btnReset = document.querySelector('.btn-reset');

        btnReset.addEventListener('click', () => {;
            radioButtons[0].checked = true;
            setPriceMax();
            wordInput.value = '';
    
        
            globalFilter();
        })


})
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






