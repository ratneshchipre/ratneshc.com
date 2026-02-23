import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Code, Heading } from "./ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const components: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Heading as="h1" className="font-semibold" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Heading as="h2" className="font-semibold" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Heading as="h3" className="font-semibold" {...props} />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Heading as="h4" className="font-semibold" {...props} />
  ),
  h5: (props: React.ComponentProps<"h5">) => (
    <Heading as="h5" className="font-semibold" {...props} />
  ),
  h6: (props: React.ComponentProps<"h6">) => (
    <Heading as="h6" className="font-semibold" {...props} />
  ),
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  code: Code,
  a: ({ href, ...props }: React.ComponentProps<"a">) => {
    const isInternalLink =
      href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }

    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...props} />
    );
  },
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
