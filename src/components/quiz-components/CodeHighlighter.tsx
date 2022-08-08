import Highlight, { defaultProps, Language } from 'prism-react-renderer'

type Props = {
  code: string
  lang: Language
}

export const CodeHighlighter = ({ code, lang }: Props) => (
  <Highlight {...defaultProps} code={code} language={lang}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
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
