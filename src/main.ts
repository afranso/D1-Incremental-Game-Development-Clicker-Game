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
counterDiv.textContent = `${counter} launches`;
document.body.appendChild(counterDiv);

button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} launches`;
});

setInterval(() => {
  counter++;
  counterDiv.textContent = `${counter} launches`;
}, 1000);
