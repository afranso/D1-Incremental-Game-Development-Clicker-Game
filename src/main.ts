import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const launchButton = document.createElement("button");
launchButton.textContent = "🚀";
document.body.appendChild(launchButton);

let counter = 0;
let growthRate = 0;

const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter.toFixed(2)} launches`;
document.body.appendChild(counterDiv);

const rateDiv = document.createElement("div");
rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} launches/sec`;
document.body.appendChild(rateDiv);

const upgrades = [
  { name: "A", baseCost: 10, cost: 10, rate: 0.1, count: 0 },
  { name: "B", baseCost: 100, cost: 100, rate: 2.0, count: 0 },
  { name: "C", baseCost: 1000, cost: 1000, rate: 50.0, count: 0 },
];

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatus: HTMLDivElement[] = [];

upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.textContent = `Buy ${u.name} (${
    u.cost.toFixed(2)
  } launches, +${u.rate}/sec)`;
  btn.disabled = true;
  document.body.appendChild(btn);
  upgradeButtons.push(btn);

  const status = document.createElement("div");
  status.textContent = `${u.name}: ${u.count} owned`;
  document.body.appendChild(status);
  upgradeStatus.push(status);

  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      u.count++;
      growthRate += u.rate;
      u.cost *= 1.15;
      counterDiv.textContent = `${counter.toFixed(2)} launches`;
      rateDiv.textContent = `Growth rate: ${
        growthRate.toFixed(2)
      } launches/sec`;
      status.textContent = `${u.name}: ${u.count} owned`;
      btn.textContent = `Buy ${u.name} (${
        u.cost.toFixed(2)
      } launches, +${u.rate}/sec)`;
    }
  });
});

launchButton.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
});

let lastTime = performance.now();

function update(time: number) {
  const delta = (time - lastTime) / 1000;
  counter += growthRate * delta;
  counterDiv.textContent = `${counter.toFixed(2)} launches`;
  rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} launches/sec`;
  upgrades.forEach((u, i) => {
    upgradeButtons[i].disabled = counter < u.cost;
  });
  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
