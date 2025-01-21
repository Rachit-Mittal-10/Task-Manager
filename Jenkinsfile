pipeline{
    agent any
    environment{
        GIT_SSH_KEY="/var/jenkins_home/.ssh/id_rsa"
        GITHUB_URL="git@github.com:Rachit-Mittal-10/Task-Manager.git"
        GITHUB_BRANCH="main"
    }
    stages{
        stage("Checkout code"){
            steps{
                echo "Checking out the code"
                git credentialsId: "github-ssh" ,url: ${GITHUB_URL}, branch: ${GITHUB_BRANCH}
            }
        }
        stage("Deploy using Docker Compose"){
            steps{
                script{
                    sshagent(credentials: ["github-ssh"]){
                        sh "ssh sysad@localhost 'cd C:/Users/sysad/test/tsk_manager'"
                    }
                }
            }
        }
    }
}