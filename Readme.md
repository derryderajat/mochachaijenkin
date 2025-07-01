project-root/
├── test/
│   └── financeSimulation.test.js
├── .env
├── package.json
└── ...

# Add allure report in mocha
```bash
npm install --save-dev mocha allure-mocha```

# Jenkins Setup
## Step 1: Install Jenkins
```bash
brew install jenkins-lts```
## Step 2: Start Jenkins
```bash
brew services start jenkins-lts
```
## Step 3: Open Jenkins in the browser
```bash
open http://localhost:8080
```
## Step 4: Configure Jenkins
```bash
echo 'JENKINS_PASSWORD=your_password' >>
or cat /Users/Shared/Jenkins/Home/secrets/initialAdminPassword```
## Step 5: Install plugins  
```bash
jenkins --install-plugin git
Allure Jenkins Plugin
Git plugin
NodeJS Plugin (untuk npm)
Pipeline```
## Step 6: Create a new pipeline