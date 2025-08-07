document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slide = document.querySelector('.slide');
    const slideImage = document.querySelector('.slide-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
  
    let fotos = [];
    let currentIndex = 0;
    let intervalId;
  
    // Função para buscar fotos da API
    async function fetchFotos() {
      try {
        const response = await fetch('https://api-fotos-uizi.onrender.com/fotos');
        if (!response.ok) {
          throw new Error('Erro ao carregar as fotos');
        }
        fotos = await response.json();
        initSlider();
      } catch (error) {
        console.error('Erro:', error);
        slideImage.alt = 'Erro ao carregar imagens';
      }
    }
  
    // Inicializa o slider
    function initSlider() {
      if (fotos.length === 0) return;
  
      // Cria os dots de navegação
      createDots();
      
      // Mostra a primeira foto
      showSlide(currentIndex);
      
      // Inicia o intervalo para troca automática
      startInterval();
      
      // Adiciona eventos aos botões
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
    }
  
    // Mostra o slide no índice especificado
    function showSlide(index) {
      if (fotos.length === 0) return;
      
      // Garante que o índice esteja dentro dos limites
      if (index >= fotos.length) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = fotos.length - 1;
      } else {
        currentIndex = index;
      }
      
      // Atualiza a imagem e legenda
      const foto = fotos[currentIndex];
      slideImage.src = foto.imagem; 
      slideImage.alt = foto.legenda || 'Foto do slider';
      
      // Atualiza os dots ativos
      updateDots();
    }
  
    // Cria os dots de navegação
    function createDots() {
      dotsContainer.innerHTML = '';
      fotos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
          resetInterval();
          showSlide(index);
        });
        dotsContainer.appendChild(dot);
      });
    }
  
    // Atualiza os dots ativos
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    // Próximo slide
    function nextSlide() {
      resetInterval();
      showSlide(currentIndex + 1);
    }
  
    // Slide anterior
    function prevSlide() {
      resetInterval();
      showSlide(currentIndex - 1);
    }
  
    // Inicia o intervalo para troca automática
    function startInterval() {
      intervalId = setInterval(nextSlide, 10000); // 10 segundos
    }
  
    // Reseta o intervalo
    function resetInterval() {
      clearInterval(intervalId);
      startInterval();
    }
  
    // Inicia o processo
    fetchFotos();
  
    // Adiciona navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    });
  });