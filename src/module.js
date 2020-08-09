console.log('work!')

async function start() {
    await Promise.resolve('async working')
}

start().then(console.log)