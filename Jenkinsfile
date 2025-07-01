pipeline {
  agent any

  environment {
    BASE_URL = 'https://sit.auto2000.co.id'
    CUSTOMER_TOKEN = credentials('customer_token') // Ambil dari Jenkins Credentials
    NVM_DIR = "${env.HOME}/.nvm"
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
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
          nvm use 20

          npx allure generate reports/allure-results --clean -o reports/allure-report || true
        '''
      }
    }

    stage('Archive Report') {
      steps {
        archiveArtifacts artifacts: 'reports/allure-report
