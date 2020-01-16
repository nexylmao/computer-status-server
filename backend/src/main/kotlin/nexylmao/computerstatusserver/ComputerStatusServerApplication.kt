package nexylmao.computerstatusserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ComputerStatusServerApplication

fun main(args: Array<String>) {
	runApplication<ComputerStatusServerApplication>(*args)
}
