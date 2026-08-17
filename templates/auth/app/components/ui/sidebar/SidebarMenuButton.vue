<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { Primitive } from "radix-vue";
import { type VariantProps, cva } from "class-variance-authority";
import Tooltip from "~/components/ui/tooltip/Tooltip.vue";
import TooltipContent from "~/components/ui/tooltip/TooltipContent.vue";
import TooltipTrigger from "~/components/ui/tooltip/TooltipTrigger.vue";
import { cn } from "~/lib/utils";
import { useSidebar } from "./utils";

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-xs outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-xs",
				sm: "h-7 text-xs",
				lg: "h-12 text-xs group-data-[collapsible=icon]:!p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;

interface Props {
	as?: any;
	asChild?: boolean;
	variant?: SidebarMenuButtonVariants["variant"];
	size?: SidebarMenuButtonVariants["size"];
	isActive?: boolean;
	class?: HTMLAttributes["class"];
	tooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
	as: "button",
	variant: "default",
	size: "default",
});

const { isMobile, state } = useSidebar();

const delegatedProps = computed(() => {
	const { class: _, tooltip: __, ...delegated } = props;
	return delegated;
});
</script>

<template>
  <template v-if="!tooltip">
    <Primitive
      data-sidebar="menu-button"
      :data-size="size"
      :data-active="isActive"
      :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
      v-bind="delegatedProps"
    >
      <slot />
    </Primitive>
  </template>

  <Tooltip v-else>
    <TooltipTrigger as-child>
      <Primitive
        data-sidebar="menu-button"
        :data-size="size"
        :data-active="isActive"
        :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
        v-bind="delegatedProps"
      >
        <slot />
      </Primitive>
    </TooltipTrigger>
    <TooltipContent
      side="right"
      align="center"
      :hidden="state !== 'collapsed' || isMobile"
    >
      {{ tooltip }}
    </TooltipContent>
  </Tooltip>
</template>
