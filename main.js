// Initialize music controls
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const playBtn = document.getElementById('playBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Set initial volume
    audio.volume = volumeSlider.value;
    
    // Play/Pause button
    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playBtn.textContent = '❚❚';
                })
                .catch(e => {
                    console.log('Playback failed:', e);
                });
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });
    
    // Mute button
    muteBtn.addEventListener('click', function() {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? '🔇' : '🔊';
        if (!audio.muted) {
            audio.volume = volumeSlider.value;
        }
    });
    
    // Volume slider
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
        audio.muted = false;
        muteBtn.textContent = '🔊';
    });
    
    // Update button states
    audio.addEventListener('play', function() {
        playBtn.textContent = '❚❚';
    });
    
    audio.addEventListener('pause', function() {
        playBtn.textContent = '▶';
    });
    
    // Initialize button states
    if (audio.paused) {
        playBtn.textContent = '▶';
    } else {
        playBtn.textContent = '❚❚';
    }
});

// Rest of your carousel and animation code...
// (Keep all your existing carousel initialization and animation code)

// Carousel initialization code
var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120;
var imgHeight = 170;

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
}

function applyTranform(obj) {
    if(tY > 180) tY = 180;
    if(tY < 0) tY = 0;

    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

document.onmousewheel = function(e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};

// Fireworks and hearts animation
window.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.id = "canvas";
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(2, 4);
        this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
        this.vx = random(-3, 3);
        this.vy = random(-3, 3);
        this.life = 100;
    }

    Firework.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    Firework.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    };

    function Heart(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(20, 40);
        this.color = 'red';
        this.vy = random(-2, -1);
        this.opacity = 1;
    }

    Heart.prototype.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, 
                         this.x - this.size, this.y + this.size / 3, 
                         this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, 
                         this.x + this.size / 2, this.y - this.size / 2, 
                         this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    };

    Heart.prototype.update = function () {
        this.y += this.vy;
        this.opacity -= 0.01;
    };

    let fireworks = [];
    let hearts = [];

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.1) {
            fireworks.push(new Firework(random(0, canvas.width), random(0, canvas.height)));
        }
        
        if (Math.random() < 0.05) {
            hearts.push(new Heart(random(0, canvas.width), canvas.height));
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            fireworks[i].update();
            if (fireworks[i].life <= 0) {
                fireworks.splice(i, 1);
            }
        }

        for (let i = hearts.length - 1; i >= 0; i--) {
            hearts[i].draw();
            hearts[i].update();
            if (hearts[i].opacity <= 0) {
                hearts.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
