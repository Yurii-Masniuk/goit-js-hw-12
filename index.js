import{a as p,S as y,i as c}from"./assets/vendor-CaRFiM55.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="51729015-e356512e01098e6cfb5d1c735",g="https://pixabay.com/api/";function L(s){const r={key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return p.get(g,{params:r}).then(o=>o.data)}const u=document.querySelector(".gallery"),d=document.querySelector(".loader"),S=new y(".gallery a",{captionsData:"alt",captionDelay:250});function b(s){const r=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:n,comments:f,downloads:m})=>`
      <li>
        <a href="${i}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p>Likes: ${t}</p>
          <p>Views: ${n}</p>
          <p>Comments: ${f}</p>
          <p>Downloads: ${m}</p>
        </div>
      </li>
    `).join("");u.insertAdjacentHTML("beforeend",r),S.refresh()}function q(){u.innerHTML=""}function v(){d.classList.remove("hidden")}function l(){d.classList.add("hidden")}const a=document.querySelector(".form"),E=a.querySelector('input[name="search-text"]');a.addEventListener("submit",s=>{s.preventDefault();const r=E.value.trim();if(!r){c.error({title:"Error",message:"Please enter a search query!"});return}q(),v(),L(r).then(o=>{if(!o.hits.length){c.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}),a.reset();return}b(o.hits),setTimeout(l,100),a.reset()}).catch(o=>{c.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(o),l()})});
//# sourceMappingURL=index.js.map
