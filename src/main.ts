import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  { name: "Tractor", cost: 10, rate: 0.1, count: 0 },
  { name: "Barn", cost: 100, rate: 2.0, count: 0 },
  { name: "Farmhouse", cost: 1000, rate: 50.0, count: 0 },
];

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

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatus: HTMLDivElement[] = [];

for (const item of availableItems) {
  const btn = document.createElement("button");
  btn.textContent = `Buy ${item.name} (${
    item.cost.toFixed(2)
  } crops, +${item.rate}/sec)`;
  btn.disabled = true;
  document.body.appendChild(btn);
  upgradeButtons.push(btn);

  const status = document.createElement("div");
  status.textContent = `${item.name}s owned: ${item.count}`;
  document.body.appendChild(status);
  upgradeStatus.push(status);

  btn.addEventListener("click", () => {
    if (crops >= item.cost) {
      crops -= item.cost;
      item.count++;
      growthRate += item.rate;
      item.cost *= 1.15;
      cropsDiv.textContent = `${crops.toFixed(2)} crops harvested`;
      rateDiv.textContent = `Growth rate: ${growthRate.toFixed(2)} crops/sec`;
      status.textContent = `${item.name}s owned: ${item.count}`;
      btn.textContent = `Buy ${item.name} (${
        item.cost.toFixed(2)
      } crops, +${item.rate}/sec)`;
    }
  });
}

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

  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = crops < availableItems[i].cost;
  }

  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
