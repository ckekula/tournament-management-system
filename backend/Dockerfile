FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
