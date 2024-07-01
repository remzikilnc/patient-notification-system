FROM openjdk:17-slim
VOLUME /tmp
COPY target/api-gateway-1.0-SNAPSHOT.jar api-gateway.jar
ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/api-gateway.jar"]
