<script setup lang="ts">
import { ChevronsUpDown, Home, LogOut, Settings } from "@lucide/vue";
import { useSidebar } from "~/components/ui/sidebar/utils";

const { user, logout } = useAuth();
const { isMobile } = useSidebar();
const isLoggingOut = ref(false);

const userInitials = computed(() => {
	if (!user.value?.name) return "U";
	return user.value.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();
});

const handleLogout = async () => {
	isLoggingOut.value = true;
	await logout();
};
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="(user as any)?.avatar || ''" :alt="user?.name || 'User'" />
              <AvatarFallback class="rounded-lg text-xs font-semibold">
                {{ userInitials }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-xs leading-tight">
              <span class="truncate font-semibold">{{ user?.name || 'User' }}</span>
              <span class="truncate text-[11px] text-muted-foreground">{{ user?.email || '' }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'top'"
          align="start"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-xs">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="(user as any)?.avatar || ''" :alt="user?.name || 'User'" />
                <AvatarFallback class="rounded-lg text-xs font-semibold">
                  {{ userInitials }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-xs leading-tight">
                <span class="truncate font-semibold">{{ user?.name || 'User' }}</span>
                <span class="truncate text-[11px] text-muted-foreground">{{ user?.email || '' }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem as-child>
              <NuxtLink to="/" class="w-full flex items-center">
                <Home class="mr-2 size-4" />
                <span>Home</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <NuxtLink to="/dashboard/settings" class="w-full flex items-center">
                <Settings class="mr-2 size-4" />
                <span>Settings</span>
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            :disabled="isLoggingOut"
            @click="handleLogout"
          >
            <LogOut class="mr-2 size-4" />
            <span>{{ isLoggingOut ? 'Logging out...' : 'Log out' }}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
