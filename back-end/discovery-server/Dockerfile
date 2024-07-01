FROM openjdk:17-slim
VOLUME /tmp
COPY target/discovery-server-1.0-SNAPSHOT.jar discovery-server.jar
ENTRYPOINT ["java","-jar","/discovery-server.jar"]