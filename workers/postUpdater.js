// const postUpdater = () => {
//     let sum = 0;
//     for (let i = 0; i < 9999; i++) {
//         sum += i;
//     };
//     return sum;
// };
//
// process.on('message', (msg) => {
//     console.log(msg)
//     const sum = postUpdater();
//     process.send(sum);
// });

import {parentPort} from 'worker_threads';

parentPort.on('message', (message) => {
    switch (message.command){
        case 'RUN':
            console.log('run', message.data.id);
            setTimeout(() => {
                parentPort.postMessage("Completed: " + message.data.id)
            }, 10000);
    }
});