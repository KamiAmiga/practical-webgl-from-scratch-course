import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "A:/dev/practical-webgl-from-scratch-course/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}