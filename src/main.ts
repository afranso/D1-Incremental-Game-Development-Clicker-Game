import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.createElement("button");
button.textContent = "🚀";
document.body.appendChild(button);

let counter: number = 0;
let growthRate: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter.toFixed(2)} launches`;
document.body.appendChild(counterDiv);

const upgradeButton = document.createElement("button");
upgradeButton.textContent = "🛒 Buy Upgrade (10 launches)";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    counterDiv.textContent = `${counter.toFixed(2)} launches`;
  }
});

let lastTime = performance.now();

function update(time: number) {
  const delta = (time - lastTime) / 1000;
  counter += growthRate * delta;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
  upgradeButton.disabled = counter < 10;
  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
