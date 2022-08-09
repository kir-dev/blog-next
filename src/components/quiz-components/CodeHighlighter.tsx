import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

type Props = {
  code: string
  lang: Language
}

export const CodeHighlighter = ({ code, lang }: Props) => (
  <Highlight {...defaultProps} code={code} language={lang} theme={dracula}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={{ ...style, padding: '1rem', borderRadius: '0.25rem' }}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
