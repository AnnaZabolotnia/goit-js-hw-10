import"./assets/styles-1ce26e8e.js";import{f as h,i as y}from"./assets/vendor-651d7991.js";let r;function e(t){return t.toString().padStart(2,"0")}function S(t){const o=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:o,hours:l,minutes:m,seconds:f}}const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){if(r=t[0],r<new Date){y.error({title:"Помилка",message:"Оберіть дату в майбутньому"}),a();return}M()}};h("#datetime-picker",b);const p=document.querySelector("[data-days]"),v=document.querySelector("[data-hours]"),q=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]"),s=document.querySelector("[data-start]");function D(){const t=new Date,n=r-t;if(n<=0){clearInterval(i);return}const{days:c,hours:u,minutes:d,seconds:o}=S(n);p.textContent=e(c),v.textContent=e(u),q.textContent=e(d),C.textContent=e(o)}let i;function E(){i=setInterval(D,1e3)}function M(){s.removeAttribute("disabled")}function a(){s.setAttribute("disabled","disabled")}s.addEventListener("click",()=>{E(),a()});a();
//# sourceMappingURL=commonHelpers.js.map
