document.addEventListener('mousemove', function(e) {
    const character = document.getElementById('character');
    if (character) {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        character.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});
