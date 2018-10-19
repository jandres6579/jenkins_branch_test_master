"use strict";

var config = require("../config.json");
var orion = require("../orion");
var util = require("../util");

async function lanzaProceso(orionEntity_type,orionMethodPOST,orionHost,orionPort,orionPathV2OpUpdate,orionActionType,orionService,orionServicePath) {
    try {

        var cuerpo = [];
        var respuestaOrion
        var respuestaOrion_parse

        var fechaUniX = Date.now()
        var fechaFormateada = util.DateUnix_To_DateString(Date.now(),false,false)

        var numEjecuciones=0
        var numPruebasTest=0

        //Accedemos a orion para recuperar la entidad y poder obtener asi los campos "numEjecuciones" y "numPruebasTest"
        respuestaOrion = await orion.obtieneEntidadORION ("Jenkins:Prueba", config.orionService, config.orionServicePath, config.orionHost, config.orionPort);
    
        //Parseamos los datos para recorrer entidad por entidad
        respuestaOrion_parse = JSON.parse(respuestaOrion)

        if (typeof respuestaOrion_parse.numEjecuciones === 'undefined') {
            numEjecuciones=1
        } else {
            numEjecuciones=respuestaOrion_parse.numEjecuciones.value + 1
        }

        if (typeof respuestaOrion_parse.numPruebasTest === 'undefined') {
            numPruebasTest=0
        } else {
            numPruebasTest=respuestaOrion_parse.numPruebasTest.value
        }
        cuerpo.push({
                    type: orionEntity_type,
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
                        "value": numPruebasTest,
                        "type": "integer"
                    }
        });

        var strjson = JSON.stringify({
            entities: cuerpo,
            actionType: orionActionType
        });

        //console.log("strjson: " +  strjson)

        respuestaOrion = await orion.fromHTTPToOrionContextBroker(strjson,orionMethodPOST,orionHost,orionPort,orionPathV2OpUpdate,orionService,orionServicePath);

        if (respuestaOrion.length !=0 ) {
            console.log(respuestaOrion + util.DateUnix_To_DateString(Date.now(),false,false))    
        }

    } catch(e) {
        console.log(e + util.DateUnix_To_DateString(Date.now(),false,false))
    }
}

lanzaProceso (config.orionEntity_type,config.orionMethodPOST,config.orionHost,config.orionPort,config.orionPathV2OpUpdate,
              config.orionActionType,config.orionService, config.orionServicePath)