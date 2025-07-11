import fs from 'fs/promises'
import markdownit from 'markdown-it'

(async () => {
    const md = markdownit({
        html: true,
        linkify: true,
        typographer: true
    })
    const rawCv = (await fs.readFile(__dirname + '/cv.md')).toString()
    const rawBase = (await fs.readFile(__dirname + '/base.html')).toString()
    const parsedHtml = md.render(rawCv)
    const html = rawBase.replace('<body>', `<body>${parsedHtml}`)
    // recreate locally
    await fs.rm(__dirname + '/dist', { recursive: true, force: true });
    await fs.mkdir(__dirname + '/dist')
    // Generate the CV html
    await fs.writeFile(__dirname + '/dist/index.html', html)
    // Generate the assets
    await fs.cp(__dirname + '/assets', __dirname + '/dist', { recursive: true });
})();