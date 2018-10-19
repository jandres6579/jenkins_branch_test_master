var orion = require("../orion");
var config = require("../config.json");

var assert = require('chai').assert;

describe("Prueba asincrona",function(){

  var respuestaOrion
  var respuestaOrion_parse

  it('incrementa el numero de test',async function(){

    try {
      var fechaUniX
      var fechaFormateada
      var numEjecuciones
      var numPruebasTest

      var numPruebasTest_NUEVAS

      var cuerpo = [];

      //Obtenemos datos de Orion para ver el número de testeos actuales "numPruebasTest".
      respuestaOrion = await orion.obtieneEntidadORION ("Jenkins:Prueba", config.orionService, config.orionServicePath, config.orionHost, config.orionPort);
      
      //Parseamos los datos para recorrer entidad por entidad
      respuestaOrion_parse = JSON.parse(respuestaOrion)

      if (typeof respuestaOrion_parse.numPruebasTest === 'undefined') {
        //Fuerza fallo porque no existe el campo.
        assert.equal(1, 0);  
      } else {
        //Cargamos las variables con el valor correspondiente.
        fechaUniX = respuestaOrion_parse.fechaUniX.value
        fechaFormateada = respuestaOrion_parse.fechaFormateada.value
        numEjecuciones = respuestaOrion_parse.numEjecuciones.value
        numPruebasTest = respuestaOrion_parse.numPruebasTest.value

        //Incrementamos en 1
        numPruebasTest_NUEVAS = respuestaOrion_parse.numPruebasTest.value + 1

        //Actualizamos en Orion..
        cuerpo.push({
          type: config.orionEntity_type,
          id: "Jenkins:Prueba",
          "fechaUniX": {
              "value": orion.limpiaCadenaJSON(fechaUniX.toString()),
              "type": "string"
              },
          "fechaFormateada": {
              "value": orion.limpiaCadenaJSON(fechaFormateada.toString()),
              "type": "string"
          },
          "numEjecuciones": {
              "value": numEjecuciones,
              "type": "integer"
          },
          "numPruebasTest": {
              "value": numPruebasTest_NUEVAS,
              "type": "integer"
          }
        });

        var strjson = JSON.stringify({
                            entities: cuerpo,
                            actionType: config.orionActionType
                      });

        respuestaOrion = await orion.fromHTTPToOrionContextBroker(strjson,config.orionMethodPOST,config.orionHost,config.orionPort,
                                                                  config.orionPathV2OpUpdate,config.orionService,config.orionServicePath);

        if (respuestaOrion.length !=0 ) {
          //Fuerza fallo porque ha fallado la actualización.
          assert.equal(1, 0);  
        }

        //Finalmente comprobamos que se ha actualizado realizando una nueva lectura y comparándolo con el valor anterior.
        respuestaOrion = await orion.obtieneEntidadORION ("Jenkins:Prueba", config.orionService, config.orionServicePath, config.orionHost, config.orionPort);
      
        //Parseamos los datos para recorrer entidad por entidad
        respuestaOrion_parse = JSON.parse(respuestaOrion)

        assert.equal(numPruebasTest+1, respuestaOrion_parse.numPruebasTest.value);
      } 
    } catch(e) {
      console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
      //Fuerza fallo porque ha fallado la ejecución del test.
      assert.equal(1, 0);      
    }
  })
});

