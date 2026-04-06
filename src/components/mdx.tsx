import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import {
  rehypeCodeRawString,
  rehypeHighlightCode,
  rehypeHighlightCodeRawString,
} from "@/lib/rehype-code-block";
import { rehypeNpmCommand } from "@/lib/rehype-npm-command";
import { rehypeComponent } from "@/lib/rehype-component";
import { remarkCodeImport } from "@/lib/remark-code-import";
import { cn } from "@/lib/utils";
import { rehypeAddQueryParams } from "@/lib/rehype-add-query-params";
import { UTM_PARAMS } from "@/config/site";

import { Code, Heading } from "./ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
} from "./ui/tabs";
import { FramedImage } from "./embed";
import { mdxCodeBlockComponents } from "./mdx-code-block";
import UnmountingDemo from "./blog/unmounting-demo";
import Callout from "./callout";
import ComponentPreview from "./component-preview";
import ComponentSource from "./component-source";
import CodeCollapsibleWrapper from "./code-collapsible-wrapper";
import { CodeTabs } from "./code-tabs";

const components: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Heading as="h1" className="font-semibold" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Heading as="h2" className="font-medium!" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Heading as="h3" className="font-medium!" {...props} />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Heading as="h4" className="font-medium!" {...props} />
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
  ...mdxCodeBlockComponents,
  code: Code,
  ComponentPreview,
  ComponentSource,
  CodeCollapsibleWrapper,
  CodeTabs,
  Callout,
  Steps: (props) => (
    <div
      className="md:ml-3.5 md:border-l md:pl-7.5 prose-h3:text-lg prose-h3:text-wrap"
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3 className={cn("step font-medium", className)} {...props} />
  ),
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
  Tabs,
  TabsList,
  TabsIndicator,
  TabsTrigger,
  TabsContent,
  TabsListInstallType: () => (
    <TabsList>
      <TabsTrigger value="cli">Command</TabsTrigger>
      <TabsTrigger value="manual">Manual</TabsTrigger>
      <TabsIndicator />
    </TabsList>
  ),
  FramedImage,
  UnmountingDemo,
};

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkCodeImport],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: "nofollow noopener noreferrer" },
      ],
      rehypeSlug,
      rehypeComponent,
      rehypeCodeRawString,
      rehypeHighlightCode,
      rehypeHighlightCodeRawString,
      rehypeNpmCommand,
      [rehypeAddQueryParams, UTM_PARAMS],
    ],
  },
};

export function MDX({ code }: { code: string }) {
  return <MDXRemote source={code} components={components} options={options} />;
}
