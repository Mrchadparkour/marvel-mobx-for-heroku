import { TimelineMax, TweenLite, TweenMax } from 'gsap';
import store from './MarvelStore';


  export const openAnimation = (DomEl) => {
    const openAni = new TimelineMax();
    if (store.first && store.searchInput.length < 1) {
      openAni.fromTo(".Centerpiece", 1, {width: 0}, {width: '75%'})
             .to(".Centerpiece", .5, {width: 0}, '+=.75')
             .to(".intialText", 0, {display: 'none'})
             .to(".nextText", 0, {display: 'inline'}, '-=.1')
             .to(".Centerpiece", 1, {width: '85%'})
             .to(".Centerpiece", .5, {width: 0}, '+=.75')
             .to(".Centerpiece", .5, {rotation: 90,transformOrigin:"left bottom"})
             .to(".Centerpiece", 0, {display: 'none'})
             .to(".Search", 0, {display: 'inline'})
             .to(".Search", 1, {width: '80vw'});
      setTimeout(() => { DomEl.focus() }, 5500);
      store.first = false;
    } else {
      openAni.set('.Centerpiece', {display: 'none'})
             .set('.Search', {display: 'inline', width: '80vw'})
             // eslint-disable-next-line
             .set('.AnimatedInput', {css:{'margin-top': 0, 'position': 'fixed', 'position': 'relative' }});
    }
  }
//end of openAnimation()

  export const comicShift = (name, id) => {
    store.getComics(id);
    store.changeSearch(name);
    store.characterRes = [];
    TweenLite.to(".AnimatedInput", .5, {css:{"margin-top": 0}});
    setTimeout(() => store.showComics = true, 1000);
  }

//end of comicShift
  export const comicSelector = () => {
    let i = 0;                                        // set variable for index
    let isDesc = false;                              //bool to control description display
    window.addEventListener('keydown', (e) => {
      let prev = i;                                 //varibale track the previously selected Dom el
      if (e.keyCode === 37) {
       e.preventDefault();
       i === 0 ? i = store.comicList.length - 1 : i--; //wanted to use a varaible here but the unchanging num gives inaccurate results
     }
      else if(e.keyCode === 39) {
        e.preventDefault();
       i === store.comicList.length - 1 ? i = 0 :i++;
     }
     else if (e.keyCode === 32) {
       e.preventDefault();
       if (isDesc) {
         isDesc = false;
         TweenMax.to('.comic' + i, .25, {'-webkit-filter': 'brightness(100%)'});
         TweenMax.set('.desc' + i, {display: 'none' });
       } else {
         isDesc = true;
         TweenMax.to('.comic' + i, .25, {'-webkit-filter':'brightness(20%)'});
         TweenMax.set('.desc' + i, {display: 'inline' });
       }
     }
      let slider = 30 - (20 * i)
      TweenLite.to(".comic" + prev, .25, {css: {scale: 1, 'margin-left': '2vw', 'margin-right': '2vw'}});
      TweenLite.to(".comic" + i, .25, {css:{scale: 1.5, 'margin-left': '10vw', 'margin-right': '10vw'}});
      TweenLite.to(".ComicDisplay", .25, {left: slider + 'vw'});
    });
    setTimeout(() => TweenLite.to(".comic" + i, .5, {css:{scale: 1.5, 'margin-left': '10vw', 'margin-right': '10vw'}}), 1500);

    //this is for initial animation on ComicDisplay, function waits a second for the divs to be loaded before is called
  }
