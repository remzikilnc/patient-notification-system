FROM openjdk:17-slim
VOLUME /tmp
COPY target/notification-service-1.0-SNAPSHOT.jar notification-service.jar
ENTRYPOINT ["java","-jar","/notification-service.jar"]
