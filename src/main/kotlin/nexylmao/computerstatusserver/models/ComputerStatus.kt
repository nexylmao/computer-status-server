package nexylmao.computerstatusserver.models

import org.springframework.data.annotation.Id
import kotlin.collections.HashMap

class ComputerStatus(
        @Id
        var id: String,
        var name: String,
        var arch: String,
        var os: String,
        var user: String,
        var cpu: HashMap<Int, Int>,
        var totalMemory: Int,
        var usedMemory: Int
)
