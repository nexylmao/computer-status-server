package nexylmao.computerstatusserver.controllers

import nexylmao.computerstatusserver.models.ComputerStatus
import nexylmao.computerstatusserver.repositories.ComputerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/computers")
class ComputerController(
        @Autowired
        val repository: ComputerRepository
) {

    @GetMapping
    fun getAll(): List<ComputerStatus> {
        return repository.findAll()
    }

    @PutMapping
    fun receiveStatus(@RequestBody status: ComputerStatus): String {
        var entity = repository.findByName(status.name)
        if (entity != null) {
            entity = status
            repository.save(entity)
        } else {
            repository.save(status)
        }
        return "Success!"
    }

}