declare module "vue2-notify" {
    import { PluginFunction } from "vue"

    export const install: PluginFunction<{}>

    type notifyOptions = {
        itemClass: string
        duration: number
        visibility: number
        position: string
        enter: string
        leave: string
        closeButtonClass: boolean
        width: string
        mode: string
        permanent: boolean
    }

    type notifyTypeOptions = {
        itemClass: string
        iconClass: string
    }

    type notifyTypes = {
        [key: string]: notifyTypeOptions
    }

    interface Notify {
        (msg: string, type: string, options: notifyOptions): void
        info(msg: string, options: notifyOptions): void
        error(msg: string, options: notifyOptions): void
        danger(msg: string, options: notifyOptions): void
        warning(msg: string, options: notifyOptions): void
        setTypes(types: notifyTypes): void
        removeAll(): void
    }

    module "vue/types/vue" {
        interface Vue {
            $notify: Notify
        }
    }
}