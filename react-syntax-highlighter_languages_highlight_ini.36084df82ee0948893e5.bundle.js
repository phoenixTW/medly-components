(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{1614:function(module,exports){module.exports=function(hljs){var STRING={className:"string",contains:[hljs.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]};return{aliases:["toml"],case_insensitive:!0,illegal:/\S/,contains:[hljs.COMMENT(";","$"),hljs.HASH_COMMENT_MODE,{className:"section",begin:/^\s*\[+/,end:/\]+/},{begin:/^[a-z0-9\[\]_-]+\s*=\s*/,end:"$",returnBegin:!0,contains:[{className:"attr",begin:/[a-z0-9\[\]_-]+/},{begin:/=/,endsWithParent:!0,relevance:0,contains:[{className:"literal",begin:/\bon|off|true|false|yes|no\b/},{className:"variable",variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)}/}]},STRING,{className:"number",begin:/([\+\-]+)?[\d]+_[\d_]+/},hljs.NUMBER_MODE]}]}]}}}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_ini.36084df82ee0948893e5.bundle.js.map