const doc = document.querySelector.bind(document);

const html = {
  links: [...doc(".step-title").children],
  content: [...doc(".formArea").children],
  final: doc(".final"),
  openStep: doc("[data-open]"),
  btn: [...doc(".btn").children],
  btns: [...doc(".btns").children],
  separt: doc(".separt"),
};

function isCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf === "") {
    console.error("Digite o CPF.");
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    console.error("CPF Inválido");
    return false;
  }

  let count = 0;
  for (let i = 0; i < 9; i++) {
    count += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let dig = 11 - (count % 11);
  if (dig === 10 || dig === 11) dig = 0;
  if (dig !== parseInt(cpf.charAt(9))) {
    console.error("CPF Inválido");
    return false;
  }

  count = 0;
  for (let i = 0; i < 10; i++) {
    count += parseInt(cpf.charAt(i)) * (11 - i);
  }
  dig = 11 - (count % 11);
  if (dig === 10 || dig === 11) dig = 0;
  if (dig !== parseInt(cpf.charAt(10))) {
    console.error("CPF Inválido");
    return false;
  }

  validateCPF();
  console.log("CPF Válido");
  return true;
}

function validateCPF() {
  const cpf = doc("#cpf").value;
  const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  if (!regex.test(cpf) || cpf === "") {
    return;
  }

  validateDate();
  validaName();
}

function validaName() {
  const nome = doc("#nome").value;
  if (nome === "") {
    console.error("Insira seu nome");
    doc("#nome").focus();
  }
  localStorage.setItem("nome", nome);
}

function validateDate() {
  const dtNasc = doc("#dtNasc").value;
  if (dtNasc === "") {
    console.error("Insira a data de nascimento");
    return;
  }
  showCurrentStep("adress");
  showFinal();
}

function hideAllStepContent() {
  html.content.forEach((step) => {
    step.style.display = "none";
  });
}

function removeAllActiveStep() {
  html.links.forEach((step) => {
    step.classList.remove("active");
  });
}

function showCurrentStep(id) {
  hideAllStepContent();
  const stepContent = doc("#" + id);
  stepContent.style.display = "block";
  stepContent.classList.add("active");

  if (id === "final") {
    show();
  }
}

function selectStep(event) {
  removeAllActiveStep();
  const select = event.currentTarget;
  showCurrentStep(select.dataset.id);
  select.classList.add("active");
}

function listenForChanges() {
  html.links.forEach((step) => {
    step.addEventListener("click", selectStep);
  });

  html.btns.forEach((click) => {
    click.addEventListener("click", selectStep);
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

function consultCEP() {
  const cep = doc("#cep").value;

  if (cep.length !== 8 || cep === "") {
    console.error("CEP inválido");
    return;
  }

  const url = "https://viacep.com.br/ws/" + cep + "/json/";
  $.getJSON(url, function (data) {
    doc("#rua").value = data.logradouro;
    doc("#bairro").value = data.bairro;
    doc("#number").value = data.number;
    localStorage.setItem("rua", data.logradouro);
    localStorage.setItem("bairro", data.bairro);
    localStorage.setItem("cidade", data.localidade);
  });
}

function showFinal() {
  const name = doc("#nome").value;
  const dtNasc = doc("#dtNasc").value;
  const cpf = doc("#cpf").value;
  html.final.innerHTML = `<p>Nome: ${name}</p>
                          <p>Data de Nascimento: ${dtNasc}</p>
                          <p>CPF: ${cpf}</p>`;
}

function show() {
  html.separt.innerHTML = `<p>${localStorage.getItem(
    "rua",
    data.logradouro
  )}</p>
                          <p>Bairro: ${localStorage.getItem(
                            "bairro",
                            data.bairro
                          )}</p>
                          <p>Cidade: ${localStorage.getItem(
                            "cidade",
                            data.localidade
                          )}</p>`;
}

function start() {
  hideAllStepContent();
  listenForChanges();
  localStorage.clear();
