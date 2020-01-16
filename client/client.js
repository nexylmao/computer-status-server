const os = require('os');
const fs = require('fs');
const http = require('http');

var file = {};

try {
    file = JSON.parse(fs.readFileSync("./connect.json"));
} catch (e) {
    console.error("connect.json file is malformed!");
    console.error(e);
    return 0;
}

const name = os.hostname();

const getTicks = async function () {
    var ticks = {};

    os.cpus().forEach((core, index) => {
        var totalTicks = 0;
        for (tick in core.times) {
            totalTicks += core.times[tick];
        }
        var idleTicks = core.times.idle;
        
        ticks[index] = {
            total: totalTicks,
            idle: idleTicks
        };
    });

    return ticks;
};

const getUsage = async function () {
    var cpus = {};

    const start = await getTicks();
    await new Promise(r => setTimeout(r, 1000));
    const end = await getTicks();

    const cores = os.cpus();
    for (let i = 0; i < cores.length; i++) {
        cpus[i] = `${cores[i].speed}|
        ${Math.round((1 - (end[i].idle - start[i].idle)/(end[i].total - start[i].total)) * 100, 0)}%`;
    }

    return cpus;
};

const constructStatusBody = async function () {
    const cpu = await getUsage();
    return {
        user: os.userInfo().username,
        cpu,
        totalMemory: Math.round(os.totalmem() / (1024 * 1024), 0),
        usedMemory: Math.round((os.totalmem() - os.freemem()) / (1024 * 1024), 0),
        uptime: os.uptime()
    }
};

const constructFullBody = async function () {
    var statusBody = await constructStatusBody();
    statusBody.name = name;
    statusBody.arch = os.arch();
    statusBody.os = os.type() + ' ' + os.release();
    return statusBody;
};

const routine = async function () {

    http.get({
        hostname: file.host,
        port: file.port,
        path: '/computer/search/findByName?name=' + name
    }, async data => {

        if (data.statusCode == 404) {
            const postData = JSON.stringify(await constructFullBody());

            const req = http.request({
                hostname: file.host,
                port: file.port,
                path: '/computers',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                }
            });
            req.write(postData);
            req.end();
        }

        setInterval(async () => {
            const patchData = JSON.stringify(await constructStatusBody());

            const req = http.request({
                hostname: file.host,
                port: file.port,
                path: '/computers/' + name,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': patchData.length
                }
            });
            req.write(patchData);
            req.end();
        }, 2000);
    });
};

routine();
