// --- MATRIX BACKGROUND LOGIC ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 40);

// --- PASSWORD TOGGLE (EYE BUTTON) ---
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#pin');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// --- LOGIN VERIFICATION ---
function verify() {
    const user = document.getElementById("username").value;
    const pin = document.getElementById("pin").value;
    const status = document.getElementById("status");

    if (user === "hunter" && pin === "darkboy") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("success-page").style.display = "flex";
        
        startTyping("System successfully bypassed. Authentication complete. You have reached the mainframe, Agent Hunter. Welcome to the shadows.");
    } else {
        status.innerText = "!! ACCESS DENIED: INVALID CREDENTIALS !!";
        status.style.color = "red";
        // Shake effect
        document.querySelector('.login-box').style.animation = "shake 0.2s 3";
        setTimeout(() => document.querySelector('.login-box').style.animation = "", 500);
    }
}

function startTyping(text) {
    let i = 0;
    const element = document.getElementById("success-msg");
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}