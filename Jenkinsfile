pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id'  // Replace with your Docker Hub credentials ID
        DOCKER_HUB_REPO = 'hakimedy/my-node-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/GLcoz/my-node-app.git', credentialsId: 'github-token'  // Replace with your GitHub credentials ID
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${env.DOCKER_HUB_REPO}:${env.BUILD_ID}")
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
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', env.DOCKER_HUB_CREDENTIALS) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy to AWS') {
            steps {
                sshagent(['my-ssh-key']) {  // Replace with your SSH credentials ID
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@3.255.91.168 '
                    docker pull ${env.DOCKER_HUB_REPO}:${env.BUILD_ID}
                    docker stop my-node-app || true
                    docker rm my-node-app || true
                    docker run -d -p 80:3000 --name my-node-app ${env.DOCKER_HUB_REPO}:${env.BUILD_ID}
                    '
                    '''
                }
            }
        }
    }
}
