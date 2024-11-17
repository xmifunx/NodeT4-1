#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateHeadOrTail(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const logFile = 'games.log';

const startHeasOrTail = () => {
    rl.question('Необходимо очистить файл логов? (да/yes/y или нет/no/n): ', (answer) => {
        console.log(answer);
        if (answer === 'да' || answer === 'yes' || answer === 'y') {
            fs.writeFileSync(logFile, '', 'utf8');
            console.log('Лог очищен.');
            console.log('"Орёл или Решка"! До первой победы.');
            game();
        } else if (answer === 'нет' || answer === 'no' || answer === 'n') {
            console.log('Лог оставлен без изменений.');
            console.log('"Орёл или Решка"! До первой победы.');
            game();
        } else {
            startHeasOrTail();
        }
    });
};

function logResult(result, logFile) {
    fs.appendFileSync(logFile, `${result}\n`, 'utf8');
}

const game = () => {
    console.log(`Лог игры будет сохранен в файле: ${logFile}`);
    const sideOfCoin = generateHeadOrTail(1, 2);
    console.log('Новый бросок осуществлён - Орёл или Решка?');
    logResult('осуществлён новый бросок', logFile);
    console.log('Для игры введите 1 - Орёл, или 2 - Решка.');
    rl.question('Введите число: ', (answer) => {
        logResult(answer, logFile);        
        const guess = parseInt(answer);

        console.log(guess);

    if (isNaN(guess)) {
        const errText = 'Осуществлен некорректный ввод - необходимо ввести цифры 1 или 2.';
        console.log(errText);
        logResult(errText, logFile);
        game();
        return;
    } else if (guess < 1 || guess > 2) {
        const errText = 'Осуществлен некорректный ввод - допустимые цифры только 1 и 2.';
        console.log(errText);
        logResult(errText, logFile);
        game();
        return;
    }

    if (guess !== sideOfCoin) {
        const result = 'Вы не угадали!';
        console.log(result);
        console.log(`Попробуйте еще раз`);
        logResult(result, logFile);
        game();
        return;
    }
    if (guess === sideOfCoin) {
        if (sideOfCoin === 1) {
            const result = 'Вы угадали, это Орёл!';
            console.log(result);
            console.log(`You win!`);
            logResult(result, logFile);
            rl.close();
        }
        if (sideOfCoin === 2) {
            const result = 'Вы угадали, это Решка!';
            console.log(result);
            console.log(`You win!`);
            logResult(result, logFile);
            rl.close();
        }
    return;
    }
    game();
  });
};

startHeasOrTail();