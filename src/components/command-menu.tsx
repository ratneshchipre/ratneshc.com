"use client";

import * as React from "react";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCommandState } from "cmdk";
import { useHotkeys } from "react-hotkeys-hook";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  ArrowMoveDownLeftIcon,
  ArrowUpDownIcon,
  Briefcase06Icon,
  Cancel01Icon,
  CollectionsBookmarkIcon,
  ComputerIcon,
  Folder01Icon,
  GitCommitIcon,
  GithubIcon,
  Globe02Icon,
  Home03Icon,
  Layers01Icon,
  LicenseIcon,
  Linkedin01Icon,
  MoonIcon,
  NewTwitterIcon,
  Search01Icon,
  Sun01Icon,
  TextAlignLeft01Icon,
} from "@hugeicons/core-free-icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/command";
import { Button } from "./ui/button";
import { Kbd, KbdGroup } from "./ui/kbd";
import { cn } from "@/lib/utils";
import { Post } from "@/features/blog/types/post";
import { Separator } from "./ui/separator";
import { InputGroupButton } from "./ui/input-group";

type CommandLinkItem = {
  title: string;
  href: string;
  icon?: IconSvgElement;
  shortcut?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home03Icon,
    shortcut: "GH",
  },
  {
    title: "Blog",
    href: "/blog",
    icon: LicenseIcon,
    shortcut: "GB",
  },
  {
    title: "Collection",
    href: "/collection",
    icon: CollectionsBookmarkIcon,
    shortcut: "GC",
  },
];

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "Projects",
    href: "/#projects",
    icon: Folder01Icon,
  },
  {
    title: "Experience",
    href: "/#experience",
    icon: Briefcase06Icon,
  },
  {
    title: "Tech Stack",
    href: "/#stack",
    icon: Layers01Icon,
  },
  {
    title: "GitHub Contributions",
    href: "/#github-contributions",
    icon: GitCommitIcon,
  },
  {
    title: "Connect",
    href: "/#connect",
    icon: Globe02Icon,
  },
];

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = [
  {
    title: "X",
    href: "https://x.com/ratneshchipre",
    icon: NewTwitterIcon,
    openInNewTab: true,
  },
  {
    title: "GitHub",
    href: "https://github.com/ratneshchipre",
    icon: GithubIcon,
    openInNewTab: true,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ratneshchipre",
    icon: Linkedin01Icon,
    openInNewTab: true,
  },
];

export function CommandMenu({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const { setTheme } = useTheme();

  const handleOpenLink = React.useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        if (href.startsWith("/#")) {
          const id = href.split("#")[1];
          if (pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: "auto" });
              return;
            }
          }
        }
        router.push(href);
      }
    },
    [router, pathname]
  );

  const createThemeHandler = React.useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme]
  );

  const { blogLinks } = React.useMemo(
    () => ({
      blogLinks: posts
        .filter((post: Post) => post.metadata.category !== "components")
        .map(postToCommandLinkItem),
    }),
    [posts]
  );

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault();
      setOpen((open) => !open);
    },
    { enableOnFormTags: false }
  );

  return (
    <>
      <Button
        variant="secondary"
        className={cn(
          "ml-2 h-8 gap-1.5 rounded-full border border-input bg-background px-2.5 text-muted-foreground shadow-xs select-none hover:bg-background dark:bg-input/30 dark:hover:bg-input/30",
          "relative cursor-pointer before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <HugeiconsIcon icon={Search01Icon} aria-hidden />
        <span className="font-geist-sans text-sm/4 font-medium sm:hidden">
          Search…
        </span>
        <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
          <Kbd className="w-5 min-w-5">⌘</Kbd>
          <Kbd className="w-5 min-w-5 font-geist-sans">K</Kbd>
        </KbdGroup>
        <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
          <Kbd className="font-geist-sans">Ctrl</Kbd>
          <Kbd className="w-5 min-w-5 font-geist-sans">K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="font-geist-sans"
      >
        <Command>
          <CommandMenuInput setOpen={setOpen} />
          <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-effect-y">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandLinkGroup
              heading="Menu"
              links={MENU_LINKS}
              onLinkSelect={handleOpenLink}
            />
            <CommandLinkGroup
              heading="Portfolio"
              links={PORTFOLIO_LINKS}
              onLinkSelect={handleOpenLink}
            />
            <CommandLinkGroup
              heading="Blog"
              links={blogLinks}
              fallbackIcon={TextAlignLeft01Icon}
              onLinkSelect={handleOpenLink}
            />
            <CommandLinkGroup
              heading="Social Links"
              links={SOCIAL_LINK_ITEMS}
              onLinkSelect={handleOpenLink}
            />
            <CommandGroup heading="Theme">
              <CommandItem
                value="light"
                keywords={["theme"]}
                onSelect={createThemeHandler("light")}
              >
                <HugeiconsIcon
                  icon={Sun01Icon}
                  strokeWidth={2}
                  className="text-muted-foreground group-data-selected/command-item:text-muted-foreground!"
                />
                Light
              </CommandItem>
              <CommandItem
                value="dark"
                keywords={["theme"]}
                onSelect={createThemeHandler("dark")}
              >
                <HugeiconsIcon
                  icon={MoonIcon}
                  strokeWidth={2}
                  className="text-muted-foreground group-data-selected/command-item:text-muted-foreground!"
                />
                Dark
              </CommandItem>
              <CommandItem
                value="system"
                keywords={["theme"]}
                onSelect={createThemeHandler("system")}
              >
                <HugeiconsIcon
                  icon={ComputerIcon}
                  strokeWidth={2}
                  className="text-muted-foreground group-data-selected/command-item:text-muted-foreground!"
                />
                System
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandMenuFooter />
        </Command>
      </CommandDialog>
    </>
  );
}

function CommandMenuInput({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <CommandInput placeholder="Type a command or search…">
      <InputGroupButton
        size="icon-xs"
        variant="ghost"
        onClick={() => setOpen(false)}
        className="cursor-pointer"
      >
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
        <span className="sr-only">Close</span>
      </InputGroupButton>
    </CommandInput>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: IconSvgElement;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon;

        return (
          <CommandItem
            key={link.href}
            value={link.href.toLowerCase()}
            keywords={[link.title, ...(link.keywords ?? [])]}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {Icon ? (
              <HugeiconsIcon
                icon={Icon}
                strokeWidth={2}
                className="text-muted-foreground group-data-selected/command-item:text-muted-foreground!"
              />
            ) : null}
            <p className="line-clamp-1">{link.title}</p>
            {link.shortcut && (
              <CommandShortcut className="font-geist-pixel-square tracking-widest">
                {link.shortcut}
              </CommandShortcut>
            )}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = "command" | "page" | "link";

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map();

  commandMetaMap.set("light", { commandKind: "command" });
  commandMetaMap.set("dark", { commandKind: "command" });
  commandMetaMap.set("system", { commandKind: "command" });

  MENU_LINKS.forEach((link) => {
    commandMetaMap.set(link.href.toLowerCase(), { commandKind: "page" });
  });

  PORTFOLIO_LINKS.forEach((link) => {
    commandMetaMap.set(link.href.toLowerCase(), { commandKind: "page" });
  });

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.href.toLowerCase(), {
      commandKind: "link",
    });
  });

  return commandMetaMap;
}

const COMMAND_META_MAP = buildCommandMetaMap();

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page"
  );

  return (
    <>
      <div className="flex h-10" />
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-end rounded-b-2xl border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-geist-sans text-muted-foreground">
            Navigate
          </span>
          <Kbd className="font-geist-sans">
            <HugeiconsIcon icon={ArrowUpDownIcon} />
          </Kbd>
          <div className="flex items-center justify-center">
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
          </div>
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <Kbd>
            <HugeiconsIcon icon={ArrowMoveDownLeftIcon} />
          </Kbd>
          <div className="flex items-center justify-center">
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
          </div>
          <span className="font-geist-sans text-muted-foreground">Exit</span>
          <Kbd className="font-geist-sans">Esc</Kbd>
        </div>
      </div>
    </>
  );
}

function postToCommandLinkItem(post: Post): CommandLinkItem {
  const isComponent = post.metadata.category === "components";

  const title = post.metadata.title.includes("|")
    ? post.metadata.title.split("|")[0].trim()
    : post.metadata.title;

  return {
    title,
    href: isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`,
    keywords: isComponent ? ["component"] : undefined,
    icon: isComponent ? ComputerIcon : TextAlignLeft01Icon,
  };
}
