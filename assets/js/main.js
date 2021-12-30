function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

window.ready(function(){
  document.querySelector('.btn-mobile-menu').addEventListener('click',function(){
    if(document.querySelector('.navigation-wrapper').classList.contains('visible')){
      animateCSS('.navigation-wrapper','fadeOutUp').then((msg)=>{
        document.querySelector('.navigation-wrapper').classList.toggle('visible');
      });
      document.querySelector('.btn-mobile-menu__icon').classList.toggle('fa-angle-up');
      document.querySelector('.btn-mobile-menu__icon').classList.toggle('fa-list');
      animateCSS('.btn-mobile-menu__icon','fadeIn');
    }else{
      document.querySelector('.navigation-wrapper').classList.toggle('visible');
      animateCSS('.navigation-wrapper','fadeInDown');
      document.querySelector('.btn-mobile-menu__icon').classList.toggle('fa-angle-up');
      document.querySelector('.btn-mobile-menu__icon').classList.toggle('fa-list');
      animateCSS('.btn-mobile-menu__icon','fadeOut');
    }



  }, false);

});

document.querySelectorAll('a').forEach(link => {
  link.hostname !== location.hostname && link.setAttribute('target', '_blank');
});
