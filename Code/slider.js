document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const videos = document.querySelectorAll('.slide video');
    const indicators = document.querySelectorAll('.scroll-indicator');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('mouseleave', endDrag);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            updateIndicators();
            playCurrentVideo();
        });
    });

    function startDrag(e) {
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
        }
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    }

    function drag(e) {
        if (isDragging) {
            let currentPosition;
            if (e.type === 'touchmove') {
                currentPosition = e.touches[0].clientX;
            } else {
                currentPosition = e.clientX;
            }
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            setSliderPosition();
        }
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        // Di chuyển sang trái hoặc phải
        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex += 1;
        } else if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        updateSlider();
        playCurrentVideo();
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateSlider() {
        prevTranslate = -currentIndex * window.innerWidth;
        currentTranslate = prevTranslate;
        setSliderPosition();
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex); // Thay đổi slide dựa trên cái chấm ở dưới
        });
    }

    function playCurrentVideo() {
        videos.forEach(video => video.pause());

        if (videos[currentIndex]) {
            videos[currentIndex].currentTime = 0; 
            videos[currentIndex].play(); 
        }
    }

    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    // Fix lỗi trên đt (nếu host đc trên đt ;-;)
    // window.addEventListener('resize', () => {
    //     updateSlider();
    //     playCurrentVideo();
    // });

    videos.forEach(video => {
        video.load();
    });
    playCurrentVideo();

    // document.addEventListener('click', () => {
    //     videos.forEach(video => {
    //         if (video.paused) {
    //             video.play().catch(error => console.error('Lỗi mọe r:', error));
    //         }
    //     });
    // });
});