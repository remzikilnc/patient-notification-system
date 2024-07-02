FROM openjdk:17-slim
VOLUME /tmp
COPY target/notification-service-1.0-SNAPSHOT.jar notification-service.jar
ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/notification-service.jar"]
