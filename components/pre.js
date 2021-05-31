import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Pre = ({ children, className }) => {
  const lang = className.split('-')[1]
  return (
    <SyntaxHighlighter language={lang} style={materialOceanic}>
      {children}
    </SyntaxHighlighter>
  )
}

export default Pre
