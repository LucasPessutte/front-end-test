import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DogsPage from "@/Pages/DogsPage";
import ChartsPage from "@/Pages/ChartsPage";
import PlaceholderPage from "@/Pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <main className="flex-1 bg-muted/40">
            {/* Header mobile */}
            <div className="md:hidden p-4 border-b">
              <SidebarTrigger />
            </div>

            <div className="p-6">
              <Routes>
                <Route path="/" element={<ChartsPage />} />
                <Route path="/pets" element={<DogsPage />} />
                <Route
                  path="/settings"
                  element={<PlaceholderPage title="Settings" />}
                />
                <Route
                  path="/account"
                  element={<PlaceholderPage title="Account" />}
                />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}
