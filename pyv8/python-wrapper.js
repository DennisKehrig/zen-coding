/**
 * Simple function alias to run Zen Coding action.
 * <code>editorProxy</code> object should be defined
 * in concrete plugin implementation.
 */
function pyRunAction(name) {
	return emmet.require('actions').run(name, editorProxy);
}

function pyAddUserSnippets(snippets, reset) {
	var res = emmet.require('resources');
	var utils = emmet.require('utils');
	var curSnippets = {};
	if (!reset) {
		curSnippets = res.getVocabulary('user') || {};	
	}

	res.setVocabulary(utils.deepMerge(curSnippets, snippets), 'user');
}

function pyMergeJSON() {
	var base = {};
	var utils = emmet.require('utils');
	_.each(arguments, function(item) {
		base = utils.deepMerge(base, item);
	});

	return base;
}

function pySetUserSnippets() {
	var snippets = pyMergeJSON.apply(this, arguments);
	emmet.require('resources').setVocabulary(snippets, 'user')
}

function pySetUserPreferences() {
	var prefs = pyMergeJSON.apply(this, arguments);
	emmet.require('preferences').load(prefs);
}

emmet.define('file', function(require, _) {
	return {
		read: function(path) {
			return _.map(pyFile.read(path) || [], function(b) {
				return String.fromCharCode(b);
			}).join('');
		},

		locateFile: function(editorFile, fileName) {
			return pyFile.locate_file(editorFile, fileName);
		},

		createPath: function(parent, fileName) {
			return pyFile.create_path(parent, fileName);
		},

		save: function(file, content) {
			return pyFile.save(file, content);
		},

		getExt: function(file) {
			var m = (file || '').match(/\.([\w\-]+)$/);
			return m ? m[1].toLowerCase() : '';
		}
	};
});