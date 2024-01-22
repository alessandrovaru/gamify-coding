// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gamify-coding" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let motivationalPhrases = [
			'¡Sigue así, lo estás haciendo genial!',
			'¡No te rindas, el éxito está cerca!',
			'¡Cada línea de código te acerca a tu objetivo!',
			'¡La práctica hace al maestro!',
			'¡Tu esfuerzo vale la pena!',
			'¡Pronto un lolsito en Discord!',
			'Cada día mejoras más y más',
	];

	let timeCounter = 0;
	let points = 0;
	let level = 1;

	let intervalId = setInterval(() => {
		timeCounter++;
		if (timeCounter === 2) {
				points += 50;
				let nextLevelPoints = level * 100;
				if (points >= nextLevelPoints) {
						level++;
						vscode.window.showInformationMessage(`Level Up! You're now level ${level}. Total XP: ${points}`, 'OK');
						points = 0;
				} else {
						let remainingPoints = nextLevelPoints - points;
						vscode.window.showInformationMessage(`+50 XP! Progress: ${points}/${nextLevelPoints} to next level.`, 'OK');
				}
				timeCounter = 0;
		}
	}, 1000);

	let watcher = vscode.workspace.createFileSystemWatcher('**', false, true, false);

	watcher.onDidCreate(uri => {
			points += 25;
			let nextLevelPoints = level * 100;
			if (points >= nextLevelPoints) {
					level++;
					vscode.window.showInformationMessage(`Level Up! You're now level ${level}. Total XP: ${points}`,  'OK');
					points = 0;					
			} else {
					let remainingPoints = nextLevelPoints - points;
					vscode.window.showInformationMessage(`+25 XP for creating a file or folder. Progress: ${points}/${nextLevelPoints} to next level.`, 'OK');
			}
	});

	context.subscriptions.push(watcher);


	let disposable = vscode.commands.registerCommand('gamify-coding.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from gamify-coding!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
