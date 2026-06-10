const CACHE_NAME = "ecotech-cache-v1";

const urlsToCache = [
"/",
"/index.html",
"/style.css",
"/app.js"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);

});

self.addEventListener('push', function(event) {

  const data = {
  title: 'EcoTech',
  body: 'Nova notificação recebida'
  };
  
  event.waitUntil(
  self.registration.showNotification(data.title,{
  body:data.body,
  icon:'/images/notification-icon.png'
  })
  );
  
  });

  function askNotificationPermission(){

    Notification.requestPermission()
    .then(permission => {
    
    if(permission === "granted"){
    console.log("Permissão concedida");
    }else{
    console.log("Permissão negada");
    }
    
    });
    
    }
    
    askNotificationPermission();