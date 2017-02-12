export let projectId = 99;
export let project = {
    projectId: 99
};

export let project2 = {
    projectId: 8000
};

export function showProject(divId) {
    consoleAndDisplayResults(project2.projectId, divId);
}

export function showOriginal(divId) {
    consoleAndDisplayResults('in original', divId);
}

export function updateFunction(divId) {
    showOriginal = function () {
        consoleAndDisplayResults('in updated', divId);
    };
}