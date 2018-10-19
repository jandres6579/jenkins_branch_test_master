var assert = require('chai').assert;

//Ejemplo otra forma de hacer assert y utlización de funcionalidad de otros módulos. (con IMPORT)
var expect = require('chai').expect;
var util = require('../util');


/* Sintaxis
- assert: vamos a poder hacer comprobaciones de valores, para asegurar que obtenemos los valores esperados cuando llamamos a una función.
- describe: Nos permitirá agrupar unit tests en secciones. Pueden anidarse unos describe dentro de otros, para crear subsecciones de unit tests.
- it: Encapsula la implementación de un unit test

- before: Este método irá dentro de una sección describe, y se ejecutará antes que ninguno de los unit tests (it) de la sección. Nos servirá para inicializar 
variables necesarias para la ejecución de los unit tests.
- after: Se ejecutará después de todos los unit tests de la sección. Podremos utilizarlo para dejar el sistema en el estado en el que estaba antes de ejecutar 
los unit tests de la sección.
También existen beforeEach y afterEach que se ejecutarán antes y después de cada unit test de la sección.

**** Unit tests asíncronos ****

Uno de los problemas que suele surgir creando unit tests en JavaScript, es al crear unit tests asíncronos. En este caso, Mocha no puede saber que el test es 
asíncrono y cuando ha terminado de probarse o cuando un método before o after ha terminado de ejecutarse. Para solucionar este problema, podemos llamar al 
método callback que se pasa como parámetro de la función, que generalmente se nombra como “done”.

*/
describe("Numbers",function(){
  it('should add two numbers',function(){
    assert.equal(5, 3 + 2);
  })
});

describe("Prueba modulo Chai",function(){
    it('isAtLeastTrue',function(){
      // isAtLeast (Como poco...) Mayor que...
      assert.isAtLeast(10, 3 + 6);
    });
/*    it('isAtLeastFalse)',function(){
        assert.isAtLeast(2, 3 + 1);
    });
*/  it('isNotNullTrue',function(){
        assert.isNotNull(2);
    })
/*    it('isNotNullFalse)',function(){
        assert.isNotNull(null);
    })
*/    
});

describe("Prueba modulo util",function(){

  it('DateUnix_To_DateString() UTCformat=false, PrintOffset=false',function(){
    try {
      var unixTime = 1535091451000;
      var fechaFormateadaCorrecta = "2018-08-24 08:17:31";

      var fechaFormateadaCalculada = util.DateUnix_To_DateString(unixTime,false,false);

      assert.equal(fechaFormateadaCalculada, fechaFormateadaCorrecta);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  });

  it('DateUnix_To_DateString() UTCformat=true, PrintOffset=false',function(){
    try {
      var unixTime = 1535091451000;
      var fechaFormateadaCorrecta = "2018-08-24 06:17:31";

      var fechaFormateadaCalculada = util.DateUnix_To_DateString(unixTime,true,false);

      assert.equal(fechaFormateadaCalculada, fechaFormateadaCorrecta);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  });

  it('DateUnix_To_DateString() UTCformat=false, PrintOffset=true',function(){
    try {
      var x = new Date();
      var offset= -x.getTimezoneOffset();
      
      var unixTime = 1535091451000;
      var fechaFormateadaCorrecta = "2018-08-24 08:17:31" + 
            (offset>=0?"+":"-")+('0' + (parseInt(offset/60)).toString()).slice(-2)+":"+('0' + (offset%60).toString()).slice(-2)

      var fechaFormateadaCalculada = util.DateUnix_To_DateString(unixTime,false,true);

      assert.equal(fechaFormateadaCalculada, fechaFormateadaCorrecta);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  });

  it('DateUnix_To_DateString() UTCformat=true, PrintOffset=true',function(){
    try {
      var x = new Date();
      var offset= -x.getTimezoneOffset();

      var unixTime = 1535091451000;
      var fechaFormateadaCorrecta = "2018-08-24 06:17:31" + 
            (offset>=0?"+":"-")+('0' + (parseInt(offset/60)).toString()).slice(-2)+":"+('0' + (offset%60).toString()).slice(-2)

      var fechaFormateadaCalculada = util.DateUnix_To_DateString(unixTime,true,true);

      assert.equal(fechaFormateadaCalculada, fechaFormateadaCorrecta);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  });

  it('DateString_To_DateUnix()',function(){
    try {
      var x = "2018-08-24T07:49:06.000Z";
      
      var fechaUnixCorrecta = 1535096946000;

      var fechaUnixCalculada = util.DateString_To_DateUnix(x);

      assert.equal(fechaUnixCalculada, fechaUnixCorrecta);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  });


  it('addTwoNumbers() - Prueba 1',function(){
    try {  
      // 1. ARRANGE
      var x = 5;
      var y = 1;
      var sum1 = x + y;
  
      // 2. ACT
      var sum2 = util.addTwoNumbers(x, y);
  
      // 3. ASSERT
      expect(sum2).to.be.equal(sum1);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }      
  });

  it('addTwoNumbers() - Prueba 2',function(){
    try {  
      // 1. ARRANGE
      var x = 6;
      var y = 6;
      var sum1 = x + y;
  
      // 2. ACT
      var sum2 = util.addTwoNumbers(x, y);
  
      // 3. ASSERT
      expect(sum2).to.be.equal(sum1);
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }      
  });
});


describe("Ejemplo before, beforeEach y afterEach",function(){
    var numero1
    var numero2
    var numero3
    before(function() {
        // runs before all tests in this block
        numero1=1
        numero2=2
        numero3=3
    });
    
    after(function() {
        // runs after all tests in this block
        numero1=0
        numero2=0
        numero3=0
    });
    
    beforeEach(function() {
        // runs before each test in this block
        numero1=numero1+numero1
        numero2=numero2+numero2
        numero3=numero3+numero3
    });
/*    
    afterEach(function() {
        // runs after each test in this block
    });
*/
    it('paso1',function(){
        //console.log(numero1 + ' ' + numero2 + ' ' + numero3)
        //numero1 será 2 
        //numero2 será 4 
        //numero3 será 6
        // isAtLeast (Como poco...) Mayor que...
        assert.isAtLeast(numero3,numero1+numero2);
    });

    it('paso2',function(){
        //console.log(numero1 + ' ' + numero2 + ' ' + numero3)
        //numero1 será 4 
        //numero2 será 8 
        //numero3 será 12
        // isAtLeast (Como poco...) Mayor que...
        assert.isAtLeast(numero3,numero1+numero2);
    });
})    

/* Ejemplo completo Asincrono
Vamos a ver un ejemplo más completo, con métodos before y after. Además, utilizaremos métodos asíncronos para inicializar la base de datos y para resetearla 
después. Esto nos obligará a usar el callback done para indicarle a Mocha cuando ha terminado cada paso.

Imaginemos que tenemos un colección en mongo llamada channels, en la que guardamos canales con un nombre. Y tenemos un fichero JavaScript encargado del acceso 
a esta colección. En esta sección de unit tests queremos probar los métodos get que obtienen objetos Channel de esa colección. Para ello tenemos que importar 
el fichero que queremos probar (channels.js).

Usaremos el método before para asegurarnos que en la colección al menos tenemos 3 documentos Channel. Como el salvado en Mongo está implementado de manera 
asíncrona (además de que usamos el método forEach que también es asíncrono), tenemos que hacer uso del callback done para decirle a Mocha cuando hemos terminado 
de hacer el proceso de inicializado. En el método after realizaremos el proceso contrario, borrando los 3 documentos para dejar la base de datos en el estado 
inicial. Y en los 2 métodos it probamos las funciones get que obtienen todos los documentos de la colección, y comprobamos que al menos haya 3 (assert.isAtLeast) 
y el get que obtiene sólo uno por su id, y comprobamos que no sea null (assert.isNotNull)

var assert = require('chai').assert;
var channelsDB = require('../db/channels');
var channelNamesArray = ['test channel 1', 'test channel 2', 'test channel 3'];


describe('Channels', function () {
  describe('#get()', function () {
    var channelIds = [];

    // Create 3 channels in DB
    before(function (done) {
      var numChannelsCreated = 0;
      channelNamesArray.forEach(function (channelName) {
        var channel = new channelsDB.Channel({name: channelName})
        channel.save(function (error, channel) {
          if (error) throw error;
          channelIds.push(channel._id);
          numChannelsCreated++;
          if (numChannelsCreated == channelNamesArray.length) {
            done();
          }
        })
      })
    })

    // remove the 3 channels created before
    after(function (done) {
      var numChannelsRemoved = 0;
      channelNamesArray.forEach(function (channelName) {
        channelsDB.getChannelByName(channelName, function (error, channel) {
          if (error) throw error;
          channel.remove(function () {
            numChannelsRemoved++;
            if (numChannelsRemoved == channelNamesArray.length) {
              done();
            }
          })
        })
      })
    })


    it('Should get all channels without error', function (done) {
      channelsDB.getChannels(function (error, channels) {
        assert.isAtLeast(channels.length, 3);
        done();
      })
    })


    it('Should get one channel by id without error', function (done) {
      channelsDB.getChannel(channelIds[0], function (error, channel) {
        assert.isNotNull(channel);
        done();
      })
    })
  })
})

*/