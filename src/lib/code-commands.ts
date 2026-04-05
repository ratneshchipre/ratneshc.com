export interface NpmCommands {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}

export function getNpmCommands(raw: string): NpmCommands | null {
  if (raw.startsWith("npm install")) {
    return {
      __npm__: raw,
      __yarn__: raw.replace("npm install", "yarn add"),
      __pnpm__: raw.replace("npm install", "pnpm add"),
      __bun__: raw.replace("npm install", "bun add"),
    };
  }

  if (raw.startsWith("npx create-")) {
    return {
      __npm__: raw,
      __yarn__: raw.replace("npx create-", "yarn create "),
      __pnpm__: raw.replace("npx create-", "pnpm create "),
      __bun__: raw.replace("npx", "bunx --bun"),
    };
  }

  if (raw.startsWith("npm create")) {
    return {
      __npm__: raw,
      __yarn__: raw.replace("npm create", "yarn create"),
      __pnpm__: raw.replace("npm create", "pnpm create"),
      __bun__: raw.replace("npm create", "bun create"),
    };
  }

  if (raw.startsWith("npx") && !raw.startsWith("npx create-")) {
    return {
      __npm__: raw,
      __yarn__: raw.replace("npx", "yarn"),
      __pnpm__: raw.replace("npx", "pnpm dlx"),
      __bun__: raw.replace("npx", "bunx --bun"),
    };
  }

  if (raw.startsWith("npm run")) {
    return {
      __npm__: raw,
      __yarn__: raw.replace("npm run", "yarn"),
      __pnpm__: raw.replace("npm run", "pnpm"),
      __bun__: raw.replace("npm run", "bun"),
    };
  }

  return null;
}
