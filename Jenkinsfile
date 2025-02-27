pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/ckekula/tournament-management-system.git'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-credentials'
        IMAGE_FRONTEND = 'your-dockerhub-username/tms-frontend'
        IMAGE_BACKEND = 'your-dockerhub-username/tms-backend'
        EC2_USER = 'ubuntu'
        EC2_HOST = 'your-ec2-ip'
        SSH_CREDENTIALS_ID = 'ec2-ssh-key'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t ${IMAGE_FRONTEND} ./frontend'
                sh 'docker build -t ${IMAGE_BACKEND} ./backend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", url: "https://index.docker.io/v1/"]) {
                    sh 'docker push ${IMAGE_FRONTEND}'
                    sh 'docker push ${IMAGE_BACKEND}'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} <<EOF
                    docker pull ${IMAGE_FRONTEND}
                    docker pull ${IMAGE_BACKEND}
                    docker-compose -f /path/to/docker-compose.yml up -d --force-recreate
                    EOF
                    """
                }
            }
        }
    }
}
