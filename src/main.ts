import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const harvestButton = document.createElement("button");
harvestButton.textContent = "🌾 Harvest!";
document.body.appendChild(harvestButton);

let crops = 0;
let growthRate = 0;

const cropsDiv = document.createElement("div");
cropsDiv.textContent = `${crops.toFixed(2)} crops harvested`;
document.body.appendChild(cropsDiv);

const rateDiv = document.createElement("div");
rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} crops/sec`;
document.body.appendChild(rateDiv);

const upgrades = [
  { name: "Tractor", baseCost: 10, cost: 10, rate: 0.1, count: 0 },
  { name: "Barn", baseCost: 100, cost: 100, rate: 2.0, count: 0 },
  { name: "Farmhouse", baseCost: 1000, cost: 1000, rate: 50.0, count: 0 },
];

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatus: HTMLDivElement[] = [];

upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.textContent = `Buy ${u.name} (${
    u.cost.toFixed(2)
  } crops, +${u.rate}/sec)`;
  btn.disabled = true;
  document.body.appendChild(btn);
  upgradeButtons.push(btn);

  const status = document.createElement("div");
  status.textContent = `${u.name}s owned: ${u.count}`;
  document.body.appendChild(status);
  upgradeStatus.push(status);

  btn.addEventListener("click", () => {
    if (crops >= u.cost) {
      crops -= u.cost;
      u.count++;
      growthRate += u.rate;
      u.cost *= 1.15;
      cropsDiv.textContent = `${crops.toFixed(2)} crops harvested`;
      rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} crops/sec`;
      status.textContent = `${u.name}s owned: ${u.count}`;
      btn.textContent = `Buy ${u.name} (${
        u.cost.toFixed(2)
      } crops, +${u.rate}/sec)`;
    }
  });
});

harvestButton.addEventListener("click", () => {
  crops++;
  cropsDiv.textContent = `${crops.toFixed(2)} crops harvested`;
});

let lastTime = performance.now();

function update(time: number) {
  const delta = (time - lastTime) / 1000;
  crops += growthRate * delta;
  cropsDiv.textContent = `${crops.toFixed(2)} crops harvested`;
  rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} crops/sec`;
  upgrades.forEach((u, i) => {
    upgradeButtons[i].disabled = crops < u.cost;
  });
  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
