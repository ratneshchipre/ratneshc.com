import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const components: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => <Heading as="h1" {...props} />,
  h2: (props: React.ComponentProps<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: React.ComponentProps<"h3">) => <Heading as="h3" {...props} />,
  h4: (props: React.ComponentProps<"h4">) => <Heading as="h4" {...props} />,
  h5: (props: React.ComponentProps<"h5">) => <Heading as="h5" {...props} />,
  h6: (props: React.ComponentProps<"h6">) => <Heading as="h6" {...props} />,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
};

// const options: MDXRemoteProps["options"] = {
//   mdxOptions: {
//     remarkPlugins: [remarkGfm, remarkCodeImport],
//     rehypePlugins: [
//       [
//         rehypeExternalLinks,
//         { target: "_blank", rel: "nofollow noopener noreferrer" },
//       ],
//       rehypeSlug,
//       rehypeComponent,
//       () => (tree) => {
//         visit(tree, (node) => {
//           if (node?.type === "element" && node?.tagName === "pre") {
//             const [codeEl] = node.children
//             if (codeEl.tagName !== "code") {
//               return
//             }

//             node.__rawString__ = codeEl.children?.[0].value
//           }
//         })
//       },
//       [
//         rehypePrettyCode,
//         {
//           theme: {
//             dark: "github-dark",
//             light: "github-light",
//           },
//           keepBackground: false,
//           onVisitLine(node: LineElement) {
//             // Prevent lines from collapsing in `display: grid` mode, and allow empty
//             // lines to be copy/pasted
//             if (node.children.length === 0) {
//               node.children = [{ type: "text", value: " " }]
//             }
//           },
//         },
//       ],
//       () => (tree) => {
//         visit(tree, (node) => {
//           if (node?.type === "element" && node?.tagName === "figure") {
//             if (!("data-rehype-pretty-code-figure" in node.properties)) {
//               return
//             }

//             const preElement = node.children.at(-1)
//             if (preElement.tagName !== "pre") {
//               return
//             }

//             preElement.properties["__withMeta__"] =
//               node.children.at(0).tagName === "figcaption"
//             preElement.properties["__rawString__"] = node.__rawString__
//           }
//         })
//       },
//       rehypeCodeRawString,
//       rehypeHighlightCode,
//       rehypeHighlightCodeRawString,
//       rehypeNpmCommand,
//       [rehypeAddQueryParams, UTM_PARAMS],
//     ],
//   },
// };

export function MDX({ code }: { code: string }) {
  return <MDXRemote source={code} components={components} />;
}
