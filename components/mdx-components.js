import Pre from '../components/pre'

//pre -> kod kısımlarını temsil ediyor.
export const mdxComponents = {
  pre: ({ children }) => <Pre {...children.props} />
}
