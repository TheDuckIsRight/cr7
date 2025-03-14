document.addEventListener('DOMContentLoaded', function() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupYear = document.querySelector('.popup-year');
    const popupText = document.querySelector('.popup-text');
    const closeBtn = document.querySelector('.close-btn');

    timelineContents.forEach(content => {
        content.addEventListener('click', function() {
            const year = this.dataset.year || this.querySelector('.year').textContent;
            
            const expandedInfo = this.dataset.expandedInfo;
            const regularInfo = this.querySelector('p').textContent;
            
            popupYear.textContent = year;
            popupText.innerHTML = expandedInfo || regularInfo;
            popupOverlay.classList.add('active');
            
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', closePopup);
    
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    function closePopup() {
        const audioElements = document.querySelectorAll('.popup-content audio');
        audioElements.forEach(audio => {
            audio.pause();
        });
        
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('visible');
    });
});