// comments
pipeline {
    agent any

    //Alias a herramientas instaladas en Jenkins
    tools {
        nodejs "NodeJS 8.11.1"
        }

    triggers {
	    //Cada día
            pollSCM('@daily')
            //Cada media hora
            //cron('H/30 * * * *')
	    //Cada hora
            //cron('H * * * *')
            //Cada día
	    cron('@daily')
    }
    
    options {
        // using the Timestamper plugin we can add timestamps to the console log
        timestamps()
        
        //If specified, only up to this number of build records are kept.

        /*Parameters for logRotator (from the source code):

                daysToKeepStr: history is only kept up to this days.
                numToKeepStr: only this number of build logs are kept.
                artifactDaysToKeepStr: artifacts are only kept up to this days.
                artifactNumToKeepStr: only this number of builds have their artifacts kept.
        */
        buildDiscarder(logRotator(numToKeepStr: "5"))

        //Si en 3 días no ha terminado que falle.
        timeout(time: 76, unit: 'HOURS') 

    }

    stages {

        stage('CheckOut-Git') {
            steps {
                echo 'CheckOut-Git...'
                git poll: true, url: 'https://github.com/jandres6579/jenkinsNode.git'
            }
        }

        stage('Git Checkout - b1.0') {
            //Este paso lo ejecuta sólo si estamos en la rama indicada.
            when {
                branch 'b1.0'
            }
            steps {
                echo 'Realizando Git checkout a b1.0...'
                sh '''
                    bash -c "git checkout b1.0"
                '''
            }
        }

        stage('Git Checkout - master') {
            //Este paso lo ejecuta sólo si estamos en el master.
            when {
                branch 'master'
            }
            steps {
                echo 'Realizando Git checkout a master...'
                sh '''
                    bash -c "git checkout master"
                '''
            }
        }
        
        stage('Obtain system information..') {
            steps {
                echo 'Obteniendo información del sistema...'
                sh '''
                    bash -c "echo $PATH && npm --version && grunt --version && git branch"
                '''
            }
        }
        
        stage('Install dependencies') {
            steps {
                echo 'Instalando dependencias del proyecto (package.json)...'
                sh '''
                    bash -c "npm install"
                '''
            }
        }

        stage('TestingApp') {
            steps {
                echo 'Realizando testeo...'
                sh '''
                    bash -c "npm test"
                '''
            }
        }

        stage('RunningApp') {
            steps {
                echo 'Ejecutando aplicación...'
                sh '''
                    #De esta forma se pueden añaden comentarios.
                    bash -c "npm start &"
                   '''
            }
        }

        stage('Obtain result') {
            steps {
                echo 'Muestra información entidad...'
                sh '''
                    bash -c "./consultaEntidad.sh"
                '''
            }
        }

        stage ('CleanUp workspace') {
            //Limpiamos el workspace para no llenar los discos
           steps {
                echo 'Borrardo de workspace...'
                deleteDir()
           }
        }
        
    }

    post {
        
        /*
            always: Run the steps in the post section regardless of the completion status of the Pipeline’s or stage’s run.
            changed: Only run the steps in post if the current Pipeline’s or stage’s run has a different completion status from its previous run.
            fixed: Only run the steps in post if the current Pipeline’s or stage’s run is successful and the previous run failed or was unstable.
            regression: Only run the steps in post if the current Pipeline’s or stage’s run’s status is failure, unstable, or aborted and the previous run was successful.
            aborted: Only run the steps in post if the current Pipeline’s or stage’s run has an "aborted" status, usually due to the Pipeline being manually aborted. This is typically denoted by gray in the web UI.
            failure: Only run the steps in post if the current Pipeline’s or stage’s run has a "failed" status, typically denoted by red in the web UI.
            success: Only run the steps in post if the current Pipeline’s or stage’s run has a "success" status, typically denoted by blue or green in the web UI.
            unstable: Only run the steps in post if the current Pipeline’s or stage’s run has an "unstable" status, usually caused by test failures, code violations, etc. This is typically denoted by yellow in the web UI.
            cleanup:Run the steps in this post condition after every other post condition has been evaluated, regardless of the Pipeline or stage’s status.


        */
        //Otra opcion de borrar el workspace podría ser hacerlo en segundo plano y no como un paso más visible
        //always {
        //    deleteDir()
        //}

        fixed {
            mail to: 'jasanchez@odins.es',
                    from: 'jasanchez@odins.es',
                        subject: "Fixed Pipeline: ${currentBuild.fullDisplayName}",
                            body: "Run is successful and the previous run failed or was unstable: ${env.BUILD_URL}"
        }

        failure {
            mail to: 'jasanchez@odins.es',
                from: 'jasanchez@odins.es',
                    subject: "Failure Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Run has a failed status: ${env.BUILD_URL}"
        }

        success {
            mail to: 'jasanchez@odins.es',
                    from: 'jasanchez@odins.es',        
                        subject: "Success Pipeline: ${currentBuild.fullDisplayName}",
                            body: "Run has a success status: ${env.BUILD_URL}"
        }
    }
}

/*


#!/bin/bash
echo '********* INICIO PROCESO ************'
echo $PATH
node --version
npm --version
grunt --version
npm install
npm test
npm start
./consultaEntidad.sh
echo '********* FIN PROCESO ************'
*/
