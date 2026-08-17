import { createContext } from "radix-vue";
import type { Ref } from "vue";

export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export interface SidebarContext {
	state: Ref<"expanded" | "collapsed">;
	open: Ref<boolean>;
	setOpen: (value: boolean) => void;
	isMobile: Ref<boolean>;
	openMobile: Ref<boolean>;
	setOpenMobile: (value: boolean) => void;
	toggleSidebar: () => void;
}

export const [useSidebar, provideSidebarContext] =
	createContext<SidebarContext>("Sidebar");
