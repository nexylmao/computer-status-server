package nexylmao.computerstatusserver.repositories

import nexylmao.computerstatusserver.models.ComputerStatus
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.repository.query.Param
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "ComputerStatus", path = "computers")
interface ComputerRepository : MongoRepository<ComputerStatus, String> {
    fun findByName(@Param("name") name: String): ComputerStatus?
}
