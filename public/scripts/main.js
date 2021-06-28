import Modal from "./modal.js";

const modal = Modal();
const modalTitle = document.querySelector(".modal-wrapper .modal h2");
const modalDescription = document.querySelector(".modal-wrapper .modal p");
const modalButton = document.querySelector(".modal .buttons button");

const checkButton = document.querySelectorAll(".actions a.check");

checkButton.forEach((button) => {
  button.addEventListener("click", handleClick);
});

const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false));
});

const readButtons = document.querySelectorAll(".actions a.read");

readButtons.forEach((button) => {
  button.addEventListener("click", (event) => event.preventDefault());
});

function handleClick(event, check = true) {
  console.log("Olá");
  event.preventDefault();

  const text = check
    ? "Marcar esta pergunta como lida?"
    : "Excluir esta pergunta?";

  const slug = check ? "check" : "delete";
  const roomId = document.querySelector("#room-id").dataset.id;
  const questionId = event.target.dataset.id;

  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = text.replace("?", "");
  modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()}`;
  modalButton.innerHTML = `Sim, ${text
    .toLowerCase()
    .replace("?", "")
    .replace("esta pergunta", "")}`;

  check
    ? modalButton.classList.remove("red")
    : modalButton.classList.add("red");
  modal.open();
}
