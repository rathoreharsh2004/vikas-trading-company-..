const $=s=>document.querySelector(s);

const creations=Array.from({length:15},(_,i)=>`c${i+1}.jpeg`);
const gallery=Array.from({length:6},(_,i)=>`g${i+1}.jpeg`);
const track=$("#track");

creations.forEach((id,i)=>{
  const el=document.createElement("div");
  el.className="slide";
  el.innerHTML=`<div class="slide-img" style="background-image:url('${id}')"></div><div class="slide-name">PROJECT ${String(i+1).padStart(2,"0")}</div>`;
  track.appendChild(el);
});
gallery.forEach((id)=>{
  const el=document.createElement("div");
  el.className="g reveal";
  el.innerHTML=`<div style="background-image:url('${id}')"></div>`;
  $("#galleryGrid").appendChild(el);
});

let index=0,auto;
function show(n){
  const list=document.querySelectorAll(".slide");
  index=(n+list.length)%list.length;
  track.style.transform=`translateX(-${index*100}%)`;
  list.forEach((x,i)=>x.classList.toggle("active",i===index));
  $("#counter").textContent=String(index+1).padStart(2,"0");
  $("#slideTitle").textContent=`PROJECT ${String(index+1).padStart(2,"0")}`;
  $("#progress").style.width=`${((index+1)/15)*100}%`;
}
function restart(){
  clearInterval(auto);
  auto=setInterval(()=>show(index+1),5200);
}
$("#prev").onclick=()=>{show(index-1);restart()};
$("#next").onclick=()=>{show(index+1);restart()};
show(0);restart();

const productDescriptions=[
  "Distinctive design details selected to add a refined, luxurious character to your space.",
  "A statement piece for interiors that need texture, depth and visual identity.",
  "Elegant surfaces and details for contemporary residential and hospitality spaces.",
  "Design-forward products chosen to make everyday spaces feel more considered.",
  "Uncommon finishes for walls, ceilings, façades and feature areas.",
  "Premium-looking details that bring warmth, texture and personality to a room.",
  "Curated pieces for projects where ordinary choices simply will not do.",
  "A versatile selection of products to complete a polished, distinctive interior."
];

let productIndex=0;
const productTrack=$("#productTrack");
const productDots=$("#productDots");

for(let p=1;p<=8;p++){
  const slide=document.createElement("div");
  slide.className="product-slide";
  const img=`p${p}a.jpeg`;
  slide.innerHTML=`<div class="product-image" style="background-image:url('${img}')"></div>`;
  productTrack.appendChild(slide);
  const dot=document.createElement("button");
  dot.setAttribute("aria-label",`Product ${p}`);
  dot.onclick=()=>showProduct(p-1);
  productDots.appendChild(dot);
}

function showProduct(n){
  productIndex=(n+8)%8;
  productTrack.style.transform=`translateX(-${productIndex*100}%)`;
  $("#productIndex").textContent=`${String(productIndex+1).padStart(2,"0")} / 08`;
  $("#productTitle").textContent=`PRODUCT ${String(productIndex+1).padStart(2,"0")}`;
  $("#productDesc").textContent=productDescriptions[productIndex];
  [...productDots.children].forEach((d,i)=>d.classList.toggle("active",i===productIndex));
  
}
$("#productPrev").onclick=()=>showProduct(productIndex-1);
$("#productNext").onclick=()=>showProduct(productIndex+1);
showProduct(0);

document.querySelectorAll(".faq").forEach(x=>x.querySelector("button").onclick=()=>{
  document.querySelectorAll(".faq.open").forEach(y=>{if(y!==x)y.classList.remove("open")});
  x.classList.toggle("open");
});

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
document.querySelectorAll(".about-photo,.project-slider,.product-viewer,.g").forEach(x=>{
  x.classList.add("reveal-image");
  io.observe(x);
});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    if(matchMedia("(hover:hover)").matches){
      let r=el.getBoundingClientRect();
      el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
    }
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
});

$("#menu").onclick=()=>{
  document.querySelector(".header nav")?.scrollIntoView({behavior:"smooth",block:"center"});
};

let pct=0;
const load=setInterval(()=>{
  pct+=4;
  $("#loadNum").textContent=pct+"%";
  if(pct>=100){
    clearInterval(load);
    setTimeout(()=>$("#loader").classList.add("hide"),300);
  }
},35);
// Gentle image preloading keeps slide transitions smooth.
[...creations,...gallery,...Array.from({length:8},(_,i)=>`p${i+1}a.jpeg`),"about.jpeg","contact-bg.jpeg"].forEach(src=>{const im=new Image();im.src=src});
