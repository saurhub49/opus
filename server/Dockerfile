FROM openjdk:17-jdk-alpine
EXPOSE 8080
ADD target/*.jar opus-app.jar
ENTRYPOINT ["java","-jar","opus-app.jar"]