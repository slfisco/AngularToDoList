name := """java-play-angular-seed"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(guice, jdbc, ws, evolutions)
libraryDependencies += javaJdbc % Test

libraryDependencies += "org.glassfish.jaxb" % "jaxb-core" % "2.3.0.1"
libraryDependencies += "org.glassfish.jaxb" % "jaxb-runtime" % "2.3.2"

PlayKeys.devSettings += "play.server.http.address" -> "localhost"

// Test Database
libraryDependencies += "com.h2database" % "h2" % "1.4.194"
libraryDependencies += "io.ebean" % "ebean" % "11.28.3"
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.5"

// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test

// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))

libraryDependencies += "org.mindrot" % "jbcrypt" % "0.3m"