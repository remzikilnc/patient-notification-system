FROM openjdk:17-slim
VOLUME /tmp
COPY target/patient-service-1.0-SNAPSHOT.jar patient-service.jar
ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/patient-service.jar"]
