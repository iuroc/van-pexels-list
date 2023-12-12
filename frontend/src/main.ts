/// <reference types="vite/client" />
import van, { State } from 'vanjs-core'
import '../scss/main.sass'

const { button, textarea } = van.tags

interface Line {
    /** 当前行序号 */
    index: number
    /** 当前行文本 */
    text: string
    /** 光标在当前行的位置 */
    cursor: number
}

type GetLine = (text: string, position: number) => Line
/** 获取当前光标所在行数 */
const getLine: GetLine = (text, position) => {
    const lines: string[] = text.split('\n')
    for (let num = 0, i = 0; i < lines.length; i++) {
        let line: string = lines[i]
        num += line.length + 1
        if (position < num) return {
            index: i,
            text: line,
            cursor: line.length - num + position + 1
        }
    }
    return { index: 0, text: '', cursor: 0 }
}

const ifCursorAtSpace = (line: Line) => {
    const result = line.text.match(/^(\s*)/) as RegExpMatchArray
    return line.cursor <= result[1].length
}

const CodeEditor = (text: State<string>) => {
    return textarea({
        style: `
      width: 100%;
      outline: none;
      font-size: 20px;
      font-family: consolas;
      `,
        rows: 10,
        onkeydown(event) {
            if (event.key == 'Tab') {
                event.preventDefault()
                const position: number = event.target.selectionStart
                const positionEnd: number = event.target.selectionEnd
                const line = getLine(text.val, position)
                if (ifCursorAtSpace(line)) {
                    let frontText = text.val.substring(0, position)
                    let endText = text.val.substring(position)
                    ele.value = frontText + '    ' + endText
                    event.target.selectionStart = position + 4
                    event.target.selectionEnd = positionEnd + 4
                }
            }
        },
        oninput(event) {
            text.val = event.target.value
        },
        value: text
    })
}
const text = van.state(`public static void main(String[] args) {
  System.out.println("Hello World");
}`)

const ele = CodeEditor(text)
van.add(document.body, ele, button({
    onclick() {
        text.val = ''
    }
}, '清空'))