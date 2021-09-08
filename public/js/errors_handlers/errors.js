// Crea un objeto tipo de UserException
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
  }

  // Hacer que la excepción se convierta en una bonita cadena cuando se usa como cadena
  // (por ejemplo, por la consola de errores)
  UserException.prototype.toString = function() {
    codeError = this.message;
    field = this.name;
    show = false;
    module = 'Cargo Items'
    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

    return `${this.name}: "${this.message}"`;
  }
