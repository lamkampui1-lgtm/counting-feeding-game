const MAX_COUNT=20;
let count=0;
const countEl=document.getElementById("count");
const dotsEl=document.getElementById("dots");
const messageEl=document.getElementById("message");
const feedButton=document.getElementById("feedButton");
const resetButton=document.getElementById("resetButton");
const celebration=document.getElementById("celebration");
const celebrationNumber=document.getElementById("celebrationNumber");
const celebrationText=document.getElementById("celebrationText");
const cantoneseNumbers=["零","一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];

function speakCantonese(number){
 if(!("speechSynthesis" in window))return;
 window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(cantoneseNumbers[number]);
 u.lang="zh-HK";u.rate=.78;u.pitch=1;u.volume=1;
 const voices=window.speechSynthesis.getVoices();
 const hk=voices.find(v=>/zh-HK|yue-HK|Cantonese|粵|廣東/i.test(v.lang+" "+v.name));
 if(hk)u.voice=hk;
 window.speechSynthesis.speak(u);
}
function renderDots(){
 dotsEl.replaceChildren();
 for(let i=0;i<count;i++){
  const dot=document.createElement("span");
  dot.className="dot";dot.setAttribute("aria-hidden","true");
  dotsEl.appendChild(dot);
 }
}
function updateScreen(){
 countEl.textContent=count;
 renderDots();
 if(count===0)messageEl.textContent="準備好未？按一下畫面開始！";
 else if(count<10)messageEl.textContent="再餵 "+(10-count)+" 粒，就到 10！";
 else if(count===10)messageEl.textContent="10！再按一下，繼續數 11。";
 else if(count<20)messageEl.textContent="繼續！下一個數字係 "+(count+1)+"。";
 else messageEl.textContent="完成！20 粒豆豆全部餵完！";
}
function showMilestone(){
 celebrationNumber.textContent=count;
 celebrationText.textContent=count===10?"好叻！數到 10！":"完成！20 粒豆豆！";
 celebration.classList.add("show");
 celebration.setAttribute("aria-hidden","false");
}
function hideCelebration(){celebration.classList.remove("show");celebration.setAttribute("aria-hidden","true")}
function feed(){
 if(count>=MAX_COUNT)return;
 count++;updateScreen();speakCantonese(count);
 if(count===10||count===MAX_COUNT)setTimeout(showMilestone,180);
}
feedButton.addEventListener("click",()=>{
 if(celebration.classList.contains("show")){
  hideCelebration();
  if(count<MAX_COUNT)feed();
  return;
 }
 feed();
});
resetButton.addEventListener("click",(event)=>{
 event.stopPropagation();count=0;hideCelebration();
 if(window.speechSynthesis)window.speechSynthesis.cancel();
 updateScreen();
});
celebration.addEventListener("click",()=>{
 hideCelebration();
 if(count===10)feed();
});
updateScreen();