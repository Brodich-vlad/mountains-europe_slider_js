// Меню бургер.
const navLogo = document.querySelector('.nav__logo-burger_parent');

const navListWrapper = document.querySelector('.nav__list-wrapper');

let flagOpen = false;

navLogo.addEventListener('click',()=>{

    if(flagOpen === false){
        navListWrapper.classList.add('show-nav__list');
        navLogo.classList.add('show-burger_parent');
        flagOpen = true;
    }
    else {
        navListWrapper.classList.remove('show-nav__list');
        navLogo.classList.remove('show-burger_parent');
        flagOpen = false;
    }
});

navListWrapper.addEventListener('click',()=>{
    if(flagOpen === true){
        navListWrapper.classList.remove('show-nav__list');
        navLogo.classList.remove('show-burger_parent');
        flagOpen = false;
    }
});

// Контент слайдера.
const dataItemsSlider = [
    {
    src:'./img/mountain_2.jpg',
    title:'Eiger',
    url:'https://uk.wikipedia.org/wiki/%D0%90%D0%B9%D0%B3%D0%B5%D1%80',
},
    {
    src:'./img/mountain_3.jpg',
    title:'Mönch',
    url:'https://en.wikipedia.org/wiki/M%C3%B6nch',
},
    {
    src:'./img/mountain_4.jpg',
    title:'Piz Bernina',
    url:'https://uk.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%BD%D1%96%D0%BD%D0%B0_(%D0%BF%D1%96%D0%BA)',
},
{
    src:'./img/mountain_ushba_5.jpg',
    title:'Ushba',
    url:'https://uk.wikipedia.org/wiki/%D0%A3%D1%88%D0%B1%D0%B0',
},
    {
    src:'./img/mount_tetnuld_6.jpg',
    title:'Tetnuld',
    url:'https://uk.wikipedia.org/wiki/%D0%A2%D0%B5%D1%82%D0%BD%D1%83%D0%BB%D1%8C%D0%B4',
},

{
    src:'./img/monte-rosa_7.jpg',
    title:'Monte Rosa',
    url:'https://uk.wikipedia.org/wiki/%D0%9C%D0%BE%D0%BD%D1%82%D0%B5-%D0%A0%D0%BE%D0%B7%D0%B0',
},
    {
    src:'./img/mont_blanc_8.jpg',
    title:'Mont-Blanc',
    url:'https://uk.wikipedia.org/wiki/%D0%9C%D0%BE%D0%BD%D0%B1%D0%BB%D0%B0%D0%BD',
},
    {
        src:'./img/taschhorn_9.jpg',
    title:'Taschhorn',
    url:'https://en.wikipedia.org/wiki/T%C3%A4schhorn',
},
{
    src:'./img/shkhara_10.jpg',
    title:'Shkhara',
    url:'https://uk.wikipedia.org/wiki/%D0%A8%D1%85%D0%B0%D1%80%D0%B0',
},
]

const mountainsList = document.querySelector('.mountains__list')

const mountainsControls = document.querySelector('.mountains__controls')

const mountainsControlsLeft = document.querySelector('.mountains__controls-left')

// Вивід контенту залежно від ширини екрану.
const scrWidth = window.screen.width;

let scrId = '';

if(scrWidth < 1024 && scrWidth > 870){
    scrId = 2;
}
else if(scrWidth < 870){
    scrId = 1;
}
else scrId = 3;



// Сортування контенту.
const mainItemsSlider = (data = [])=>{
    const items = [];
    let a = 0;
    data.forEach((el,i)=> {
      
      if(i === 0){
        items.push([creatItem (el)])
      }
      else 
        if(i % scrId === 0 && a < data.length/scrId-1){
            items.push([])
          a += 1;
          items[a].push(creatItem (el))
            
        }else {
            items[a].push(creatItem (el))
        }
     
    });
    return items
};
mainItemsSlider(dataItemsSlider)

// Функція створення карточок слайдера.
function creatItem ({src,title,url}){
    const div = `<a  href="${url}" target="_blank" class="mountains__list-item"><img src="${src}" alt="${title}" class="mountain__img"><h3 class="mountain__title">${title}</h3></a>`
    return div
}
// Функція виводу на сторінку карточок слайдера.
function showItems(){
    const arr = mainItemsSlider(dataItemsSlider).map((el,i)=>{
        if(i === 0){
            return `<li class="mountains__list-items-slider">${el}</li>`
        }
        else return `<li class="mountains__list-items-slider right">${el}</li>`
    })

    mountainsList.innerHTML = arr.join('')
}
showItems()

// Події перемикання відображення слайдера.
window.addEventListener('load',()=>{
    const [...sliders] = document.querySelectorAll('.mountains__list-items-slider')
    let caunt = 0;

    mountainsControls.addEventListener('click',()=>{
        if(caunt+1 < sliders.length){
            sliders[caunt].classList.add('left')
            sliders[caunt+1].classList.remove('right')
            caunt +=1;
            if(caunt+1 === sliders.length){
                mountainsControls.classList.add('hide')
            }
            else mountainsControls.classList.remove('hide')
            if(caunt === 0){
                mountainsControlsLeft.classList.add('hide')
            }
            else mountainsControlsLeft.classList.remove('hide')
        }
        else return
        
    })
    
    mountainsControlsLeft.addEventListener('click',()=>{
        if(caunt > 0){
            sliders[caunt-1].classList.remove('left')
            sliders[caunt].classList.add('right')
            caunt -=1;
            if(caunt+1 === sliders.length){
                mountainsControls.classList.add('hide')
            }
            else mountainsControls.classList.remove('hide')
            if(caunt === 0){
                mountainsControlsLeft.classList.add('hide')
            }
            else mountainsControlsLeft.classList.remove('hide')
        }
        else return
    })
})
