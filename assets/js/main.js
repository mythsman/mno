// Mock jQuery.ready
window.ready = (fn) => {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Util for iterate list
const forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

// Util for animate.css
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    let node = element; 
    if( typeof element !== 'object'){
      node = document.querySelector(element);
    }

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

// Auto add _blank for outer link
window.ready(()=>{
  document.querySelectorAll('a').forEach(link => {
    link.hostname !== location.hostname && link.setAttribute('target', '_blank');
  });
})

window.ready(()=>{

  // Handle mobile navigation
  document.querySelector('.btn-mobile-menu').addEventListener('click',()=>{
    if(document.querySelector('.navigation-wrapper').classList.contains('visible')){
      // hide navigation
      animateCSS('.navigation-wrapper','bounceOutUp').then((msg)=>{
        document.querySelector('.navigation-wrapper').classList.toggle('visible');
      });
      animateCSS('.btn-mobile-close__icon','fadeOut').then(msg=>{
        document.querySelector('.btn-mobile-close__icon').classList.toggle('hidden');
        document.querySelector('.btn-mobile-menu__icon').classList.toggle('hidden');
      });
    }else{
      // show navigation
      document.querySelector('.navigation-wrapper').classList.toggle('visible');
      animateCSS('.navigation-wrapper','bounceInDown');

      animateCSS('.btn-mobile-menu__icon','fadeOut').then(msg=>{
        document.querySelector('.btn-mobile-menu__icon').classList.toggle('hidden');
        document.querySelector('.btn-mobile-close__icon').classList.toggle('hidden');
      });
    }

  }, false);


  // Logo shake
  document.querySelector('.panel-cover__logo').addEventListener('mouseover',(event)=>{
    animateCSS(event.target,'rubberBand');
  })

  // Click btn shake
  let tab_btns = document.querySelectorAll('.cover-navigation--primary .navigation__item');
  forEach(tab_btns , (idx,element)=>{
    element.addEventListener('mouseover',(event)=>{
      animateCSS(event.target,'pulse');
    });
  });

  // Social btn shake
  let social_btns = document.querySelectorAll('.navigation--social .navigation__item');
  forEach(social_btns, (idx, element)=>{
    element.addEventListener('mouseover',(event)=>{
      animateCSS(event.target,'rubberBand');
    });
  });
});

