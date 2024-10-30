@Library("teckdigital") _
def appName = "shelf-mate/backend"
def localBranchToGitopsValuesPath = [
    'main': 'shelf-mate/deployment.yml',
]

pipeline {
   agent {
    kubernetes {
        inheritFrom "kaniko-template"
    }
  }
    
    stages {
        stage('Build and Tag Image') {
            steps {
                container('kaniko') {
                    script {
                        buildDockerImage(additionalImageTags: ["latest"])
                    }
                }
            }
        }

        stage('Update GitOps') {
            when {
                expression {
                    return localBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                }
            }
            steps {
                script {
                    def valuesPath = localBranchToGitopsValuesPath[getLocalBranchName()]
                    updateGitops(appName: appName, valuesPath: valuesPath, credentialsId: "tpausl-github-user", gitOpsRepo: "https://github.com/tpausl/gitops.git", fileTypeToChange: "deployment", containerName: "backend")
                }
            }
        }
    }
}