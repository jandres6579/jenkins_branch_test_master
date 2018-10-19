"use strict";

//Convierte formato de fecha UNIX a cadena de caracteres en el formato de fecha.
function DateUnix_To_DateString(unixDate,UTCformat,PrintOffset) {

  var date = new Date(parseInt(unixDate));

  var cadena

  //Calcula el desplazamiento por si interesa añadirlo a la cadena.
  var x = new Date();
  var offset= -x.getTimezoneOffset();

  if (UTCformat == true) {
    //MOSTRAR LA HORA UNIVERSAL
    cadena = date.getUTCFullYear() + '-' +
            ('0' + (parseInt(date.getUTCMonth())+1).toString()).slice(-2) + '-' +
            ('0' + date.getUTCDate()).slice(-2) + ' ' +
            ('0' + date.getUTCHours()).slice(-2) + ':' +
            ('0' + date.getUTCMinutes()).slice(-2) + ':' +
            ('0' + date.getUTCSeconds()).slice(-2)
  } else {
    //MOSTRAR LA HORA LOCAL
    cadena = date.getFullYear() + '-' +
            ('0' + (parseInt(date.getMonth())+1).toString()).slice(-2) + '-' +
            ('0' + date.getDate()).slice(-2) + ' ' +
            ('0' + date.getHours()).slice(-2) + ':' +
            ('0' + date.getMinutes()).slice(-2) + ':' +
            ('0' + date.getSeconds()).slice(-2)
  }
  
  if (PrintOffset == true) {
    cadena = cadena + (offset>=0?"+":"-")+('0' + (parseInt(offset/60)).toString()).slice(-2)+":"+('0' + (offset%60).toString()).slice(-2)
  }

  return cadena
};

//Convierte cadena de caracteres con el formato de fecha UTC a formato de fecha UNIX.
function DateString_To_DateUnix(stringDate) {
  
  var fecha = Date.parse(stringDate)
  //depende del formato de la cadena de origen sería suficiente con 
  //fecha = Date.parse(stringDate)
  //o habría que formatear la cadena de esta forma para obtener el formato de cadena que Date.parse admite
  //fecha = Date.parse(stringDate.substring(0, 4)+'-'+stringDate.substring(4, 6)+'-'+stringDate.substring(6, 8)+'T'+
  //                  stringDate.substring(8, 10)+':'+stringDate.substring(10, 12)+':'+stringDate.substring(12)+".000Z")

  return fecha;
};

function addTwoNumbers(x, y) {
  return x + y;
}
  
  module.exports.DateUnix_To_DateString = DateUnix_To_DateString; 
  module.exports.DateString_To_DateUnix = DateString_To_DateUnix; 
  module.exports.addTwoNumbers = addTwoNumbers;
