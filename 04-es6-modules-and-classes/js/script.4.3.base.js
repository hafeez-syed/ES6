var divId = 'block1';

import { projectId } from 'js/script.4.3.module1.js'
//projectId = 8000;
consoleAndDisplayResults('ReferenceError: `projectId` is read-only', divId);
//consoleAndDisplayResults(projectId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import { project } from 'js/script.4.3.module1.js'
project.projectId = 8000;
consoleAndDisplayResults(project.projectId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import {project2, showProject} from 'js/script.4.3.module1.js';
project2.projectId = 999;
showProject(divId)
consoleAndDisplayResults(project2.projectId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import {showOriginal, updateFunction} from 'js/script.4.3.module1.js';
showOriginal(divId);
updateFunction(divId);
showOriginal(divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
