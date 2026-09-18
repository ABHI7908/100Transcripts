pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-cred')
        IMAGE_BACKEND = 'abhinaylone/transcripts-backend'
        IMAGE_FRONTEND = 'abhinaylone/transcripts-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $IMAGE_BACKEND:latest -t $IMAGE_BACKEND:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    // The Dockerfile expects a file named nginx.conf; the repo keeps it as
                    // nginx.docker.conf to avoid clashing with any other nginx config in
                    // the same folder. Rename it for the build context only.
                    sh 'cp nginx.docker.conf nginx.conf'
                    sh 'docker build -t $IMAGE_FRONTEND:latest -t $IMAGE_FRONTEND:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                sh 'docker push $IMAGE_BACKEND:latest'
                sh 'docker push $IMAGE_BACKEND:${BUILD_NUMBER}'
                sh 'docker push $IMAGE_FRONTEND:latest'
                sh 'docker push $IMAGE_FRONTEND:${BUILD_NUMBER}'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo 'Both images built and pushed successfully.'
        }
        failure {
            echo 'Build failed — check the stage logs above for which step broke.'
        }
    }
}
