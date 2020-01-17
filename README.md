# computer-status-server
CSS (Computer Status Server) - used as a lightweight server to monitor pc statuses. Uses nodejs for gathering data about the computer (through the os library). Sends it over HTTP to a backend, which can display the data too.

This is a small project I written in 2 days worth of time, and is purely basic. Probably the simplest way of implementing such system, without complications,
and ready to be worked on and improved (which I encourage people to do so, forking my repo or making their own). This is a basis for more, and you're free to use it/upgrade it/compete with it/learn from it. I'm always up for questions about it, so email me freely.

### What is this project?

This is a simple server, meant to keep track of state of computers. As data, it is using data provided by the `os` library from [NodeJS](https://nodejs.org/en/). It stores everything in a [MongoDB](https://www.mongodb.com/) database, using [Spring Boot](https://spring.io/projects/spring-boot) for backend, with JPA for the DB. And a simple frontend to visualize, written in static files.

Data that is stored, contains:
```
{
    "name": "sample-name", // Name of your computer
    "arch": "x86", // Architecture of running OS
    "os": "Linux 5.0.0-38-generic", // Type and version of OS (kernel)
    "user": "sample-user", // Name of user logged in
    "cpu": { // Information about CPU utilization and clock speed (in MHz)
        0: "3600|20%",
        1: "3600|21%",
        2: "3600|16%",
        3: "3600|13%",
    },
    "totalMemory": 16062, // Total RAM memory (in MB)
    "usedMemory": 4023, // Used RAM memory (in MB)
    "uptime": 5040 // Uptime of computer (in seconds)
}
```

Here we will go over parts, and explaining them a little bit more, and afterwards, we're going to go over deploying.

That data, is sent every couple seconds by a js script (that runs on Node) from computers. The script doesn't use any external libraries, therefore deploying it should really easy (just installing NodeJS if you don't have it installed).

Over HTTP it comes to the backend. Written in Kotlin on Spring Boot, using a minimal amount of libraries is also minimal, but it does JPA. For it, you'll need [Java](https://adoptopenjdk.net/) runtime and a MongoDB database.