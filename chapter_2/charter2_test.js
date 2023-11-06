import './fsSimple.js';
import { readAndWriteCallbackHell, readAndWrite, readAndWritePromises, readAndWriteAsyncAwait } from './fsSimple.js';
import { progressbar, pringFirstLine, dirPath } from './fsHard.js';

// Задание 3
readAndWriteCallbackHell(readAndWrite);
readAndWritePromises();
readAndWriteAsyncAwait();

// Задание 4
await progressbar(dirPath, pringFirstLine);