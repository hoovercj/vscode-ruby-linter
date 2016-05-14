'use strict';
import { workspace, Disposable, Diagnostic, DiagnosticSeverity, Range } from 'vscode';

import { LintingProvider, LinterConfiguration, Linter } from './utils/lintingProvider';

export default class RubyLintingProvider implements Linter {

	public languageId = 'ruby';
	
	public activate(subscriptions: Disposable[]) {
		let provider = new LintingProvider(this);
		provider.activate(subscriptions)
	}
	
	public loadConfiguration():LinterConfiguration {
		let section = workspace.getConfiguration(this.languageId);
		if (!section) return;
	
		return {
			executable: section.get<string>('linter.executablePath', 'ruby'),
			fileArgs: ['-wc'],
			bufferArgs: ['-wc'],
			extraArgs: [],			
			runTrigger: section.get<string>('linter.run', 'onType')
		}
	}
	
	public process(lines: string[]): Diagnostic[] {
		let diagnostics: Diagnostic[] = [];
		lines.forEach(function (line) {
			const regex = /.+:(\d+):\s*(.+?)[,:]\s(.+)/;
            const matches = regex.exec(line);
            if (matches === null) {
              return;
            }
            diagnostics.push({
				range: new Range(parseInt(matches[1]) - 1, 0, parseInt(matches[1]) - 1, Number.MAX_VALUE),			
				severity: matches[2].toLowerCase().includes("error") ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
				message: matches[3],
				code: null,
				source: ''
            });
		});
		return diagnostics;
	}
}