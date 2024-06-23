pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repo/my-node-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
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
                sshagent(['your-ssh-credentials-id']) {
                    sh '''
                    docker save my-node-app | bzip2 | ssh -o StrictHostKeyChecking=no ubuntu@your-nodejs-ec2-public-dns 'bunzip2 | docker load'
                    ssh -o StrictHostKeyChecking=no ubuntu@your-nodejs-ec2-public-dns 'docker run -d -p 80:3000 my-node-app'
                    '''
                }
            }
        }
    }
}
