var jsonfixtures = {};

jsonfixtures.valid = '{"url":"https://validator.nu","messages":[],"language":"en"}';

jsonfixtures.invalid = '{"url":"http://localhost","messages":[{"type":"error","lastLine":1,"lastColumn":157,"firstColumn":91,"message":"Internal encoding declaration “utf-8” disagrees with the actual encoding of the document (“windows-1252”).","extract":"GB\\"><head><meta content=\\"text/html; charset=UTF-8\\" http-equiv=\\"Content-Type\\"><meta ","hiliteStart":10,"hiliteLength":67}],"language":"en"}';

jsonfixtures.warnings = '{"url":"http://localhost","messages":[{"type":"info","lastLine":78,"lastColumn":37,"firstColumn":1,"subType":"warning","message":"Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections.","extract":"ills</h2>\\n<section class=\\"container-fluid row\\">\\n<ul c","hiliteStart":10,"hiliteLength":37}],"language":"en"}';

jsonfixtures.suppressed = '{}';
