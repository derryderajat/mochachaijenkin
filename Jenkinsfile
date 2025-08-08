pipeline {
  agent any

environment {
  BASE_URL = "${env.BASE_URL}"
  CUSTOMER_TOKEN = "${env.CUSTOMER_TOKEN}"
  OTP_CODE = "${env.OTP_CODE}"
  OTP_TYPE = "${env.OTP_TYPE}"
  PHONE_NUMBER = "${env.PHONE_NUMBER}"
  ENCRYPTED_PASSWORD = "${env.ENCRYPTED_PASSWORD}"
}


  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/derryderajat/mochachaijenkin.git'
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
          nvm use 20

          node -v
          npm -v
          npm install
        '''
      }
    }

    stage('Run Tests') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
          nvm use 20

          npm run test
        '''
      }
    }

    stage('Generate Allure Report') {
        steps {
            sh '''
            export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
            nvm use 20

            java -version
            npx allure generate reports/allure-results --clean -o reports/allure-report || true
            '''
        }
    }

    stage('Archive Report') {
      steps {
        archiveArtifacts artifacts: 'reports/allure-report/**/*.*', allowEmptyArchive: true
      }
    }
  }

post {
  always {
    echo 'Pipeline finished'

    allure([
      includeProperties: false,
      jdk: 'JAVA_HOME',
      results: [[path: 'reports/allure-results']],
      commandline: 'ALLURE_HOME'
    ])
  }
}



}
