
// document.addEventListener('DOMContentLoaded',function(){

//     document.querySelectorAll('[data-smooth-scroll]').forEach(anchor=>{

    
//         anchor.addEventListener('click',function(e){
//           e.preventDefault();
//           const targetId= anchor.getAttribute('href')
//           const targetElement= document.querySelector(targetId)

//           if(targetElement){
//             window.scrollTo({
//                 top:targetElement.offsetTop,
//                 behavior:'smooth'
//             })
//           }
//         })
//     })
// })

document.addEventListener('DOMContentLoaded',function(){

    document.querySelectorAll('[data-smooth-scroll]').forEach(anchor=>{

        anchor.addEventListener('click',function(e){
            e.preventDefault();

            const targetId= anchor.getAttribute('href');
            const targetElement= document.querySelector(targetId);

            if(targetElement){
                window.scrollTo({
                    top:targetElement.offsetTop,
                    behavior:'smooth'

                })
            }

        })
    })

    const observerOptions={
        root:null,
        rootMargin:'0px',
        threshold:0.1
    }

    const observerCallBack=(entries,observer)=>{

        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const element=entry.target;
                const animationType= element.getAttribute('data-animated');

                switch(animationType){
                    case 'fade-up':
                        element.classList.add('animated-fade-up')
                    case 'fade-in':
                        element.classList.add('animated-fade-in')    
                }
            }
            observer.unobserve(element)
        })
    }

    const observer= new IntersectionObserver(observerCallBack,observerOptions)

    document.querySelectorAll('[data-animated]').forEach(element=>{
        observer.observe(element)
    })

})