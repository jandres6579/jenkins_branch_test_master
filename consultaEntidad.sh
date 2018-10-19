curl localhost:1026/v2/entities -s -S --header 'Accept: application/json' --header 'fiware-service: jenkins' --header 'fiware-servicepath: /pruebas' | python -mjson.tool; 
