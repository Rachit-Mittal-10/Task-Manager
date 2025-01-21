pipeline{
    agent any
    environment{
        GIT_SSH_KEY="/var/jenkins_home/.ssh/id_rsa"
    }
    stages{
        stage("Checkout code"){
            steps{
                echo "Checking out the code"
                git credentialsId: "github-ssh" ,url: "git@github.com:Rachit-Mittal-10/Task-Manager.git", branch: "main"
            }
        }
        stage("Deploy using Docker Compose"){
            steps{
                script{
                    dir("C:/Users/sysad/test/task_manager"){
                        sh "docker-compose down && docker-compose up -d"
                    }                    
                }
            }
        }
    }
}