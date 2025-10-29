import "ace-builds/src-noconflict/mode-javascript";
import ace from "ace-builds";

class BpjsHighlightRules extends ace.require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules {
    constructor() {
        super();
        let JSRules = this.getRules();
        JSRules.no_regex = bpjsHighlightRules.concat(JSRules.no_regex);
        this.$rules = JSRules;
    }
}

class BpjsMode extends ace.require("ace/mode/javascript").Mode {
    constructor() {
        super();
        this.HighlightRules = BpjsHighlightRules;
    }
}

const registerSnippets = function (editor, session, mode, snippets) {
    const snippetText = createSnippets(snippets)
    const snippetManager = ace.require('ace/snippets').snippetManager

    const id = session.$mode.$id || '';
    const m = snippetManager.files[id]

    m.scope = mode
    m.snippetText = snippetText
    m.snippet = snippetManager.parseSnippetFile(snippetText, m.scope)
    snippetManager.register(m.snippet, m.scope)
}

const createSnippets = (snippets) => {
    return (Array.isArray(snippets) ? snippets : [snippets])
        .map(({name, code}) =>
            [
                'snippet ' + name,
                code
                    .split('\n')
                    .map(c => '\t' + c)
                    .join('\n'),
            ].join('\n')
        )
        .join('\n')
}

const bpjsSnippets = [
    {
        name: "bp.registerBThread",
        code: "bp.registerBThread(\"Your bt name\", function () {\n\n});",
    },
    {
        name: "bp.log.info",
        code: "bp.log.info(\"Your log goes here\")",
    },
    {
        name: "bp.log.error",
        code: "bp.log.error(\"Your log goes here\")",
    },
    {
        name: "bp.sync({request: bp.Event(\"Your event goes here\")});",
        code: "bp.sync({request: bp.Event(\"Your event goes here\")});",
    },
    {
        name: "bp.sync({waitFor: bp.Event(\"Your event goes here\")});",
        code: "bp.sync({waitFor: bp.Event(\"Your event goes here\")});",
    },
    {
        name: "bp.Event",
        code: "bp.Event(\"Your event goes here\")"
    }
];

const bpjsHighlightRules = [
    {
        token: "keyword",
        regex: "bp"
    },
    {
        token: "comment",
        regex: /(\.)(sync|Event|registerBThread)\b/
    },
    {
        token: "keyword.operator",
        regex: /(block|request|waitFor)\b/
    }
];

export const editorThemes = {
    light: [
        "chrome",
        "clouds",
        "crimson_editor",
        "dawn",
        "dreamweaver",
        "eclipse",
        "github",
        "iplastic",
        "katzenmilch",
        "kuroir",
        "solarized_light",
        "sqlserver",
        "tomorrow",
        "textmate",
        "xcode"
    ],
    dark: [
        "ambiance",
        "chaos",
        "clouds_midnight",
        "cobalt",
        "dracula",
        "gob",
        "gruvbox",
        "idle_fingers",
        "kr_theme",
        "merbivore_soft",
        "mono_industrial",
        "monokai",
        "merbivore",
        "nord_dark",
        "pastel_on_dark",
        "solarized_dark",
        "tomorrow_night",
        "tomorrow_night_blue",
        "tomorrow_night_bright",
        "tomorrow_night_eighties",
        "vibrant_ink",
        "terminal",
        "twilight",
    ],
}

export const annotations = [
    {
        row: 0, // must be 0 based
        column: 0, // must be 0 based
        text: "error.message", // text to show in tooltip
        type: "error"
    },
    {
        row: 1, // must be 0 based
        column: 0, // must be 0 based
        text: "error.message", // text to show in tooltip
        type: "warn"
    },
    {
        row: 2, // must be 0 based
        column: 0, // must be 0 based
        text: "error.message", // text to show in tooltip
        type: "error"
    }
]; // not working at the moment

export const setBpjsMode = function (editor, session) {
    registerSnippets(editor, session, "javascript", bpjsSnippets)
    session.setMode(new BpjsMode())
}



