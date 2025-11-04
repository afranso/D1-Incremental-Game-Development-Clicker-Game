import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.createElement("button");
button.textContent = "🚀";
document.body.appendChild(button);

let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter.toFixed(2)} launches`;
document.body.appendChild(counterDiv);

button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
});

let lastTime = performance.now();

function update(time: number) {
  const delta = (time - lastTime) / 1000;
  counter += delta;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
