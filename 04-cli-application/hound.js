const readline = require('readline');

const rl = readline.createInterface({
    terminal: true,
    input: process.stdin,
    output: process.stdout,
    prompt: '=> '
});

const Hound = function Hound(questions = []) {
    if (!Array.isArray(questions)) throw new Error("Wrong Type: Questions should be an array");
    this.questions = questions;
}

Hound.prototype.askQuestion = function askQuestion(question) {

    return new Promise((resolve, reject) => {
        rl.question(`\n${question} >> `, (answer) => {
            resolve(answer);
        });
    });
}

Hound.prototype.sniff = async function sniff() {
    const answers = [];
    for (const question of this.questions) {
        const answer = await this.askQuestion(question);
        const pos = rl.getCursorPos();
        const cur = rl.cursor;
        console.log(pos, cur);
        answers.push(answer);
    }

    return answers;
}

Hound.prototype.nudge = async function nudge(question) {
    const options = ['y', 'yes', 'n', 'no'];
    let answer;

    while (true) {
        answer = await this.askQuestion(`${question} [Y/n]`);

        if (answer === '') {
            answer = 'yes';
        }

        answer = answer.toLowerCase();

        if (!options.includes(answer)) {
            console.log('bad answer, dude...');
        } else {
            break;
        }
    }
}

Hound.prototype.mark = function mark(input) {
    rl.write(input);
}

Hound.prototype.endSniff = function endSniff() {
    rl.close();
}

module.exports = Hound;