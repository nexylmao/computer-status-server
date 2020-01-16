package nexylmao.computerstatusserver.models

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.math.BigInteger
import kotlin.collections.HashMap

@Document(collection = "ComputerStatus")
class ComputerStatus(
        @Id
        var name: String,
        var arch: String,
        var os: String,
        var user: String,
        var cpu: HashMap<Int, String>,
        var totalMemory: Int,
        var usedMemory: Int,
        var uptime: BigInteger
)
