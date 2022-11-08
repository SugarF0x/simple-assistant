/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.md" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}
