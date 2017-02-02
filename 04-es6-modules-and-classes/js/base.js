var divId = 'block1';

consoleAndDisplayResults('Hello World, from a module!', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

//projectId = 99;
consoleAndDisplayResults('ReferenceError: projectId is not defined', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import {projectId} from 'js/module0.js';
consoleAndDisplayResults(projectId, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import {projectId1, projectName1} from 'js/module0a.js';
consoleAndDisplayResults(`${projectName1} has id: ${projectId1}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import {projectId1 as id2, projectName1 as project2} from 'js/module0a.js';
consoleAndDisplayResults(`${project2} has id: ${id2}`, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
