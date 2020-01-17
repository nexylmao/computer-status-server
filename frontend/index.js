function deleteId(id) {
    console.log(id);
}

window.onload = function () {

    const generateCpuHtml = async function(cores) {
        var html = '';

        for (core in cores) {
            const parts = cores[core].split('|');
            const clock = parts[0];
            const percentage = parts[1].replace('%', '');

            html += `
                    <small class="mx-auto">${clock}MHz / ${percentage}%</small>
                    <div class="progress m-2">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                            style="width: ${percentage}%" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>`;
        }

        return html;
    };

    const generateHtml = async function(data) {
        return `<div class="col-4 m-2 card text-dark p-3">
                    <h5 class="mx-auto">${data.id}</h5>
                    <h6 class="mx-auto">${data.os} (${data.arch})</h6>
                    <h6 class="mx-auto">Logged in user : ${data.user}</h6>
                    <div class="row">
                        <div class="card col-3 mx-auto my-3 p-2" id="memory">
                            <h6 class="mx-auto">Memory</h6>
                            <p class="m-auto">
                                ${data.usedMemory} MB<br/>
                                ${data.totalMemory} MB<br/>
                                ${Math.round(data.usedMemory / data.totalMemory * 100)}% used
                            </p>
                        </div>
                        <div class="container-fluid card col-8 mx-auto my-3 p-2" id="cpu">
                            <h6 class="row mx-auto">CPU (${Object.keys(data.cpu).length} cores)</h6>
                            ${await generateCpuHtml(data.cpu)}
                        </div>
                    </div>
                    <div class="row">
                        <div class="card w-100 mx-3 p-2" id="buttons">
                            <button type="button" class="btn btn-danger w-25" id="${data.id}")">
                                <small>Delete</small>
                            </button>
                        </div>
                    </div>
                </div>`;
    };

    const routine = async function () {
        let data = await this.fetch("http://localhost:8080/computers");

        let container = this.document.getElementById('container');
        container.innerHTML = '';

        let computers = (await data.json())._embedded.ComputerStatus;
        computers.forEach(async computer => {
            let id = computer._links.self.href.split('/');
            id = id[id.length - 1];
            computer.id = id;

            container.innerHTML += await generateHtml(computer);
            document.getElementById(id).onclick = async () => {
                let data = await this.fetch("http://localhost:8080/computers/" + id, {
                    method: 'DELETE'
                });

                location.reload();
            };
        });
    }

    routine();

    this.setInterval(async () => {
        routine();
    }, 10000);
};
