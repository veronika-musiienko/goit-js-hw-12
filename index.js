import{S as w,a as b,i}from"./assets/vendor-B3Lscd_h.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const p=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more"),S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){const t=o.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="info">
          <div class="info-item">
            <p class="label">Likes</p>
            <p class="value">${r.likes}</p>
          </div>
          <div class="info-item">
            <p class="label">Views</p>
            <p class="value">${r.views}</p>
          </div>
          <div class="info-item">
            <p class="label">Comments</p>
            <p class="value">${r.comments}</p>
          </div>
          <div class="info-item">
            <p class="label">Downloads</p>
            <p class="value">${r.downloads}</p>
          </div>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),S.refresh()}function q(){p.innerHTML=""}function y(){f.classList.remove("hidden")}function g(){f.classList.add("hidden")}function R(){m.classList.remove("hidden")}function v(){m.classList.add("hidden")}const E="50363582-3c1b565cf4c5725a0a7e76bfc",P="https://pixabay.com/api/",B=15;async function L(o,t=1){return(await b.get(P,{params:{key:E,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:B}})).data}const c=document.querySelector(".form"),$=c.querySelector('input[type="text"]'),M=document.querySelector(".load-more");let a="",n=1,d=0;c.addEventListener("submit",async o=>{if(o.preventDefault(),a=$.value.trim(),a===""){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}n=1,q(),v(),y();try{const{hits:t,totalHits:r}=await L(a,n);if(d=r,t.length===0){i.info({title:"No Results",message:"Sorry, there are no images matching your search query.",position:"topRight"});return}h(t),t.length<d&&R()}catch(t){i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(t)}finally{g()}c.reset()});M.addEventListener("click",async()=>{n+=1,y();try{const{hits:o}=await L(a,n);h(o),O(),n*15>=d&&(v(),i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(o){i.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"}),console.error(o)}finally{g()}});function O(){const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
