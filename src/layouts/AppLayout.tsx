import { Suspense } from "react";
import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppHeader from "@src/components/app/AppHeader";
import AppSuspenseFallback from "@src/components/app/AppSuspenseFallback";

export default function AppLayout() {
  return (
    <AppShell padding={16} header={{ height: 36 }}>
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Box mx="auto" w={{ base: "100%", sm: "600px" }}>
          <Suspense fallback={<AppSuspenseFallback />}>
            <Outlet />
          </Suspense>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
