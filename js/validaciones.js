export function valida(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }

    if(input.validity.valid){
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError( tipoInput, input);
    }
}

const tipoDeError = ['valueMissing', 'typeMismatch', 'patternMismatch', 'customError'];

const mensajeDeError = {
  nombre: {
    valueMissing: 'Este campo no puede estar vacío',
  },
  email: {
    valueMissing: 'Este campo no puede estar vacío',
    typeMismatch: 'El correo no es válido',
  },
  password: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La contraseña debe tener al menos: una minúscula, una mayúscula y un número. No debe tener caracteres especiales. Mínimo 6 caracetes, máximo 12.',
  },
  nacimiento: {
    valueMissing: 'Este campo no puede estar vacío',
    customError: 'Debes tener al menos 18 años de edad',
  },
  numero: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
  },
  direccion: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La dirección debe contener entre 4 y 30 caracteres'
  },
  ciudad: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La ciudad debe contener entre 4 y 30 caracteres'
  },
  provincia: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La provincia debe contener entre 4 y 30 caracteres'
  },
}
const validadores = {
    nacimiento: input => validarNacimiento (input)
}


function mostrarMensajeDeError(tipoInput, input){
  let mensaje = "";
  tipoDeError.forEach(error => {
    if(input.validity[error]){
      mensaje = mensajeDeError[tipoInput][error];
    }
  })

  return mensaje;
}


function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
