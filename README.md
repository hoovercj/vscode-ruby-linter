# README

"ruby-linter" is a wrapper for `ruby -wc`.

It expects ruby to be installed and already added to the path. If it is installed but cannot be found, add the path to your preferences as seen below.

```json
{
	"ruby.linter.executablePath": "PathToExecutable"
}
```

## Configuration:
There are various options that can be configured by making changes to your user or workspace preferences.

### Lint onType or onSave or not at all
By default the linter will lint on the fly but can be changed to linting as you save. Note that linting on save is most useful when auto-save is on. Use the setting below if to change the behavior with the values `onType`, `onSave`, and `off`.

```json
{
	"ruby.linter.run": "onType"
}
```

## Acknowledgements
The extension architecture is based off of the PHPValidationProvider from the built-in [php extension](https://github.com/Microsoft/vscode/tree/master/extensions/php).