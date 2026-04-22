/* cursor */
    const cur=document.getElementById('cur'),rng=document.getElementById('curR');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
    (function a(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;rng.style.left=rx+'px';rng.style.top=ry+'px';requestAnimationFrame(a);})();
    document.querySelectorAll('a,button,.srv-card,.resp-item').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cur.style.width='14px';cur.style.height='14px';rng.style.width='48px';rng.style.height='48px';});
      el.addEventListener('mouseleave',()=>{cur.style.width='9px';cur.style.height='9px';rng.style.width='34px';rng.style.height='34px';});
    });

    /* nav */
    window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('stuck',scrollY>40));

    /* mobile */
    function toggleMob(){document.getElementById('mob').classList.toggle('open');}
    function closeMob(){document.getElementById('mob').classList.remove('open');}

    /* reveal */
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');}),{threshold:.11});
    document.querySelectorAll('.rv').forEach(el=>io.observe(el));

    /* ticker – compute exact half width for pixel-perfect loop */
    window.addEventListener('load',()=>{
      const t=document.querySelector('.ticker');
      const half=t.scrollWidth/2;
      const s=document.createElement('style');
      s.textContent=`@keyframes roll{0%{transform:translateX(0)}100%{transform:translateX(-${half}px)}}`;
      document.head.appendChild(s);
    });

    /* form → WhatsApp */
    function sendWA(){
      const n=document.getElementById('fn').value.trim();
      const p=document.getElementById('fp').value.trim();
      const e=document.getElementById('fe').value.trim();
      const s=document.getElementById('fs').value;
      const m=document.getElementById('fm').value.trim();
      if(!n){alert('Por favor ingresa tu nombre.');return;}
      let txt=`Hola Israel, te escribo desde tu sitio web.\n\n*Nombre:* ${n}`;
      if(p) txt+=`\n*Teléfono:* ${p}`;
      if(e) txt+=`\n*Correo:* ${e}`;
      if(s) txt+=`\n*Servicio:* ${s}`;
      if(m) txt+=`\n\n*Mensaje:*\n${m}`;
      window.open(`https://wa.me/523342586627?text=${encodeURIComponent(txt)}`,'_blank');
    }

