// Thanks @fumadocs & @ncdai

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Icons } from "@/components/icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const cache = new Map<string, string>();

type CopyState = "idle" | "done" | "error";

export function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = React.useState<CopyState>("idle");
  const [isCopying, setIsCopying] = React.useState(false);
  const operationRef = React.useRef(false);

  const handleCopy = async () => {
    if (operationRef.current) return;

    operationRef.current = true;

    const loadingTimer = setTimeout(() => {
      setIsCopying(true);
    }, 150);

    try {
      const cached = cache.get(markdownUrl);
      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(markdownUrl)
              .then((res) => res.text())
              .then((content) => {
                cache.set(markdownUrl, content);
                return content;
              }),
          }),
        ]);
      }
      setState("done");
    } catch {
      setState("error");
    } finally {
      clearTimeout(loadingTimer);
      setIsCopying(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      operationRef.current = false;
      setState("idle");
    }
  };

  return (
    <Button
      className="h-8 cursor-pointer gap-2 border-none pr-2 pl-2.5 font-geist-sans text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5"
      variant="secondary"
      aria-busy={isCopying}
      disabled={isCopying}
      onClick={handleCopy}
    >
      {state === "idle" ? (
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
      ) : state === "done" ? (
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
      ) : (
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
      )}
      <span className="max-[28rem]:hidden">Copy Page</span>
    </Button>
  );
}

function getPrompt(url: string, isComponent?: boolean) {
  if (isComponent) {
    return `I'm looking at this component documentation: ${url}
I want to use it in a React (TypeScript) project.
Help me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.
Be ready to answer follow-up questions and help debug issues based on the documentation.`;
  }

  return `Read ${url}, I want to ask questions about it.`;
}

export function ViewOptions({
  markdownUrl,
  isComponent = false,
}: {
  markdownUrl: string;
  isComponent?: boolean;
}) {
  const items = React.useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl;

    const q = getPrompt(fullMarkdownUrl, isComponent);

    const _items = [
      {
        title: "View as Markdown",
        href: fullMarkdownUrl,
        icon: Icons.markdown,
      },
      {
        title: "Open in GitHub",
        href: `https://github.com/ratneshchipre/ratneshc.com/blob/main/src/features/doc/content/${markdownUrl.split("/").slice(-1).join("/")}`,
        icon: Icons.github,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: Icons.openai,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.claude,
      },
      {
        title: "Open in Cursor",
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: q,
        })}`,
        icon: Icons.cursor,
      },
      {
        title: "Open in Grok",
        href: `https://grok.com/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.grok,
      },
      {
        title: "Open in Scira AI",
        href: `https://scira.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.scira,
      },
    ];

    if (isComponent) {
      _items.splice(2, 0, {
        title: "Open in v0",
        href: `https://v0.app/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.v0,
      });
    }

    return _items;
  }, [markdownUrl, isComponent]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "icon",
            className: "cursor-pointer border-none font-geist-sans",
          })
        )}
        aria-label="View Options"
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="size-4"
        />
        <span className="sr-only">View Options</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit font-geist-sans" align="end">
        {items.map(({ title, href, icon: Icon }) => (
          <DropdownMenuItem
            key={href}
            className="cursor-pointer"
            render={
              <a
                href={href}
                rel="noreferrer noopener"
                target="_blank"
                className="flex w-full items-center gap-2"
              />
            }
          >
            <Icon className="size-4" />
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LLMCopyButtonWithViewOptions({
  markdownUrl,
  isComponent = false,
}: {
  markdownUrl: string;
  isComponent?: boolean;
}) {
  return (
    <ButtonGroup>
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ButtonGroupSeparator className="border-y-4 border-secondary dark:bg-white/20 data-vertical:my-0" />
      <ViewOptions markdownUrl={markdownUrl} isComponent={isComponent} />
    </ButtonGroup>
  );
}
