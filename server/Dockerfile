#FROM openjdk:21
#EXPOSE 8080
#ADD target/*.jar opus-app.jar
#ENTRYPOINT ["java","-jar","opus-app.jar"]

FROM maven:3.9.5 AS build

WORKDIR /app

COPY . .

RUN mvn clean install -DskipTests

FROM openjdk:21

WORKDIR /app

COPY --from=build /app/target/*.jar server.jar

EXPOSE 8080

CMD ["java", "-jar", "server.jar"]
