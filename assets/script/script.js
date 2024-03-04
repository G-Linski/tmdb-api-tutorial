
'using strict';

const body = document.querySelector('body');

//System
const operatingSys = document.querySelector('.operating-system');
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');
//Window
const pageW = document.querySelector('.pageW');
const pageH = document.querySelector('.pageH');
const pageO = document.querySelector('.pageO');
//Battery
const batteryL = document.querySelector('.batteryL');
const batteryS = document.querySelector('.batteryS');
//Online
const boxOnline = document.querySelector('.box-online');
const onlineText = document.querySelector('.online');

//Find os
function osType(str){
  if (str.indexOf('Win') != -1){
    return 'Windows';
  }
  else if (str.indexOf('Mac') != -1){
    return 'Mac/iOS';
  }
  else if (str.indexOf('X11') != -1){
    return 'Unix';
  }
  else if (str.indexOf('Linux') != -1){
    return 'Linux';
  }
  return 'Unknown';
}

//Find Browser
function browserType(str){
  if (str.indexOf('Edg/') != -1){
    return 'Edge';
  }
  else if (str.indexOf('Firefox/') !=-1){
    return 'Firefox';
  }
  else if (str.indexOf('OPR/') !=-1){
    return 'Opera';
  }
  else if (str.indexOf('Chrome/') !=-1){
    return 'Chrome';
  }
  else if (str.indexOf('Safari/') !=-1){
    return 'Safari';
  }
  return 'Unknown';
}

//Display System Content
const systemContent= () =>{
  
  //System
  language.innerText = navigator.language;
  browser.innerText = browserType(navigator.userAgent);
  operatingSys.innerText = osType(navigator.userAgent);

  //Load Other Content
  windowContent();
  batteryContent();
  onlineContent();
}

//Display Window Content
const windowContent= () =>{
  pageW.innerText = `${window.innerWidth}px`
  pageH.innerText = `${window.innerHeight}px`
  let scrOrient = screen.orientation.type;
  if (scrOrient === 'landscape-primary'|| scrOrient ==='landscape-secondary'){
    pageO.innerText = 'Landscape Mode';
  }
  else if (scrOrient === 'portrait-primary'||scrOrient === 'portrait-secondary'){
    pageO.innerText = 'Portrait Mode';
  }
  
  //Safari Compatiblity
  if(browserType(navigator.userAgent) === 'Safari'){
    if(window.innerWidth > window.innerHeight){
      pageO.innerText = 'LandScape Mode';
    }
    else if(window.innerWidth < window.innerHeight){
      pageO.innerText = 'Portrait Mode';
    }
  }
}

//Display Battery Content
const batteryContent= () =>{
  //let brow = browserType(navigator.userAgent);
  if (navigator.getBattery){
    navigator.getBattery().then(function(battery) 
    {
          let batteryLevel = battery.level * 100;
          batteryL.innerText = `${batteryLevel}%`;
          if(battery.charging){
            batteryS.innerText = 'Charging';
          }
          else{
            batteryS.innerText = 'Idle';
          }
      });
  }
  else{
    batteryL.innerText = 'Unknown';
    batteryS.innerText = 'Unknown';
  }
}

//Display Online Content
const onlineContent= () =>{
  if (navigator.onLine){
    onlineText.innerText = 'ONLINE';
    boxOnline.style.backgroundColor = '#1ca63e';
    boxOnline.style.borderColor = '#1ca63e';
  }
  else{
    onlineText.innerText = 'OFFLINE';
    boxOnline.style.backgroundColor = '#ee1e1e';
    boxOnline.style.borderColor = '#ee1e1e';
  } 
}

//Events
window.addEventListener('load', systemContent);
window.addEventListener('resize', windowContent);
window.addEventListener('chargingchange', batteryContent);
window.addEventListener('offline', onlineContent);
window.addEventListener('online', onlineContent);