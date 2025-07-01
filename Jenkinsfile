pipeline {
  agent any

  environment {
    BASE_URL = 'https://sit.auto2000.co.id'
    CUSTOMER_TOKEN = credentials('customer_token')
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/derryderajat/mochachaijenkin.git'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh 'npx allure generate reports/allure-results --clean -o reports/allure-report'
      }
    }

    stage('Archive Report') {
      steps {
        archiveArtifacts artifacts: 'reports/allure-report/**/*.*', allowEmptyArchive: true
      }
    }
  }

//   post {
//     always {
//       junit 'reports/allure-results/*.xml' 
//     }
//   }
}
