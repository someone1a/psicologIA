// Agregar al final del script existente, antes de la etiqueta de cierre </script>

// Función para alternar el modo de pantalla completa
function toggleFullscreen() {
    const chatContainer = document.getElementById('chat-container');
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    
    // Alternar la clase para pantalla completa
    chatContainer.classList.toggle('chat-fullscreen');
    
    // Cambiar el icono según el estado
    if (chatContainer.classList.contains('chat-fullscreen')) {
      fullscreenIcon.classList.remove('fa-expand');
      fullscreenIcon.classList.add('fa-compress');
      
      // Enfocar el input cuando se expande
      userInput.focus();
      
      // Desplazarse al último mensaje
      const chatMessages = document.querySelector('.chat-messages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Ocultar el resto del contenido de la página
      document.body.style.overflow = 'hidden';
    } else {
      fullscreenIcon.classList.remove('fa-compress');
      fullscreenIcon.classList.add('fa-expand');
      
      // Restaurar el scroll del body
      document.body.style.overflow = 'auto';
    }
  }
  
  // Agregar evento al botón de pantalla completa
  document.addEventListener('DOMContentLoaded', function() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // También permitir usar la tecla Escape para salir del modo pantalla completa
    document.addEventListener('keydown', function(e) {
      const chatContainer = document.getElementById('chat-container');
      if (e.key === 'Escape' && chatContainer.classList.contains('chat-fullscreen')) {
        toggleFullscreen();
      }
    });
  });