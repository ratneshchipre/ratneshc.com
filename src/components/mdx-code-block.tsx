import type { NpmCommands } from "@/types/unist";
import { cn } from "@/lib/utils";

import { CodeBlockCommand } from "./code-block-command";
import { CopyButton } from "./copy-button";
import { getIconForLanguageExtension } from "./icons";

export const mdxCodeBlockComponents = {
  figure({ className, ...props }: React.ComponentProps<"figure">) {
    const hasPrettyCode = "data-rehype-pretty-code-figure" in props;

    return (
      <figure
        className={cn(hasPrettyCode && "not-prose", className)}
        {...props}
      />
    );
  },
  figcaption: ({ children, ...props }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null;

    const hasCodeTitle = "data-rehype-pretty-code-title" in props;

    return (
      <figcaption {...props}>
        {iconExtension}
        {hasCodeTitle ? (
          <p className="truncate font-geist-mono text-sm font-normal">
            {children}
          </p>
        ) : (
          children
        )}
      </figcaption>
    );
  },
  pre({
    __withMeta__,
    __rawString__,

    __pnpm__,
    __yarn__,
    __npm__,
    __bun__,

    className,
    children,
    ...props
  }: React.ComponentProps<"pre"> & {
    __withMeta__?: boolean;
    __rawString__?: string;
  } & NpmCommands) {
    const isNpmCommand = __pnpm__ && __yarn__ && __npm__ && __bun__;

    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __pnpm__={__pnpm__}
          __yarn__={__yarn__}
          __npm__={__npm__}
          __bun__={__bun__}
        />
      );
    }

    return (
      <div className="group relative">
        <pre
          className={cn(
            "max-h-[600px] overflow-x-auto selection:bg-foreground selection:text-primary-foreground focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          tabIndex={0}
          aria-label="Code snippet"
          {...props}
        >
          {children}
        </pre>
        {__rawString__ && (
          <>
            <div className="absolute top-3 right-2 z-20 flex items-center gap-2">
              <CopyButton
                size="icon-sm"
                variant="ghost"
                text={__rawString__}
                className={cn(
                  "rounded-md bg-code text-muted-foreground",
                  __withMeta__ && "translate-y-[-2.95rem]"
                )}
              />
            </div>
          </>
        )}
      </div>
    );
  },
};
