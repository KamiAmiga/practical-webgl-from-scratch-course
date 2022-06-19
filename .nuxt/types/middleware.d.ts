import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "A:/dev/practical-webgl-from-scratch-course/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}