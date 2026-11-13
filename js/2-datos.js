/* 2. Datos: ciudades, chefs, menú del día, ofertas, ubicación y tiempo de llegada */
'use strict';

/* ---- ciudades y zonas (coordenadas aproximadas: al comensal solo se le muestra la zona, nunca una dirección) ---- */
const CITIES=[
  {id:'santa-marta',name:'Santa Marta, Magdalena',sub:'Chefs de la bahía y El Rodadero',color:'#456D1B',lat:11.2408,lon:-74.1990,
   zones:[['El Rodadero',11.2042,-74.2285],['Centro histórico',11.2408,-74.2110],['Gaira',11.1960,-74.2150],['Taganga',11.2665,-74.1930],['Bello Horizonte',11.2310,-74.1850],['Pozos Colorados',11.1850,-74.2330],['Mamatoco',11.2480,-74.1930],['El Prado',11.2330,-74.2020],['Pescaíto',11.2450,-74.2155],['Manzanares',11.2370,-74.1960],['Bavaria',11.2240,-74.1950],['Los Almendros',11.2290,-74.1900],['Irotama',11.1730,-74.2280],['Playa Salguero',11.1970,-74.2260],['Minca',11.1470,-74.1170]]}
];
const cityById=id=>CITIES.find(c=>c.id===id)||CITIES[0];
/* El servicio es solo en Santa Marta. Estas son las ciudades de la costa Caribe de Colombia de donde pueden venir los chefs. */
const ORIGENES=['Santa Marta','Ciénaga','Barranquilla','Cartagena','Riohacha','Valledupar','Sincelejo','Montería','San Andrés'];
const COUNTRIES=['Colombia','España','Estados Unidos','México','Panamá','Argentina','Chile','Perú','Otro'];

/* ---- menú de hoy (cámbialo aquí cuando quieras) ---- */
const TODAY={chefId:'s1',titulo:'Cena costeña de tres tiempos',entrada:'Mote de queso con bollo limpio',fuerte:'Arroz de coco con posta cartagenera y patacones',postre:'Dulce de coco con queso costeño',price:10,foto:'assets/platos/posta-2.jpg'};

/* ---- ofertas automáticas y códigos de promoción ---- */
const OFFERS=[
  {id:'primera',tag:'-10 %',pct:10,color:'#E35B1F',titulo:'10 % en tu primera reserva',desc:'Para comensales nuevos. Se aplica sola al pagar.'},
  {id:'semana',tag:'-15 %',pct:15,color:'#F39C12',titulo:'Entre semana, más barato',desc:'Para cenas de lunes a miércoles. Se aplica sola al pagar.'},
  {id:'grupo',tag:'6+',pct:0,color:'#456D1B',titulo:'Cena para grupos',desc:'Desde 6 comensales, el postre va por la casa (se avisa al chef).'}
];
const PROMOS=[
  {code:'SABOR20',pct:20,titulo:'20 % en tu primera reserva',desc:'Escribe el código al pagar.',solo:'primera'},
  {code:'NEQUI5',pct:5,titulo:'5 % pagando con Nequi',desc:'Válido solo si pagas con Nequi.',solo:'nequi'}
];

/* ---- chefs de ejemplo ---- */
/* precios en USD por persona; los de ejemplo se ajustan para que ningún plato pase de 12 US$ (≈ $48.000 COP) */
const _fit=p=>Math.min(12,Math.max(7,Math.round(p*0.25*2)/2));
function _chef(id,name,city,zone,dishes,price,years,cert,bio,rating,extra){
  price=_fit(price);
  const c=cityById(city), z=(c.zones.find(x=>x[0]===zone)||[zone,c.lat,c.lon]);
  const h=[...id].reduce((a,ch)=>a+ch.charCodeAt(0),0);
  return Object.assign({id,name,city,zone,origen:'Santa Marta',lat:z[1]+((h%7)-3)*0.0014,lon:z[2]+((h%5)-2)*0.0014,dishes,price,years,cert,
    bio,hours:{from:'10:00',to:'21:00'},foto:null,fotos:[],wa:'573000000000',seed:true,verified:true,
    reviews:[{n:'Carla R.',s:5,t:'Sentí que estaba en la costa otra vez.'},{n:'Daniel P.',s:rating>=4.8?5:4,t:'Excelente sazón y muy puntual.'}],rating,fav:rating>=4.9},extra||{});
}
const SEED_CHEFS=[
  _chef('s1','Yolanda Peña','santa-marta','El Rodadero',['Arroz de coco','Posta cartagenera','Patacones'],40,12,'SENA Gastronomía #1187','Vivo en Santa Marta y comparto la auténtica comida costeña colombiana. Cocino en vivo en tu casa: tú recibes la experiencia completa, desde los ingredientes hasta el postre.',4.9),
  _chef('s2','Luis Torres','santa-marta','Centro histórico',['Pescado frito','Mote de queso'],35,9,'Escuela Costeña de Cocina #342','Cocinero samario de cuarta generación. El pescado frito de mi abuela, en tu mesa.',4.8),
  _chef('s3','Carla Ramírez','santa-marta','Gaira',['Butifarra','Arepa de huevo'],32,6,'Instituto Culinario del Caribe #218','Me encanta mostrar la cocina de la calle caribeña con técnica de restaurante.',4.7),
  _chef('s4','Andrés Cabrales','santa-marta','Bello Horizonte',['Mariscos costeños','Tostones'],48,15,'Fundación Gastronómica Cartagena #090','Mariscos frescos del día, del mar a tu mesa.',5.0),
  _chef('s5','Sofía Mendoza','santa-marta','Pozos Colorados',['Sancocho de guandú','Patacones'],38,8,'SENA Gastronomía #2260','Sazón de fogón, con cariño y mucho coco.',4.8),
  _chef('s6','Miguel Reyes','santa-marta','Taganga',['Posta negra'],44,11,'Instituto Culinario del Caribe #501','Pescador y cocinero de Taganga. Producto fresco y recetas de mi familia.',4.9),
  _chef('s7','Elena Vargas','santa-marta','Mamatoco',['Arroz de camarones','Patacones'],42,10,'Escuela Costeña de Cocina #377','Arroces costeños, mi especialidad desde hace diez años.',5.0),
  _chef('s8','Ricardo Ospina','santa-marta','Centro histórico',['Mote de queso','Buñuelos'],36,7,'SENA Gastronomía #1904','Sopas, buñuelos y mucha conversación en la cocina.',4.9),
  _chef('s9','Daniela Castillo','santa-marta','El Rodadero',['Dulce de coco','Arepa de huevo'],34,5,'Instituto Culinario del Caribe #612','Repostería caribeña y desayunos costeños.',4.8),
  _chef('s10','Camila Herrera','santa-marta','Gaira',['Pescado frito','Tostones'],39,9,'Fundación Gastronómica Cartagena #144','Cocina de mar con técnica y alma costeña.',4.9),
  _chef('c1','Marilú Rondón','santa-marta','El Prado',['Arroz con coco','Posta cartagenera','Enyucado'],41,13,'Fundación Gastronómica Cartagena #031','Cocina cartagenera de Getsemaní, con recetas de mi madre.',4.9,{origen:'Cartagena'}),
  _chef('c2','Javier Delgado','santa-marta','Irotama',['Cazuela de mariscos','Patacones'],46,12,'Escuela Costeña de Cocina #120','Cazuela de mariscos para compartir.',4.8,{origen:'Cartagena'}),
  _chef('c3','Paula Guerrero','santa-marta','Manzanares',['Cayeye','Arepa de huevo'],33,6,'SENA Gastronomía #3011','Desayunos y cenas con sabor a Bolívar.',4.7,{origen:'Cartagena'}),
  _chef('b1','Esteban Salcedo','santa-marta','Bavaria',['Sancocho de pescado','Butifarra'],37,8,'Instituto Culinario del Caribe #404','Carnaval hecho comida: sabor barranquillero.',4.8,{origen:'Barranquilla'}),
  _chef('b2','Laura Pardo','santa-marta','Los Almendros',['Arroz de lisa','Queso costeño frito'],39,7,'SENA Gastronomía #2780','Arroz de lisa y cocina de la Arenosa.',4.7,{origen:'Barranquilla'}),
];

/* ---- fotos de los platos (carpeta assets/platos) ---- */
const P='assets/platos/';
const DISH_IMGS={
  patacones:[1,2,3,4,5,6].map(i=>P+'patacones-'+i+'.jpg'),
  pescado:[1,2,3,4].map(i=>P+'pescado-'+i+'.jpg'),
  arrozcoco:[1,2,3,4].map(i=>P+'arroz-coco-'+i+'.jpg'),
  camarones:[P+'arroz-camarones-2.jpg',P+'arroz-camarones-1.jpg'],
  cazuela:[P+'cazuela-1.jpg'], lisa:[P+'arroz-lisa-1.jpg'], cayeye:[P+'cayeye-1.jpg'], enyucado:[P+'enyucado-1.jpg'],
  sancochopescado:[P+'sancocho-pescado-1.jpg'], sancocho:[P+'sancocho-1.jpg'], quesofrito:[P+'queso-frito-1.jpg',P+'tostones-1.jpg'],
  posta:[1,2,3].map(i=>P+'posta-'+i+'.jpg'),
  mote:[1,2,3].map(i=>P+'mote-'+i+'.jpg'),
  arepa:[1,2,3].map(i=>P+'arepa-'+i+'.jpg'),
  tostones:[1,2].map(i=>P+'tostones-'+i+'.jpg'),
  postanegra:[1,2].map(i=>P+'posta-negra-'+i+'.jpg'),
  mariscos:[1,2].map(i=>P+'mariscos-'+i+'.jpg'),
  dulcecoco:[1,2].map(i=>P+'dulce-coco-'+i+'.jpg'),
  bunuelos:[1,2].map(i=>P+'bunuelos-'+i+'.jpg'),
  butifarra:[1,2].map(i=>P+'butifarra-'+i+'.jpg')
};
function dishKey(d){
  d=(d||'').toLowerCase();
  if(/patacon/.test(d)) return 'patacones';
  if(/queso coste\u00f1o frito/.test(d)) return 'quesofrito';
  if(/tostone/.test(d)) return 'tostones';
  if(/cazuela/.test(d)) return 'cazuela';
  if(/arroz de lisa/.test(d)) return 'lisa';
  if(/cayeye/.test(d)) return 'cayeye';
  if(/enyucado/.test(d)) return 'enyucado';
  if(/sancocho de pescado/.test(d)) return 'sancochopescado';
  if(/sancocho/.test(d)) return 'sancocho';
  if(/mote de queso/.test(d)) return 'mote';
  if(/arepa/.test(d)) return 'arepa';
  if(/posta negra/.test(d)) return 'postanegra';
  if(/mariscos/.test(d)) return 'mariscos';
  if(/dulce de coco/.test(d)) return 'dulcecoco';
  if(/bu\u00f1uelo/.test(d)) return 'bunuelos';
  if(/butifarra/.test(d)) return 'butifarra';
  if(/pescado frito/.test(d)) return 'pescado';
  if(/arroz (de|con) coco/.test(d)) return 'arrozcoco';
  if(/arroz de camarones/.test(d)) return 'camarones';
  if(/posta/.test(d)) return 'posta';
  return null;
}
const dishImg=d=>{const k=dishKey(d);return k?DISH_IMGS[k][0]:null;};
function dishFotos(dishes,seed){
  const h=[...seed].reduce((a,ch)=>a+ch.charCodeAt(0),0), lists=[];
  dishes.forEach(d=>{const k=dishKey(d);if(k&&!lists.some(l=>l.k===k)){const a=DISH_IMGS[k],o=h%a.length;lists.push({k,a:a.slice(o).concat(a.slice(0,o))});}});
  const out=[]; for(let r=0;r<6;r++) lists.forEach(l=>{if(l.a[r]&&out.length<6)out.push(l.a[r]);});
  return out;
}
SEED_CHEFS.forEach(c=>{c.fotos=dishFotos(c.dishes,c.id);});

/* chefs registrados en esta página (se guardan en el navegador) + reseñas nuevas */
const RESENAS_KEY='resenas';
function allChefs(){
  const mine=store.get('chefs',[]);
  const extra=store.get(RESENAS_KEY,[]);
  return SEED_CHEFS.concat(mine).map(c0=>{
    let c=c0;
    if(c0.city!=='santa-marta'){const zz=CITIES[0].zones.find(z=>z[0]===c0.zone)||CITIES[0].zones[0];c=Object.assign({},c0,{origen:c0.origen||'Costa Caribe',city:'santa-marta',zone:zz[0],lat:zz[1],lon:zz[2]});}
    const rs=(c.reviews||[]).concat(extra.filter(r=>r.chefId===c.id));
    const ex=extra.filter(r=>r.chefId===c.id);
    let avg;
    if(c.rating){const n=5;avg=(c.rating*n+ex.reduce((a,r)=>a+r.s,0))/(n+ex.length);}
    else avg=rs.length?rs.reduce((a,r)=>a+r.s,0)/rs.length:null;
    return Object.assign({},c,{allReviews:rs,avg:avg});
  });
}
const chefById=id=>allChefs().find(c=>c.id===id);
const chefByEmail=e=>allChefs().find(c=>c.email&&c.email===e);
function saveChef(chef){
  const a=store.get('chefs',[]);const i=a.findIndex(c=>c.id===chef.id);
  if(i<0)a.push(chef);else a[i]=chef;
  return store.set('chefs',a);
}
const ratingTxt=c=>c.avg?c.avg.toFixed(1).replace('.',','):'Nuevo';

/* ---- disponibilidad: horario del chef y reservas ya aceptadas o pendientes ---- */
function chefAvailable(c,fecha,hora){
  if(hora){ const m=mins(hora); if(m<mins(c.hours.from)||m>mins(c.hours.to)) return false; }
  if(fecha&&hora){
    const busy=Reservas.all().some(r=>r.chefId===c.id&&r.fecha===fecha&&r.hora===hora&&(r.estado==='pendiente'||r.estado==='aceptado'));
    if(busy) return false;
  }
  return true;
}

/* ---- ubicación del dispositivo y tiempo de llegada ---- */
const Geo={
  pos:null, on:store.get('geoOn',false), watch:null, denied:false, listeners:[],
  enabled(){return this.on;},
  setOn(v){this.on=v;store.set('geoOn',v);if(!v){this.stop();this.pos=null;this.emit();}else this.request();},
  request(){
    if(!navigator.geolocation){this.denied=true;this.emit();return;}
    navigator.geolocation.getCurrentPosition(p=>{this.denied=false;this.pos={lat:p.coords.latitude,lon:p.coords.longitude};this.emit();this.start();},
      ()=>{this.denied=true;this.on=false;store.set('geoOn',false);this.emit();toast('No pudimos usar tu ubicación. Calculamos desde el centro de la ciudad.');},{timeout:8000,maximumAge:60000});
  },
  start(){
    if(this.watch!=null||!navigator.geolocation) return;
    this.watch=navigator.geolocation.watchPosition(p=>{this.pos={lat:p.coords.latitude,lon:p.coords.longitude,acc:p.coords.accuracy};this.emit();},()=>{},{enableHighAccuracy:true,maximumAge:0,timeout:20000});
  },
  stop(){if(this.watch!=null&&navigator.geolocation){navigator.geolocation.clearWatch(this.watch);}this.watch=null;},
  emit(){this.listeners.forEach(f=>{try{f();}catch(e){}});},
  subscribe(f){this.listeners.push(f);return()=>{this.listeners=this.listeners.filter(x=>x!==f);};}
};
function haversine(a,b){
  const R=6371,rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon);
  const h=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
/* punto de referencia: tu ubicación si estás cerca de la ciudad elegida; si no, el centro de la ciudad */
function refPoint(cityId){
  const c=cityById(cityId)||CITIES[0], center={lat:c.lat,lon:c.lon};
  if(Geo.pos&&haversine(Geo.pos,center)<60) return {p:Geo.pos,real:true,city:c};
  return {p:center,real:false,city:c};
}
/* minutos aproximados: distancia por calle (×1,35) a 25 km/h + 3 min de margen */
/* Tiempo de llegada: SOLO existe cuando la persona activó su ubicación.
   Modelo para Santa Marta: distancia real en línea recta × 1,45 (calles, no vuelo de pájaro)
   a ~24 km/h promedio de ciudad (tráfico, semáforos, Troncal), + 17 min fijos (alistar, salir, parquear, ubicar la dirección).
   Así, el mismo barrio ≈ 20–28 min, entre barrios ≈ 30–40 min y los extremos (Taganga ↔ Rodadero) ≈ 45–55 min. */
function etaEstimate(chef,p){
  const km=haversine(p,{lat:chef.lat,lon:chef.lon})*1.45;
  let h=0; for(const ch of String(chef.id)) h=(h*31+ch.charCodeAt(0))%97; /* pequeña variación fija por chef */
  return Math.max(20,Math.round(km/24*60)+17+(h%6));
}
function etaMin(chef,ref){
  if(!ref||!ref.real) return null;
  return etaEstimate(chef,ref.p);
}
/* para ordenar cuando no hay ubicación: distancia al centro */
function etaKey(chef,ref){ const e=etaMin(chef,ref); return e!=null?e:haversine(ref.p,{lat:chef.lat,lon:chef.lon}); }
const etaChip=(min,txt)=>min==null?'':'<span class="eta" style="margin:6px 0">'+ICON_PIN+(txt||'Llega en ~')+min+' min</span>';

/* ---- búsqueda en curso (se conserva mientras dure la visita) ---- */
const Search={
  get(){return Object.assign({city:null,date:null,time:null,guests:null,allergies:false,notes:'',filters:{price:'all',rating:0,dish:'',avail:false,sort:'eta'}},sess.get('search',{}));},
  set(patch){const s=Object.assign(Search.get(),patch);sess.set('search',s);return s;}
};
