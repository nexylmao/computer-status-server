window.onload = function () {

    const generateHtml = async function(data) {

        let id = data._links.self.href.split('/');
        id = id[id.length - 1];

        return `<div class="col-4 m-2 card text-dark p-3">
                    <h5 class="mx-auto">${id}</h5>
                    <h6 class="mx-auto">${data.os} (${data.arch})</h6>
                    <h6 class="mx-auto">Logged in user : ${data.user}</h6>
                    <div class="row">
                        <div class="card col-3 mx-auto my-3 p-2" id="memory">
                            <h6 class="mx-auto">Memory</h6>
                            <p class="m-auto">
                                ${data.usedMemory} MB
                                ${data.totalMemory} MB
                                ${Math.round(data.usedMemory / data.totalMemory * 100)}% used
                            </p>
                        </div>
                        <div class="card col-8 mx-auto my-3 p-2" id="cpu">
                            <h6 class="mx-auto">CPU</h6>
                            <p>${JSON.stringify(data.cpu)}</p>
                        </div>
                    </div>
                </div>`;
    }

    const routine = async function () {
        let data = await this.fetch("http://localhost:8080/computers");

        let container = this.document.getElementById('container');
        container.innerHTML = '';

        let computers = (await data.json())._embedded.ComputerStatus;
        computers.forEach(async computer => {
            container.innerHTML += await generateHtml(computer);
        });
    }

    routine();

    this.setInterval(async () => {
        routine();
    }, 10000);
};
