// RuoYi-Vue3 前端 CI/CD：拉代码 → 安装依赖 → 构建 → 归档 dist → 部署（原子切换 + nginx 重载）
// 触发：Jenkins 任务侧 SCMTrigger 轮询（H/5 * * * *）
pipeline {
    agent any

    stages {
        stage('拉取代码') {
            steps {
                checkout scm
            }
        }
        stage('安装依赖') {
            steps {
                bat 'npm install --no-audit --no-fund --cache "E:\\Program Files(AI)\\cache\\npm"'
            }
        }
        stage('前端构建') {
            steps {
                bat 'npm run build:prod'
            }
        }
        stage('归档制品') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
        stage('部署') {
            steps {
                bat 'powershell -NoProfile -ExecutionPolicy Bypass -File deploy\\deploy-frontend.ps1 -SourceDist dist'
            }
        }
    }
}
