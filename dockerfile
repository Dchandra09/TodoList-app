from openjdk:17
ADD target/todo_api-0.0.1-SNAPSHOT.jar helloworld.jar
ENTRYPOINT [ "java", "-jar", "/helloworld.jar" ]