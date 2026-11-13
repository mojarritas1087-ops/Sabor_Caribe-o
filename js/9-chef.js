/* 9. Panel del chef (editar perfil) y reservas */
'use strict';

let _ed=null;
function renderMiPerfil(){
  if(!requireLogin('/mi-perfil','chef')) return;
  const u=Session.user(); const c=chefByEmail(u.email);
  if(!c){$('#app').innerHTML='<div class="wrap sec"><div class="empty"><b>Tu cuenta de chef no tiene perfil.</b><p><a href="#/registro-chef">Crea tu perfil</a></p></div></div>';return;}
  if(c.seed){$('#app').innerHTML='<div class="wrap sec"><div class="empty"><b>Este perfil es de ejemplo.</b></div></div>';return;}
  if(!_ed||_ed.id!==c.id) _ed=JSON.parse(JSON.stringify(store.get('chefs',[]).find(x=>x.id===c.id)));
  drawEditor();
}
function drawEditor(){
  const c=_ed, city=cityById(c.city);
  $('#app').innerHTML='<div class="wrap" style="padding-top:26px"><h1 style="font-size:34px;margin:0">Editar mi perfil</h1><p class="muted">Los cambios se ven en tu perfil público al guardar.</p></div>'+
  '<div class="ed"><div class="l">'+
   '<div class="panel"><h2>Datos básicos</h2><div style="display:flex;align-items:center;gap:16px;margin-bottom:14px">'+avatar(c.foto,72,'Tu foto')+'<label class="ghostbtn sm" style="cursor:pointer">Cambiar foto de perfil<input type="file" accept="image/*" data-file="editperfil" style="display:none"></label></div>'+
   '<label class="field"><span>Nombre</span><input id="e-nom" maxlength="60" value="'+esc(c.name)+'"></label>'+
   '<div class="row"><label class="field"><span>Ciudad de origen (costa Caribe)</span><select id="e-or">'+ORIGENES.map(o=>'<option'+(o===c.origen?' selected':'')+'>'+esc(o)+'</option>').join('')+'</select></label><label class="field"><span>Zona de Santa Marta donde atiendes</span><select id="e-zone">'+zoneOpts(city,c.zone)+'</select></label></div>'+
   '<label class="field"><span>Tu información</span><textarea id="e-bio" maxlength="400">'+esc(c.bio||'')+'</textarea></label></div>'+
   '<div class="panel"><h2>Tu cocina</h2><label class="field"><span>Platos (separados por coma)</span><input id="e-dishes" value="'+esc(c.dishes.join(', '))+'"></label>'+
   '<div class="row"><label class="field"><span>Precio por persona (USD)</span><input id="e-price" type="number" min="5" max="12" step="0.5" value="'+c.price+'"></label><label class="field"><span>Años de experiencia</span><input id="e-years" type="number" min="0" max="60" value="'+c.years+'"></label></div>'+
   '<div class="row"><label class="field"><span>Atiendes desde</span><select id="e-h1">'+HOURS.map(h=>'<option value="'+h+'"'+(h===c.hours.from?' selected':'')+'>'+fmtHour(h)+'</option>').join('')+'</select></label><label class="field"><span>Hasta</span><select id="e-h2">'+HOURS.map(h=>'<option value="'+h+'"'+(h===c.hours.to?' selected':'')+'>'+fmtHour(h)+'</option>').join('')+'</select></label></div>'+
   '<label class="field"><span>WhatsApp (con indicativo, solo números)</span><input id="e-wa" inputmode="numeric" value="'+esc(c.wa||'')+'"></label></div>'+
   '<div class="panel"><h2>Fotos de tus platos</h2>'+photoGrid(c.fotos||[],'edit',8)+'<div class="hint">Mínimo 3 fotos.</div></div>'+
   '<div class="panel"><h2>Verificación</h2><span class="badge soft">'+(c.verified?'✓ Perfil verificado':'En revisión por el equipo')+'</span> <span class="badge soft">Certificación: '+esc(c.cert||'—')+'</span></div>'+
   '<div id="merr" class="err" role="alert"></div><button class="btn" data-act="guardarperfil">Guardar cambios</button> <a class="ghostbtn" href="#/chef/'+c.id+'">Ver mi perfil público</a></div>'+
  '<div class="r"><div class="prev"><div class="im" style="background-image:'+bgOf(c.fotos&&c.fotos[0],0)+'"></div><div class="bd"><div style="display:flex;gap:12px;align-items:center">'+avatar(c.foto,48,c.name)+'<div><b id="pv-n">'+esc(c.name)+'</b><div class="muted" id="pv-z" style="font-size:14px">'+esc(c.zone)+', '+esc(city.name.split(',')[0])+'</div></div></div><p class="muted" id="pv-d" style="margin:10px 0 6px">'+esc(c.dishes.join(' · '))+'</p><b id="pv-p">'+money(c.price)+'</b> <span class="muted">por persona</span></div></div></div></div>';
  const live=()=>{
    _ed.name=$('#e-nom').value; _ed.bio=$('#e-bio').value; _ed.dishes=$('#e-dishes').value.split(',').map(s=>s.trim()).filter(Boolean);
    $('#pv-n').textContent=_ed.name; $('#pv-d').textContent=_ed.dishes.join(' · '); const p=+$('#e-price').value; if(p) $('#pv-p').textContent=money(p);
  };
  ['e-nom','e-bio','e-dishes','e-price'].forEach(i=>$('#'+i).addEventListener('input',live));
  $('#e-or').addEventListener('change',()=>{_ed.origen=$('#e-or').value;});
  $('#e-zone').addEventListener('change',()=>{_ed.zone=$('#e-zone').value;$('#pv-z').textContent=_ed.zone+', '+cityById(_ed.city).name.split(',')[0];});
}
const zoneOpts=(city,sel)=>city.zones.map(z=>'<option'+(z[0]===sel?' selected':'')+'>'+esc(z[0])+'</option>').join('');
async function editAddPhotos(files){
  _ed.fotos=_ed.fotos||[]; keepEdits();
  try{for(const f of files){if(_ed.fotos.length<8)_ed.fotos.push(await readImage(f,720));}}catch(e){toast(e.message);}
  drawEditor();
}
async function editSetProfile(f){keepEdits();try{_ed.foto=await readImage(f,400);}catch(e){toast(e.message);}drawEditor();}
function keepEdits(){
  const v=id=>$('#'+id)&&$('#'+id).value;
  if(v('e-nom')!=null){_ed.name=v('e-nom');_ed.bio=v('e-bio');_ed.dishes=v('e-dishes').split(',').map(s=>s.trim()).filter(Boolean);_ed.price=+v('e-price')||_ed.price;_ed.years=v('e-years');_ed.hours={from:v('e-h1'),to:v('e-h2')};_ed.wa=v('e-wa');_ed.zone=v('e-zone');_ed.origen=v('e-or')||_ed.origen;_ed.city='santa-marta';}
}
ACT.editdel=el=>{keepEdits();_ed.fotos.splice(+el.dataset.i,1);drawEditor();};
ACT.guardarperfil=()=>{
  keepEdits(); const e=$('#merr'), c=_ed;
  if(c.name.trim().length<3) return e.textContent='Escribe tu nombre.';
  if((c.bio||'').trim().length<20) return e.textContent='Cuenta un poco más sobre ti.';
  if(!c.dishes.length) return e.textContent='Agrega al menos un plato.';
  if(!(c.price>=5&&c.price<=12)) return e.textContent='El precio debe estar entre US$5 y US$12 (máximo $48.000 COP).';
  if(mins(c.hours.to)<=mins(c.hours.from)) return e.textContent='La hora final debe ser después de la inicial.';
  if((c.fotos||[]).length<3) return e.textContent='Deja al menos 3 fotos de tus platos.';
  const z=cityById(c.city).zones.find(x=>x[0]===c.zone); if(z){c.lat=z[1];c.lon=z[2];}
  c.name=c.name.trim();
  if(!saveChef(c)) return e.textContent='No hay espacio para guardar. Quita alguna foto.';
  Users.update(c.email,{nombre:c.name});
  toast('Cambios guardados.'); go('/chef/'+c.id);
};
route('/mi-perfil',renderMiPerfil);

/* ---- reservas ---- */
function renderReservas(){
  if(!requireLogin('/reservas')) return;
  const u=Session.user(), all=Reservas.all().slice().reverse();
  const chef=u.rol==='chef'?chefByEmail(u.email):null;
  const mine=chef?all.filter(r=>r.chefId===chef.id):all.filter(r=>r.buyerEmail===u.email);
  const stTxt={pendiente:'Pendiente',aceptado:'Aceptada',rechazado:'Rechazada',cancelado:'Cancelada',completado:'Completada'};
  const IC={pin:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    users:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.8-6 6.5-6s6.5 2.4 6.5 6M16 5a3.5 3.5 0 0 1 0 6.5M18 14.3c2.2.6 3.5 2.5 3.5 5.7"/></svg>'};
  const cnt=k=>mine.filter(r=>r.estado===k).length;
  const chips=mine.length?'<div class="rs-chips">'+[['pendiente','Pendientes'],['aceptado','Aceptadas'],['completado','Completadas']].map(x=>'<span class="rs-chip '+x[0]+'"><b>'+cnt(x[0])+'</b> '+x[1]+'</span>').join('')+'</div>':'';
  const cards=mine.map(r=>{
    const d=parseISO(r.fecha), ch=chefById(r.chefId);
    const who=chef?'<b>'+esc(r.buyerName)+'</b><small>'+esc(r.buyerEmail)+(r.buyerPhone?' · '+esc(r.buyerPhone):'')+'</small>':'<b>Cena con '+esc(r.chefName)+'</b><small>'+(ch?esc(ch.zone)+', ':'')+'Chef verificado</small>';
    let btns='';
    if(chef){ if(r.estado==='pendiente') btns='<button class="btn sm" data-act="rst" data-id="'+r.id+'" data-e="aceptado">Aceptar</button> <button class="ghostbtn sm" data-act="rst" data-id="'+r.id+'" data-e="rechazado">Rechazar</button>'; else if(r.estado==='aceptado') btns='<button class="btn sm" data-act="rst" data-id="'+r.id+'" data-e="completado">Marcar completada</button>'; }
    else { if(r.estado==='pendiente'||r.estado==='aceptado') btns='<button class="ghostbtn sm" data-act="rst" data-id="'+r.id+'" data-e="cancelado">Cancelar</button>'; if((r.estado==='aceptado'||r.estado==='completado')&&!r.resena) btns+=' <a class="btn sm" href="#/chef/'+r.chefId+'">Dejar reseña</a>'; }
    return '<article class="rs-card '+r.estado+'"><div class="rs-date"><b>'+d.getDate()+'</b><span>'+MESES[d.getMonth()]+'</span></div>'+
      '<div class="rs-main"><div class="rs-top"><div class="rs-who">'+who+'</div><span class="st '+r.estado+'">'+stTxt[r.estado]+'</span></div>'+
      '<div class="rs-meta"><span>'+IC.clock+fmtHour(r.hora)+'</span><span>'+IC.users+r.guests+' comensal'+(r.guests==1?'':'es')+'</span><span>'+IC.pin+esc(r.direccion)+'</span></div>'+
      (r.notas?'<div class="rs-note">Notas: '+esc(r.notas)+'</div>':'')+
      '<div class="rs-foot"><div class="rs-total"><small>Total</small><b>'+money(r.totalUSD,r.moneda)+'</b></div><div class="rs-code">Código '+esc(r.id)+'</div></div>'+
      (btns?'<div class="rs-btns">'+btns+'</div>':'')+'</div></article>';
  }).join('');
  const empty='<div class="rs-empty"><img src="assets/logo-icono.svg" alt="" width="88" height="88"><h2>Todavía no hay reservas</h2><p>'+(chef?'Cuando alguien te reserve, la solicitud aparecerá aquí para que la aceptes.':'Elige un chef caribeño y vive tu primera cena en casa.')+'</p>'+(chef?'':'<a class="btn" href="#/resultados">Buscar un chef</a>')+'</div>';
  $('#app').innerHTML='<div class="wrap"><div class="rs"><div class="rs-hd"><div><span class="rs-eyebrow">'+(chef?'Panel del chef':'Tu cuenta')+'</span><h1>'+(chef?'Solicitudes de reserva':'Mis reservas')+'</h1><p>'+(chef?'Acepta o rechaza las cenas que te piden.':'Aquí ves el estado de cada cena.')+'</p></div>'+chips+'</div>'+(mine.length?cards:empty)+'</div></div>';
}
ACT.rst=el=>{
  const e=el.dataset.e;
  if(e==='cancelado'&&!confirm('¿Cancelar esta reserva?')) return;
  Reservas.setEstado(el.dataset.id,e); toast('Reserva '+({aceptado:'aceptada',rechazado:'rechazada',cancelado:'cancelada',completado:'completada'}[e])+'.'); renderReservas();
};
route('/reservas',renderReservas);
