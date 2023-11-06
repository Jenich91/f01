// Когда пользователь загружает страницу - данные с сервера поступают на клиент асинхронно и неравномерно.
// Давайте смоделируем такое поведение при помощи файловой системы вашего проекта. Вам предстоит написать progressbar, применимый не к статически заданному времени, а к размеру "загружаемых" файлов. На основании полученых размеров файлов реализуйте свой progressbar.
// Ваш прогрессбар будет заполняться до общего размера всех имеющихся файлов в папке. Если у вас есть файл размером 5Кб, при общем размере всех файлов - 10 Кб, то ваша полоса загрузки после обработки такого файла должна заполниться на 50% (100% * (5Кб / 10Кб)).
// Сделайте полосу загрузки(progressbar) в Консоли Терминала. Не в браузере! Она должна увеличиваться с каждым новым загруженным файлом.

import fs from 'fs';
import path from 'path';
import readline from 'readline';

export const dirPath = 'chapter_2/files/fsHard/';

async function file_list(dir, results = []) {
  let files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (let file of files) {
    let full_path = path.join(dir, file.name);
    if (file.isDirectory()) {
      await file_list(full_path, results);
    } else {
      results.push(full_path);
    }
  }
  return results;
}

// получить список путей до всех файлов в папке
const getFileList = async (dir) => {
  const filesPromise = file_list(dir, []);
  let files;
  await filesPromise.then(result => {
    files = result;
  });
  return files;
};

// const fileList = await getFileList(dirPath);
// console.log("Files:"+fileList);

// получить общий размер файлов
async function getTotalSize(files) {
  let totalSize = 0;
  for (let file of files) {
    const fileStats = await fs.promises.stat(file);
    totalSize += fileStats.size;
  }
  return totalSize;
}

// const totalSize = await getTotalSize(fileList);
// console.log("TotalSize:"+totalSize);

// получить размер файла
async function getFileSizeInBytes(filename) {
  const fileStats = await fs.promises.stat(filename);
  const { size: fileSize } = fileStats;
  return fileSize;
}

// console.log("Somefile size:"+await getFileSizeInBytes('chapter_2/files/fsHard/file5.txt'));

// вычислить какой процент составляет размер файла от размера папки
const calculatePercentage = async (file, files) => {
  const fileSize = await getFileSizeInBytes(file);
  const totalSize = await getTotalSize(files);
  const percentage = (100 * fileSize) / totalSize;
  return percentage;
};

// console.log("Percentage:", await calculatePercentage('chapter_2/files/fsHard/file3.txt', fileList));

// Сделайть полосу загрузки(progressbar) в консоли терминала, помимо папки с файлами нужно передать callback что делать каждым файлом
export const progressbar = async (dir, callbackForFile) => {
  // написать в консоль пустой progressbar
  let barStr = "[" + " ".repeat(100) + "]";
  let fillerStr = "";
  console.log('0%');
  console.log(barStr + "\n");
  const fileList = await getFileList(dir);

  // перебрать все файлы в папке, получая с каждого файла его процент от общего размера папки
  for (let file of fileList) {
    callbackForFile(file);

    const percentage = await calculatePercentage(file, fileList);
    let newPartLength = Math.ceil(Math.round(percentage / 100 * 100));

    fillerStr = fillerStr + "*".repeat(newPartLength);
    barStr = "[" + fillerStr + " ".repeat(barStr.length - 1 - fillerStr.length - 1) + "]";

    console.log(Math.round(percentage) + '%');
    console.log(file);
    console.log(barStr + "\n");
  }
};

// for example
export async function pringFirstLine(pathToFile) {
  const readable = fs.createReadStream(pathToFile);
  const reader = readline.createInterface({ input: readable });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });
  readable.close();
  console.log(line + "\n");
}

