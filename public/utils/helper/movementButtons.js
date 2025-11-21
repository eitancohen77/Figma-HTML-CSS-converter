export function addPanControls(rootDiv) {
  const panControls = document.createElement("div");
  panControls.className = "pan-controls";

  panControls.innerHTML = `
    <button class="pan-btn empty"></button>
    <button class="pan-btn" data-dir="up">▲</button>
    <button class="pan-btn empty"></button>

    <button class="pan-btn" data-dir="left">◀</button>
    <button class="pan-btn empty"></button>
    <button class="pan-btn" data-dir="right">▶</button>

    <button class="pan-btn empty"></button>
    <button class="pan-btn" data-dir="down">▼</button>
    <button class="pan-btn empty"></button>
  `;

  document.body.appendChild(panControls);

  let xMovements = 0;
  let yMovements = 0;
  const amount = 170;

  function updatePan() {
    rootDiv.style.transform = `translate(${xMovements}px, ${yMovements}px)`;
    rootDiv.style.transformOrigin = "top left";
  }

  panControls.querySelector('[data-dir="up"]').onclick = () => {
    yMovements -= amount;
    updatePan();
  };

  panControls.querySelector('[data-dir="down"]').onclick = () => {
    yMovements += amount;
    updatePan();
  };

  panControls.querySelector('[data-dir="left"]').onclick = () => {
    xMovements -= amount;
    updatePan();
  };

  panControls.querySelector('[data-dir="right"]').onclick = () => {
    xMovements += amount;
    updatePan();
  };

  rootDiv.style.transition = "transform 0.15s ease-out";
}
