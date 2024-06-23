pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Replace with your actual Git repository URL
                git 'https://github.com/your-username/my-node-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Ensure the image name is what you desire
                    dockerImage = docker.build("my-node-app")
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    dockerImage.inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy to AWS') {
            steps {
                // Use your actual SSH credentials ID in Jenkins
                sshagent(['my-ssh-key']) {
                    sh '''
                    // Use your actual EC2 instance details
                    docker save my-node-app | bzip2 | ssh -o StrictHostKeyChecking=no ubuntu@3.255.91.168 'bunzip2 | docker load'
                    ssh -o StrictHostKeyChecking=no ubuntu@3.255.91.168 'docker run -d -p 80:3000 my-node-app'
                    '''
                }
            }
        }
    }
}
