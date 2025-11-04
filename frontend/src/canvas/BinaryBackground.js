// src/canvas/BinaryBackground.js
export function startBinaryBackground() {
  const canvas = document.getElementById("binaryCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const binary = "0101011010010110100101101001011010010";
  const fontSize = 12;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) drops[x] = 1;

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff2fff";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = binary.charAt(Math.floor(Math.random() * binary.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] =0;
      }
      drops[i]+=0.5;
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
