"use client";

import * as React from "react";

import type { NpmCommands } from "@/types/unist";
import type { PackageManager } from "@/hooks/use-package-manager";
import { usePackageManager } from "@/hooks/use-package-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CopyButton from "./copy-button";
import { getIconForPackageManager } from "./icons";

export function CodeBlockCommand({
  __pnpm__,
  __yarn__,
  __npm__,
  __bun__,
}: NpmCommands) {
  const [packageManager, setPackageManager] = usePackageManager();

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      yarn: __yarn__,
      npm: __npm__,
      bun: __bun__,
    };
  }, [__pnpm__, __yarn__, __npm__, __bun__]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-code">
      <Tabs
        className="gap-0"
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as PackageManager);
        }}
      >
        <div className="px-4 shadow-[inset_0_-1px_0_0] shadow-border">
          <TabsList className="h-11! rounded-none bg-transparent p-0 dark:bg-transparent [&_svg]:me-3 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="h-7 rounded-md p-0 px-2 font-geist-mono data-active:border-muted-foreground/25! data-active:bg-background! data-active:shadow-none!"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key}>
              <pre className="scroll-fade-effect-x">
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-geist-mono text-sm leading-none text-muted-foreground"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <CopyButton
        className="absolute top-2 right-2 z-10 h-7 w-7 rounded-md border bg-muted/70 backdrop-blur-xs hover:bg-muted!"
        size="icon-xs"
        value={tabs[packageManager] || ""}
        event="copy_npm_command"
      />
    </div>
  );
}
