'use strict';
(() => {
 const $ = (s, root=document) => root.querySelector(s);
 const $$ = (s, root=document) => [...root.querySelectorAll(s)];
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const fine = window.matchMedia('(pointer: fine)');
 let userMotionEnabled = true;
 let motionContext = null;
 let playedIntro = false;
 const pointerResets = [];
 const motionEnabled = () => userMotionEnabled && !reduced.matches;
 const animate = callback => { if(motionEnabled() && window.gsap && motionContext) motionContext.add(callback); };
 const motionToggle = $('#motion-toggle');
 const menu = $('.menu-toggle'), nav = $('#mobile-nav');
 function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');nav.hidden=true;}
 menu.addEventListener('click',()=>{const opening=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'Закрыть меню':'Открыть меню');nav.hidden=!opening;});
 $$('.site-header a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('focusin',e=>{if(!nav.hidden&&!e.target.closest('.site-header'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){closeMenu();menu.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
 window.addEventListener('resize',()=>{if(innerWidth>850)closeMenu();},{passive:true});
 // A stable target plane: only decorative children respond to the pointer.
 $$('.reactive').forEach(section=>{
  let rect=null, raf=0, x=0, y=0;
  const apply=()=>{section.style.setProperty('--mx',x.toFixed(3));section.style.setProperty('--my',y.toFixed(3));raf=0;};
  section.addEventListener('pointerenter',()=>{rect=section.getBoundingClientRect();});
  section.addEventListener('pointermove',e=>{if(!motionEnabled()||!fine.matches)return;if(!rect)rect=section.getBoundingClientRect();x=Math.max(-1,Math.min(1,(e.clientX-rect.left)/rect.width*2-1));y=Math.max(-1,Math.min(1,(e.clientY-rect.top)/rect.height*2-1));if(!raf)raf=requestAnimationFrame(apply);},{passive:true});
  section.addEventListener('pointerleave',()=>{x=y=0;if(!raf)raf=requestAnimationFrame(apply);});
  section.addEventListener('focusin',()=>{if(motionEnabled()){section.style.setProperty('--mx','.22');section.style.setProperty('--my','-.15');}});
  section.addEventListener('focusout',e=>{if(!section.contains(e.relatedTarget)){section.style.setProperty('--mx','0');section.style.setProperty('--my','0');}});
  window.addEventListener('scroll',()=>{rect=null;},{passive:true});
  window.addEventListener('resize',()=>{rect=null;},{passive:true});
  pointerResets.push(()=>{if(raf)cancelAnimationFrame(raf);raf=0;x=y=0;rect=null;section.style.setProperty('--mx','0');section.style.setProperty('--my','0');});
 });
 const palette=['#fff5e8','#8f1539','#d9e57e','#f2df86'];
 const sugar=$('.hero-sugar');
 for(let i=0;i<17;i++){const bit=document.createElement('i');bit.className='sugar-bit';bit.style.cssText=`--sx:${6+(i*37)%87}%;--sy:${7+(i*23)%87}%;--sr:${i*53}deg;--sc:${palette[i%4]};--sd:${12+i%5*8}px`;sugar.append(bit);}
 const giftLid=document.createElement('div');giftLid.className='gift-lid';$('.gift-box').append(giftLid);
 const moods={bright:{caption:'Мармеладное настроение',title:'Чуть кисло.<br>Очень весело.',copy:'Фруктовые формы, сочные цвета и тот самый первый кусочек.',icons:['ring','bear','citrus']},soft:{caption:'Воздушное настроение',title:'Нежность<br>в каждом кусочке.',copy:'Пастельные облачка и мягкая сладость для спокойного момента.',icons:['cloud','berry','cloud']},chocolate:{caption:'Шоколадное настроение',title:'Когда нужен<br>шоколад.',copy:'Глубокие оттенки какао и маленький ритуал удовольствия.',icons:['choc','choc','berry']}};
 $$('.flavor-tab').forEach(tab=>tab.addEventListener('click',()=>{
  if(tab.getAttribute('aria-pressed')==='true')return;
  $$('.flavor-tab').forEach(b=>{b.classList.toggle('active',b===tab);b.setAttribute('aria-pressed',String(b===tab));});
  const key=tab.dataset.flavor,m=moods[key];$('.flavor-stage').dataset.mood=key;$('.flavor-caption').textContent=m.caption;$('#flavor-title').innerHTML=m.title;$('#flavor-copy').textContent=m.copy;
  $$('.flavor-art use').forEach((el,i)=>el.setAttribute('href','#c-'+m.icons[i]));
  animate(()=>gsap.fromTo('.flavor-art>svg use',{scale:.75,rotation:-18},{scale:1,rotation:0,duration:.65,ease:'back.out(1.8)',stagger:.07,overwrite:'auto'}));
 }));
 const candyNames={ring:'ягодное кольцо',bear:'мармеладный мишка',choc:'шоколадный кубик',cloud:'нежный маршмеллоу',berry:'клубничная радость',citrus:'цитрусовая долька'};
 const box=[];const slots=$('.box-slots');let confettiTimer=0;
 const boxDecoration=document.createElement('div');boxDecoration.className='box-decoration';boxDecoration.setAttribute('aria-hidden','true');$('.builder-box').prepend(boxDecoration);
 function clearConfetti(){clearTimeout(confettiTimer);confettiTimer=0;$$('.sprinkle').forEach(el=>{if(window.gsap)gsap.killTweensOf(el);el.remove();});}
 function celebrate(){
  clearConfetti();if(!motionEnabled()||!window.gsap)return;
  for(let i=0;i<24;i++){const bit=document.createElement('i');bit.className='sprinkle';bit.style.cssText=`--left:${10+i*3.3}%;--color:${palette[i%4]}`;$('.builder-box').append(bit);animate(()=>gsap.fromTo(bit,{y:0,x:0,opacity:1,rotation:0},{y:-100-i%5*24,x:(i-12)*9,rotation:i*31,opacity:0,duration:1.2+i%4*.12,ease:'power2.out'}));}
  confettiTimer=setTimeout(clearConfetti,2200);
 }
 function renderBox(animateIndex=-1){
  slots.replaceChildren();
  for(let i=0;i<6;i++){
   if(box[i]){const b=document.createElement('button');b.type='button';b.className='box-slot filled';b.setAttribute('aria-label',`Убрать: ${candyNames[box[i]]}, место ${i+1}`);b.dataset.slot=String(i);b.innerHTML=`<svg aria-hidden="true"><use href="#c-${box[i]}"/></svg>`;b.addEventListener('click',()=>{box.splice(i,1);renderBox();const next=$('.box-slot.filled')||$('.candy-picker button');next.focus({preventScroll:true});});slots.append(b);}
   else{const empty=document.createElement('div');empty.className='box-slot';empty.setAttribute('role','img');empty.setAttribute('aria-label',`Место ${i+1} свободно`);empty.innerHTML=`<span class="slot-number" aria-hidden="true">${i+1}</span>`;slots.append(empty);}
  }
  $('#box-count').textContent=`${box.length} из 6`;
  $('.builder-box').classList.toggle('is-complete',box.length===6);
  if(!box.length){$('#box-title').textContent='Начнём с любимого.';$('#box-message').textContent='Выберите первую сладость на полке.';}
  else if(box.length<6){$('#box-title').textContent='Уже получается красиво.';$('#box-message').textContent=`Осталось ${6-box.length} ${6-box.length===1?'место':6-box.length<5?'места':'мест'}. Повторить любимый вкус? Отличная идея.`;}
  else{const unique=new Set(box).size;$('#box-title').textContent=unique>=5?'Коллекция ярких впечатлений.':unique<=2?'Верность любимому вкусу.':'Твой идеальный сладкий микс.';$('#box-message').textContent='Коробка собрана! Можно убрать любую сладость или придумать новый набор.';}
  if(animateIndex>=0)animate(()=>gsap.fromTo(slots.children[animateIndex].querySelector('svg'),{scale:.2,rotation:-60},{scale:1,rotation:0,duration:.5,ease:'back.out(2)',overwrite:'auto'}));
 }
 $$('.candy-picker button').forEach(button=>button.addEventListener('click',()=>{if(box.length===6){$('#box-message').textContent='Все 6 мест заняты. Уберите сладость из коробки или нажмите «Собрать заново».';return;}box.push(button.dataset.candy);renderBox(box.length-1);if(box.length===6)celebrate();}));
 $('.reset-box').addEventListener('click',()=>{box.length=0;clearConfetti();renderBox();$('.candy-picker button').focus({preventScroll:true});});
 renderBox();
 const form=$('#contact-form'),success=$('#form-success'),name=$('#customer-name'),phone=$('#customer-phone');
 function error(input,message){input.setAttribute('aria-invalid',String(Boolean(message)));$('#'+input.getAttribute('aria-describedby')).textContent=message;}
 form.addEventListener('submit',e=>{e.preventDefault();const digits=phone.value.replace(/\D/g,'');const nameOK=(name.value.match(/\p{L}/gu)||[]).length>=2;const phoneOK=/^\+?[\d\s()\-]+$/.test(phone.value.trim())&&/^[78]\d{10}$/.test(digits);error(name,nameOK?'':'Введите имя: не менее двух букв.');error(phone,phoneOK?'':'Введите 11 цифр российского номера, начиная с +7 или 8.');if(!nameOK){name.focus();return;}if(!phoneOK){phone.focus();return;}form.reset();form.hidden=true;success.hidden=false;success.focus({preventScroll:true});});
 $('.form-submit',form).disabled=false; // Enable only after the non-network submit handler exists.
 [name,phone].forEach(input=>input.addEventListener('input',()=>{if(input.getAttribute('aria-invalid')==='true')error(input,'');}));
 $('#form-reset').addEventListener('click',()=>{success.hidden=true;form.hidden=false;form.reset();error(name,'');error(phone,'');name.focus({preventScroll:true});});
 // Scroll-driven object choreography. Native scrolling, no pinning or text hiding.
 function startMotion(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  motionContext=gsap.context(()=>{
   if(!playedIntro)gsap.from('.hero-prop',{y:90,scale:.65,rotation:(i)=>i%2?20:-20,duration:1.3,ease:'back.out(1.1)',stagger:.08});
   playedIntro=true;
   gsap.to('.hero-art',{y:-70,rotation:-5,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.to('.ribbon',{xPercent:-15,ease:'none',scrollTrigger:{trigger:'.ribbon-wrap',start:'top bottom',end:'bottom top',scrub:1}});
   gsap.fromTo('.flavor-art>svg',{x:(i)=>[0,110,-110][i],y:(i)=>[45,-20,55][i],rotation:(i)=>[20,-25,25][i]},{x:0,y:0,rotation:0,ease:'none',scrollTrigger:{trigger:'.flavor-layout',start:'top bottom',end:'top 30%',scrub:1}});
   const gift=gsap.timeline({scrollTrigger:{trigger:'.gift-section',start:'top bottom',end:'center 45%',scrub:1}});
   gift.fromTo('.candy-a',{x:-110,y:-70,rotation:-55},{x:0,y:0,rotation:-8,ease:'none'},0).fromTo('.candy-b',{x:120,y:-110,rotation:60},{x:0,y:0,rotation:10,ease:'none'},0).fromTo('.candy-c',{y:-130,rotation:-35},{y:0,rotation:8,ease:'none'},0).fromTo('.gift-box',{y:90,rotation:12},{y:0,rotation:-8,ease:'none'},0).fromTo('.gift-lid',{y:0,rotation:0},{y:-220,rotation:-22,ease:'none'},0).fromTo('.gift-word',{scale:.7,rotation:-18},{scale:1,rotation:-10,ease:'none'},0);
   $$('.occasion-cards article').forEach((card,i)=>{gsap.fromTo($('.occasion-art',card),{y:65,rotation:(i-1)*28,scale:.75},{y:0,rotation:0,scale:1,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'center 65%',scrub:.8}});});
   gsap.fromTo('.box-decoration',{rotation:16,x:65},{rotation:-12,x:-25,ease:'none',scrollTrigger:{trigger:'.play-section',start:'top bottom',end:'center center',scrub:1}});
   gsap.fromTo('.faq-candy',{rotation:-40,y:60},{rotation:30,y:-15,ease:'none',scrollTrigger:{trigger:'.faq-section',start:'top bottom',end:'bottom top',scrub:1}});
   gsap.fromTo('.contact-candy',{scale:.6,rotation:-50},{scale:1.1,rotation:25,ease:'none',scrollTrigger:{trigger:'.contact-section',start:'top bottom',end:'center 50%',scrub:1}});
  });
  ScrollTrigger.refresh();
 }
 function applyMotionPreference(){
  const enabled=motionEnabled();
  document.documentElement.classList.toggle('motion-paused',!enabled);
  motionToggle.textContent=enabled?'Анимация: вкл.':'Анимация: выкл.';
  motionToggle.setAttribute('aria-pressed',String(enabled));
  motionToggle.disabled=reduced.matches;
  $('#motion-hint').textContent=reduced.matches?'Движение отключено настройкой вашего устройства.':enabled?'Можно остановить движение на всей странице.':'Движение остановлено. Игра и форма продолжают работать.';
  clearConfetti();
  pointerResets.forEach(reset=>reset());
  if(motionContext){motionContext.revert();motionContext=null;}
  if(enabled)startMotion();
 }
 motionToggle.addEventListener('click',()=>{userMotionEnabled=!userMotionEnabled;applyMotionPreference();});
 reduced.addEventListener('change',applyMotionPreference);
 fine.addEventListener('change',()=>pointerResets.forEach(reset=>reset()));
 applyMotionPreference();
 const refreshLayout=()=>{if(motionEnabled()&&window.ScrollTrigger)ScrollTrigger.refresh();};
 document.fonts.ready.then(refreshLayout);
 window.addEventListener('load',refreshLayout,{once:true});
 $$('.faq-list details').forEach(detail=>detail.addEventListener('toggle',refreshLayout));
 window.addEventListener('pageshow',e=>{if(e.persisted)applyMotionPreference();});
 window.addEventListener('pagehide',()=>{clearConfetti();pointerResets.forEach(reset=>reset());if(motionContext){motionContext.revert();motionContext=null;}});
})();
