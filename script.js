const form = document.querySelector("#form");
//Selecionando os inputs
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //evitar da pagina recarregar ao envio
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  //Verificando username
  if (usernameValue == "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  //Verificando email (vazio e inválido)

  if (emailValue == "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido");
  } else {
    setSuccessFor(email);
  }

  //Verificando senha (vazia e min 7 caracteres)
  if (passwordValue == "") {
    setErrorFor(password, "A senha não pode ser vazia.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha deve ter no mínimo 7 caracteres.");
  } else {
    setSuccessFor(password);
  }

  //Verificando se as senhas batem (vazia e iguais)
  if (passwordConfirmationValue == "") {
    setErrorFor(passwordConfirmation, "A confirmação é obrigatória.");
  } else if (passwordConfirmationValue != passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control");
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className == "form-control success";
  }); /*tem que transformar em um array padrão pois o query selectorAll faz um nodeList que não é a mesma coisa*/
  if (formIsValid) {
    console.log("Tudo certo com as validações");
  }
}

function setErrorFor(input, mensagem) {
  const formControl = input.parentElement; //pega a div pai do input testado para adicionar a classe dos erros
  const small = formControl.querySelector("small");
  //muda o texto do small de acordo com o erro
  small.innerText = mensagem;
  //adiciona classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"; //renomeamos suas classes, na nova existe as caracteristicas css de sucesso.
}

//Função para checkar email com regex
function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
