pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-cred')
        IMAGE_BACKEND = 'abhinaylone/transcripts-backend'
        IMAGE_FRONTEND = 'abhinaylone/transcripts-frontend'
        BACKEND_INSTANCE = 'i-012937400d9bda8e5'
        FRONTEND_INSTANCE = 'i-09e2d8d3e0597e226'
        AWS_REGION = 'ap-south-2'
        DEPLOY_BUCKET = 'task01-transcripts-media'
        NOTIFY_EMAIL = 'abhinaylone3@gmail.com'
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
                sh 'docker logout'
            }
        }

        stage('Approval') {
            steps {
                emailext(
                    to: "${NOTIFY_EMAIL}",
                    subject: "[Jenkins] Build #${env.BUILD_NUMBER} awaiting deploy approval",
                    body: "Build #${env.BUILD_NUMBER} finished building and pushed both images successfully.\n\nIt's now waiting on manual approval before deploying to production (app.abhinayportfolio.shop / api.abhinayportfolio.shop).\n\nApprove or abort here: ${env.BUILD_URL}input/\n\nThis will auto-abort if not approved within 30 minutes."
                )
                timeout(time: 30, unit: 'MINUTES') {
                    input message: "Deploy build #${env.BUILD_NUMBER} to production (app.abhinayportfolio.shop / api.abhinayportfolio.shop)?", ok: 'Deploy'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                    CMD_ID=$(aws ssm send-command --region $AWS_REGION \
                      --instance-ids $BACKEND_INSTANCE \
                      --document-name "AWS-RunShellScript" \
                      --parameters 'commands=["docker pull '"$IMAGE_BACKEND"':latest","docker stop transcripts-backend","docker rm transcripts-backend","docker run -d --name transcripts-backend --network transcripts-net --restart unless-stopped --env-file /opt/app/.env -v /opt/app/backend:/app -v /opt/app/logs:/app/logs -v /opt/app/staticfiles:/app/staticfiles -p 127.0.0.1:8000:8000 '"$IMAGE_BACKEND"':latest"]' \
                      --query 'Command.CommandId' --output text)
                    echo "Backend deploy command: $CMD_ID"
                    sleep 20
                    aws ssm get-command-invocation --region $AWS_REGION --command-id $CMD_ID --instance-id $BACKEND_INSTANCE --query 'Status' --output text
                    aws ssm get-command-invocation --region $AWS_REGION --command-id $CMD_ID --instance-id $BACKEND_INSTANCE --query 'StandardOutputContent' --output text
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                    docker create --name frontend-extract-${BUILD_NUMBER} $IMAGE_FRONTEND:latest
                    docker cp frontend-extract-${BUILD_NUMBER}:/usr/share/nginx/html /tmp/frontend-dist-${BUILD_NUMBER}
                    docker rm frontend-extract-${BUILD_NUMBER}

                    FILE_COUNT=$(find /tmp/frontend-dist-${BUILD_NUMBER} -type f | wc -l)
                    if [ "$FILE_COUNT" -lt 1 ]; then
                        echo "ERROR: extracted frontend build is empty (0 files) - aborting deploy, live site left untouched."
                        exit 1
                    fi

                    tar -czf /tmp/frontend-dist-${BUILD_NUMBER}.tar.gz -C /tmp/frontend-dist-${BUILD_NUMBER} .
                    aws s3 cp /tmp/frontend-dist-${BUILD_NUMBER}.tar.gz s3://$DEPLOY_BUCKET/jenkins-deploy/frontend-dist-${BUILD_NUMBER}.tar.gz

                    CMD_ID=$(aws ssm send-command --region $AWS_REGION \
                      --instance-ids $FRONTEND_INSTANCE \
                      --document-name "AWS-RunShellScript" \
                      --parameters "{\\"commands\\":[\\"aws s3 cp s3://$DEPLOY_BUCKET/jenkins-deploy/frontend-dist-${BUILD_NUMBER}.tar.gz /tmp/frontend-dist.tar.gz\\", \\"rm -rf /opt/app/frontend/dist.new\\", \\"mkdir -p /opt/app/frontend/dist.new\\", \\"tar -xzf /tmp/frontend-dist.tar.gz -C /opt/app/frontend/dist.new\\", \\"FILE_COUNT=\$(find /opt/app/frontend/dist.new -type f | wc -l)\\", \\"if [ \\\\\\"\$FILE_COUNT\\\\\\" -lt 1 ]; then echo EXTRACTED_BUILD_EMPTY_ABORTING; rm -rf /opt/app/frontend/dist.new; exit 1; fi\\", \\"rm -rf /opt/app/frontend/dist.old\\", \\"mv /opt/app/frontend/dist /opt/app/frontend/dist.old\\", \\"mv /opt/app/frontend/dist.new /opt/app/frontend/dist\\"]}" \
                      --query 'Command.CommandId' --output text)
                    echo "Frontend deploy command: $CMD_ID"
                    sleep 15
                    aws ssm get-command-invocation --region $AWS_REGION --command-id $CMD_ID --instance-id $FRONTEND_INSTANCE --query 'Status' --output text
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            emailext(
                to: "${NOTIFY_EMAIL}",
                subject: "[Jenkins] Build #${env.BUILD_NUMBER} deployed successfully",
                body: "Build #${env.BUILD_NUMBER} built, pushed, and deployed to production successfully.\n\napp.abhinayportfolio.shop\napi.abhinayportfolio.shop\n\nConsole: ${env.BUILD_URL}console"
            )
        }
        aborted {
            emailext(
                to: "${NOTIFY_EMAIL}",
                subject: "[Jenkins] Build #${env.BUILD_NUMBER} aborted - not deployed",
                body: "Build #${env.BUILD_NUMBER} was not approved in time (or was manually aborted).\n\nImages were pushed to Docker Hub, but nothing was deployed to production.\n\nConsole: ${env.BUILD_URL}console"
            )
        }
        failure {
            emailext(
                to: "${NOTIFY_EMAIL}",
                subject: "[Jenkins] Build #${env.BUILD_NUMBER} FAILED",
                body: "Build #${env.BUILD_NUMBER} failed. Check which stage broke:\n\n${env.BUILD_URL}console"
            )
        }
    }
}
