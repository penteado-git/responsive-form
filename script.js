const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  }

  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll("input")];
  const allValid = inputs.every((input) => input.reportValidity());
  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

function mascaraCpf(mascara, input) {
  const vestMask = mascara.split("");
  const numCpf = input.value.replace(/\D/g, "");
  const cursor = input.selectionStart;
  const tecla = window.event ? event.keyCode : event.which;

  for (let i = 0; i < numCpf.length; i++) {
    vestMask.splice(vestMask.indexOf("#"), 1, numCpf[i]);
  }

  input.value = vestMask.join("");

  if (cursor == 3 || cursor == 7 || cursor == 11) {
    input.setSelectionRange(cursor + 1, cursor + 1);
  } else {
    input.setSelectionRange(cursor, cursor);
  }
}

function endereço() {
  var cep = document.getElementById("cep");
  var url = "http://viacep.com.br/ws/" + cep.value + "/json/";

  var bairro = document.getElementById("bairro");
  var logradouro = document.getElementById("logradouro");

  fetch(url, { method: "GET" }).then((response) => {
    response.json().then((data) => {
      logradouro.value = data.logradouro;
      bairro.value = data.bairro;
    });
  });
}

function resultado() {
  let nome = document.getElementById("nome").value;
  console.log("Nome: " + nome);
}
