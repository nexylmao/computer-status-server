package nexylmao.computerstatusserver.repositories

import nexylmao.computerstatusserver.models.ComputerStatus
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.repository.query.Param

interface ComputerRepository : MongoRepository<ComputerStatus, String> {
    fun findByName(@Param("name") name: String): ComputerStatus?
}
