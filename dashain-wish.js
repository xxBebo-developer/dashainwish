document.addEventListener('DOMContentLoaded', function() {
    // Handle window resize for responsive animations
    window.addEventListener('resize', function() {
        // Reinitialize animations on resize
        if (typeof startAnimations === 'function') {
            // Clear existing intervals
            if (window.animationIntervals) {
                window.animationIntervals.forEach(clearInterval);
            }
            // Restart animations
            startAnimations();
        }
    });
    const wishButton = document.getElementById('wishButton');
    const wishContent = document.getElementById('wishContent');
    const durgaImage = document.getElementById('durgaImage');
    const firstNepaliText = document.getElementById('firstNepaliText');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const youtubeIframe = document.getElementById('youtubeIframe');
    const musicToggle = document.getElementById('musicToggle');
    
    // YouTube video ID from the provided URL
    const youtubeVideoId = 'Adhpa0b-DZg';
    let isMusicPlaying = false;
    
    // Animate main title with typewriter effect
    setTimeout(() => {
        applyTypewriterEffect(document.querySelector('.main-title'), "Happy Dashain 2082");
    }, 500);
    
    // Animate button after delay
    setTimeout(() => {
        wishButton.style.animation = 'fadeIn 2s forwards';
    }, 1500);
    
    // Name popup elements
    const namePopup = document.getElementById('namePopup');
    const viewerNameInput = document.getElementById('viewerName');
    const confirmNameButton = document.getElementById('confirmNameButton');
    let viewerName = '';
    
    // Debug logging
    console.log('DOM Elements:');
    console.log('wishButton:', wishButton);
    console.log('namePopup:', namePopup);
    console.log('viewerNameInput:', viewerNameInput);
    console.log('confirmNameButton:', confirmNameButton);
    
    // Attach event listener directly since we're already in DOMContentLoaded
    if (wishButton && namePopup) {
        wishButton.addEventListener('click', function() {
            console.log('Wish button clicked');
            // Show name input popup instead of directly showing wishes
            namePopup.style.display = 'flex';
            namePopup.style.opacity = '1';
            namePopup.style.visibility = 'visible';
            console.log('Name popup display set to flex');
        });
    }
    
    // Handle name confirmation
    if (confirmNameButton) {
        confirmNameButton.addEventListener('click', function() {
            console.log('Confirm button clicked');
            viewerName = viewerNameInput ? viewerNameInput.value.trim() : '';
            
            if (viewerName) {
                console.log('Viewer name entered:', viewerName);
                // Hide name popup
                namePopup.style.display = 'none';
                namePopup.style.opacity = '0';
                namePopup.style.visibility = 'hidden';
                
                // Hide main button
                if (wishButton) {
                    wishButton.classList.add('hidden');
                }
                
                // Load YouTube player (completely hidden but plays audio)
                if (youtubeIframe) {
                    youtubeIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&mute=0&volume=50`;
                }
                isMusicPlaying = true;
                if (musicToggle) {
                    musicToggle.textContent = '🔊';
                }
                
                // Show wish content with animation
                if (wishContent) {
                    wishContent.style.display = 'flex';
                    wishContent.style.animation = 'popIn 1s forwards';
                    wishContent.style.opacity = '1';
                    wishContent.style.visibility = 'visible';
                }
                
                // Animate images with pop-in effect
                setTimeout(() => {
                    if (durgaImage) {
                        durgaImage.style.animation = 'popIn 1.5s forwards';
                        durgaImage.style.opacity = '1';
                    }
                    
                    // Animate side images
                    const leftImage = document.querySelector('.left-image');
                    const rightImage = document.querySelector('.right-image');
                    
                    if (leftImage) {
                        leftImage.style.animation = 'popIn 1.5s forwards';
                        leftImage.style.opacity = '1';
                    }
                    
                    if (rightImage) {
                        rightImage.style.animation = 'popIn 1.5s forwards';
                        rightImage.style.opacity = '1';
                    }
                }, 300);
                
                // Animate Nepali text with typewriter effect, including viewer name
                setTimeout(() => {
                    const nepaliText = `<div class="greeting-line">Dear <span class="viewer-name">${viewerName}</span>,</div><div class="nepali-message">दशैँको पावन अवसरमा माता दुर्गाको कृपा सदैव तपाईंको जीवनमा रहोस् । स्वास्थ्य, सुख, समृद्धि र एकताको उज्यालोले घर आँगन भरियोस् ।</div><div class="closing-line">With Love,<br><span class="sender-name">Karan Bohara</span></div>`;
                    if (firstNepaliText) {
                        applyTypewriterEffect(firstNepaliText, nepaliText);
                    }
                }, 1500);
                
                // Start all animations
                startAnimations();
            } else {
                alert('Please enter your name!');
            }
        });
    } else {
        console.error('Confirm name button not found');
    }
    
    // Allow Enter key to confirm name
    if (viewerNameInput) {
        viewerNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                confirmNameButton.click();
            }
        });
    }
    
    // Close name popup if clicked outside the content
    if (namePopup) {
        namePopup.addEventListener('click', function(e) {
            if (e.target === namePopup) {
                namePopup.style.display = 'none';
                namePopup.style.opacity = '0';
                namePopup.style.visibility = 'hidden';
                // Show the main button again if name not entered
                if (!viewerName) {
                    wishButton.classList.remove('hidden');
                }
            }
        });
    }
    
    // Music toggle
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            youtubeIframe.src = '';
            isMusicPlaying = false;
            musicToggle.textContent = '🔇';
        } else {
            youtubeIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&mute=0&volume=50`;
            isMusicPlaying = true;
            musicToggle.textContent = '🔊';
        }
    });
    
    // Reply button functionality removed as per user request
    // The WhatsApp popup functionality is kept for potential future use
    
    function applyTypewriterEffect(element, text) {
        element.innerHTML = "";
        element.style.opacity = '1';
        
        let i = 0;
        const speed = 50; // typing speed in milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                // Handle HTML tags properly
                if (text.substr(i, 4) === '<br>') {
                    element.innerHTML += '<br>';
                    i += 4; // Skip the <br> tag
                } else if (text.substr(i, 5) === '<span') {
                    // Find the end of the span tag
                    const spanEnd = text.indexOf('>', i) + 1;
                    const spanContent = text.substring(i, spanEnd);
                    element.innerHTML += spanContent;
                    i = spanEnd;
                } else if (text.substr(i, 7) === '</span>') {
                    element.innerHTML += '</span>';
                    i += 7;
                } else if (text.substr(i, 4) === '<div') {
                    // Find the end of the div tag
                    const divEnd = text.indexOf('>', i) + 1;
                    const divContent = text.substring(i, divEnd);
                    element.innerHTML += divContent;
                    i = divEnd;
                } else if (text.substr(i, 6) === '</div>') {
                    element.innerHTML += '</div>';
                    i += 6;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }
    
    function startAnimations() {
        // Clear existing intervals if they exist
        if (window.animationIntervals) {
            window.animationIntervals.forEach(clearInterval);
        }
        
        // Store intervals for cleanup
        window.animationIntervals = [];
        
        // Create fireworks
        window.animationIntervals.push(setInterval(createFirework, 200));
        
        // Create firecrackers
        window.animationIntervals.push(setInterval(createFirecracker, 400));
        
        // Create falling flowers
        window.animationIntervals.push(setInterval(createFlower, 300));
        
        // Create confetti
        window.animationIntervals.push(setInterval(createConfetti, 150));
        
        // Create additional firecrackers for more festive effect
        window.animationIntervals.push(setInterval(createFirecracker, 200));
        
        // Create additional confetti for more festive effect
        window.animationIntervals.push(setInterval(createConfetti, 80));
        
        // Create special festive firecrackers
        window.animationIntervals.push(setInterval(createFestiveFirecracker, 600));
    }
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random position within container bounds
        const fireworkContainer = document.querySelector('.container') || document.body;
        const containerRect = fireworkContainer.getBoundingClientRect();
        const posX = containerRect.left + (Math.random() * containerRect.width);
        const posY = containerRect.top + (Math.random() * containerRect.height);
        
        firework.style.left = `${posX}px`;
        firework.style.top = `${posY}px`;
        
        // Random color
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8c00', '#ff1493'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        firework.style.backgroundColor = color;
        
        document.body.appendChild(firework);
        
        // Animate explosion
        firework.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(10)', opacity: 0 }
        ], {
            duration: 1200,
            easing: 'ease-out'
        });
        
        // Remove element after animation
        setTimeout(() => {
            firework.remove();
        }, 1200);
    }
    
    function createFirecracker() {
        const firecracker = document.createElement('div');
        firecracker.className = 'firecracker';
        firecracker.innerHTML = '🧨'; // Firecracker emoji
        
        // Random position within container bounds
        const firecrackerContainer = document.querySelector('.container') || document.body;
        const containerRect = firecrackerContainer.getBoundingClientRect();
        const posX = containerRect.left + (Math.random() * containerRect.width);
        const posY = containerRect.top + (Math.random() * containerRect.height);
        
        firecracker.style.left = `${posX}px`;
        firecracker.style.top = `${posY}px`;
        
        document.body.appendChild(firecracker);
        
        // Animate explosion with more festive effect
        firecracker.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(6) rotate(1080deg)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        });
        
        // Remove element after animation
        setTimeout(() => {
            firecracker.remove();
        }, 1500);
    }
    
    function createFestiveFirecracker() {
        const firecracker = document.createElement('div');
        firecracker.className = 'firecracker';
        firecracker.innerHTML = '🎆'; // Firework emoji for special effect
        
        // Random position within container bounds
        const festiveContainer = document.querySelector('.container') || document.body;
        const containerRect = festiveContainer.getBoundingClientRect();
        const posX = containerRect.left + (Math.random() * containerRect.width);
        const posY = containerRect.top + (Math.random() * containerRect.height);
        
        firecracker.style.left = `${posX}px`;
        firecracker.style.top = `${posY}px`;
        
        // Special styling for festive firecrackers
        firecracker.style.fontSize = '2rem';
        
        document.body.appendChild(firecracker);
        
        // Animate explosion with special festive effect
        firecracker.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(8) rotate(1440deg)', opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-out'
        });
        
        // Remove element after animation
        setTimeout(() => {
            firecracker.remove();
        }, 2000);
    }
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.innerHTML = '🌸'; // Flower emoji
        
        // Random position within container bounds
        const flowerPosContainer = document.querySelector('.container') || document.body;
        const containerRect = flowerPosContainer.getBoundingClientRect();
        const posX = containerRect.left + (Math.random() * containerRect.width);
        flower.style.left = `${posX}px`;
        
        document.body.appendChild(flower);
        
        // Animate falling
        const flowerContainer = document.querySelector('.container') || document.body;
        const flowerContainerHeight = flowerContainer.clientHeight || window.innerHeight;
        flower.animate([
            { transform: 'translateY(-100px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${flowerContainerHeight}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 6000,
            easing: 'linear'
        });
        
        // Remove element after animation
        setTimeout(() => {
            flower.remove();
        }, 6000);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position within container bounds
        const confettiPosContainer = document.querySelector('.container') || document.body;
        const containerRect = confettiPosContainer.getBoundingClientRect();
        const posX = containerRect.left + (Math.random() * containerRect.width);
        confetti.style.left = `${posX}px`;
        
        // Random color
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8c00', '#ff1493', '#ffa500', '#800080'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        // Random shape
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = '4px solid transparent';
            confetti.style.borderRight = '4px solid transparent';
            confetti.style.borderBottom = `8px solid ${color}`;
        }
        
        document.body.appendChild(confetti);
        
        // Animate falling with more festive effect
        const confettiContainer = document.querySelector('.container') || document.body;
        const confettiContainerHeight = confettiContainer.clientHeight || window.innerHeight;
        confetti.animate([
            { transform: 'translateY(-100px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${confettiContainerHeight}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 4000,
            easing: 'ease-out'
        });
        
        // Remove element after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
});