FROM openjdk:17-slim
VOLUME /tmp
COPY target/discovery-server-1.0-SNAPSHOT.jar discovery-server.jar
ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/discovery-server.jar"]
