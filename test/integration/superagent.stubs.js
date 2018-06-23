const docs = {
  valid: `<!doctype html>
    <html lang=en>
    <head>
    <meta charset=utf-8>
    <title>blah</title>
    </head>
    <body>
    </body>
    </html>`,
  invalid: `<!doctype html>
    <html lang=en>
    <head>
    <meta charset=utf-8>
    <title></title>
    </head>
    <body>
    </body>
    </html>`
}

module.exports = [{
  pattern: 'https://valid/document',
  fixtures: () => docs.valid,
  get: (match, data) => ({ text: data })
},
{
  pattern: 'https://invalid/document',
  fixtures: () => docs.invalid,
  get: (match, data) => ({ text: data })
},
{
  pattern: 'https://validator.w3.org/nu/',
  fixtures: (match, params, headers, context) => {
    if (params.trim() === docs.valid.trim()) {
      return '{"messages":[]}'
    }
    if (params.trim() === docs.invalid.trim()) {
      return '{"messages":[{"type":"error","lastLine":5,"lastColumn":19,"firstColumn":12,"message":"Element “title” must not be empty.","extract":"   <title></title>\\n    <","hiliteStart":10,"hiliteLength":8}]}'
    }
  },
  post: (match, data) => ({ text: data })
}]
