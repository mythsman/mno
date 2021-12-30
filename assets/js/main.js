function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

window.ready(function(){
  document.querySelector('.btn-mobile-menu').addEventListener('click',function(){
    document.querySelector('.navigation-wrapper').classList.toggle('visible');
    document.querySelector('.navigation-wrapper').classList.toggle('animated');
    document.querySelector('.navigation-wrapper').classList.toggle('fadeIn');

    let menu = document.querySelector('.btn-mobile-menu__icon');
    ['fa-list','fa-angle-up','animated','fadeIn'].forEach(function(className){
      menu.classList.toggle(className);
    })
  }, false);

});

document.querySelectorAll('a').forEach(link => {
  link.hostname !== location.hostname && link.setAttribute('target', '_blank');
});
