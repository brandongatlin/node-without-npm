const Hound = require('./hound.js');

const questions = [
    'One question',
    'Two question',
    'Three question',
    'Four question',
];

async function main() {
    const sniffer = new Hound(questions);

    // const answers = await sniffer.sniff();

    // answers.forEach((answer, i) => {
    //     sniffer.mark(`${questions[i]} answered with ${answer}\n`)
    // });

    const confirm = await sniffer.nudge("did you eat tacos today?");
    sniffer.mark(confirm);

    sniffer.endSniff();
}

main();