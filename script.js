const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();

// Asistente interactivo FIXIES: orientación inicial y acceso directo a WhatsApp.
(() => {
  const launcher = document.getElementById('fixies-launcher');
  const panel = document.getElementById('fixies-panel');
  const close = document.getElementById('fixies-close');
  const chat = document.getElementById('fixies-chat');
  const contact = document.getElementById('fixies-contact');
  if (!launcher || !panel || !chat || !contact) return;
  const topics = {
    computadora: ['Computadora o laptop', 'Podemos orientarte con diagnóstico, reparación, mantenimiento, limpieza, ampliación de RAM o SSD. Dime la marca, modelo y qué falla presenta.'],
    impresora: ['Impresora', 'Atendemos diagnóstico, mantenimiento, limpieza, configuración, atascos y problemas de impresión. Indica marca, modelo y qué sucede.'],
    software: ['Windows, macOS o programas', 'Podemos revisar instalación o actualización de Windows y macOS, programas, controladores, errores y rendimiento. Cuéntame qué sistema utilizas.'],
    respaldo: ['Respaldo de información', 'Podemos valorar respaldos, migración y recuperación de información. Si el equipo hace ruidos extraños o no inicia, evita seguir utilizándolo y cuéntanos qué ocurrió.'],
    empresa: ['Servicio para mi negocio', 'Apoyamos a negocios y oficinas con mantenimiento, impresoras, puntos de venta, redes y videovigilancia. Podemos revisar tus necesidades y coordinar una propuesta.'],
    otro: ['Otro servicio', 'Con gusto te orientamos. Describe brevemente qué equipo o servicio necesitas.']
  };
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.querySelector('strong').textContent = open ? '−' : '+';
  }
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  document.querySelectorAll('[data-topic]').forEach(button => {
    button.addEventListener('click', () => {
      const item = topics[button.dataset.topic];
      chat.innerHTML = '';
      const question = document.createElement('p');
      question.className = 'fixies-message user';
      question.textContent = item[0];
      const answer = document.createElement('p');
      answer.className = 'fixies-message';
      answer.textContent = item[1];
      chat.append(question, answer);
      const msg = `Hola, FIXIES. Necesito información sobre: ${item[0]}. ${item[1]}`;
      contact.href = `https://wa.me/525571928724?text=${encodeURIComponent(msg)}`;
    });
  });
})();
