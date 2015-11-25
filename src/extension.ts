import * as vscode from 'vscode'; 

import RubyLintingProvider from './features/rubyLinter';

import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {	
	let linter = new RubyLintingProvider();	
	linter.activate(context.subscriptions);	
}
