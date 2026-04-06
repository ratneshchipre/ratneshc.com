export const registryConfig = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @example "@ratneshc" - Users can install components with: `npx shadcn add @ratneshc/button`
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@ratneshc",
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * @example "https://ratneshc.com/r/{name}.json" resolves to "https://ratneshc.com/r/button.json"
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL ||
    "https://ratneshc.com/r/{name}.json",
};
