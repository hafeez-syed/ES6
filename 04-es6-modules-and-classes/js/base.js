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

consoleAndDisplayResults('starting base.js', divId);
import {PI} from 'js/module_loading_sequence.js';
consoleAndDisplayResults('ending base.js', divId);
consoleAndDisplayResults('check above the Hoisted module import log', divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import myName from 'js/default.js';
consoleAndDisplayResults('my name is ' + myName, divId);
import {default as myFullName} from 'js/default.js';
consoleAndDisplayResults('My Full name is ' + myFullName, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import someValue from 'js/ambiguous.js';
consoleAndDisplayResults('someValue is ' + someValue, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import name from 'js/exporting_default.js';
consoleAndDisplayResults('default name is ' + name, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);

import * as values from 'js/wildcard.js';
consoleAndDisplayResults('value is ::: ' , divId);
consoleAndDisplayResults(values.email, divId);
consoleAndDisplayResults(values.phone, divId);
consoleAndDisplayResults('\n_________________________________________________________\n\n', divId);
