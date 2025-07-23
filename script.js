document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const slideWidth = 100; // 100% ширины контейнера

  // Массив изображений (замените на свои пути)
  const images = [
    './images/slider/slide0.JPG',
    './images/slider/slide1.JPG',
    './images/slider/slide2.JPG',
    './images/slider/slide3.JPG',
    './images/slider/slide4.JPG',
    './images/slider/slide5.JPG'
  ];

    let currentPosition = 0;
    let currentIndex = 0;

    // Инициализация слайдов
    function initSlides() {
      for (let i = 0; i < slides.length; i++) {
        const imgIndex = (currentIndex + i) % images.length;
        slides[i].querySelector('img').src = images[imgIndex];
        slides[i].querySelector('img').alt = `Изображение ${imgIndex + 1}`;
      }
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
      currentPosition -= slideWidth;
      currentIndex = (currentIndex + 1) % images.length;

      // Анимируем перемещение
      track.style.transform = `translateX(${currentPosition}%)`;

      // После завершения анимации
      setTimeout(() => {
        // Переносим первый слайд в конец
        const firstSlide = track.firstElementChild;
        track.appendChild(firstSlide.cloneNode(true));
        firstSlide.remove();

        // Сбрасываем позицию без анимации
        track.style.transition = 'none';
        currentPosition += slideWidth;
        track.style.transform = `translateX(${currentPosition}%)`;

        // Обновляем изображение в новом слайде
        const newImgIndex = (currentIndex + slides.length - 1) % images.length;
        track.lastElementChild.querySelector('img').src = images[newImgIndex];
        track.lastElementChild.querySelector('img').alt = `Изображение ${newImgIndex + 1}`;

        // Возвращаем анимацию
        setTimeout(() => {
          track.style.transition = 'transform 0.8s ease-in-out';
        }, 20);
      }, 800); // Таймаут равен времени анимации
    }

    // Инициализация
    initSlides();

    // Автопрокрутка каждые 3 секунды
    setInterval(nextSlide, 3000);
  });