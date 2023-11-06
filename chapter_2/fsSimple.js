// Вам нужно прочитать данные из файла file1.txt, после прочтения полученные данные надо записать в файл file2.txt. 
// Реализовать это надо 3 разными способами, для каждого способа своя функция:
// - readAndWriteCallbackHell() - в данной функции вы должны использовать только передачу коллбека в ассинхронную функцию.
// - readAndWritePromises() - в данной функции вы должны использовать промисы и then.
// - readAndWriteAsyncAwait() - в данной функции можно использовать async await.

import fs from 'fs';
import fsPromises from 'fs/promises';

const filepathRead = 'chapter_2/files/fsSimple/file1.txt';
const filepathWrite = 'chapter_2/files/fsSimple/file2.txt';

export function readAndWriteCallbackHell(callback) {
  fs.readFile(filepathRead, callback);
}

export function readAndWrite(err, data) {
  if (err) throw Error(err);
  console.log("read from '" + filepathRead + "'" + " - OK!");
  console.log("with data: '" + data.toString() + "'\n");

  if (data == "") throw Error('Empty data');
  fs.writeFile(filepathWrite, data, writeToFile);
}

function writeToFile() {
  console.log("write to '" + filepathWrite + "'" + " - OK!");
}

export const readAndWritePromises = () => {
  fsPromises.readFile(filepathRead)
    .then(data => {
      readAndWrite('', data);
    })
    .catch(err => {
      throw Error(err);
    });
};

export const readAndWriteAsyncAwait = async () => {
  try {
    const data = await fsPromises.readFile(filepathRead);
    readAndWrite('', data);
  } catch (err) {
    throw Error(err);
  }
};
