import { create } from "zustand";
import { loadDashboard, saveDashboard } from "@/utils/storage";

export type Widget = {
  id: string;
  title: string;
  type: "card" | "table" | "chart";
  symbol?: string;          // existing
  apiUrl?: string;          // NEW
  refreshInterval?: number; // NEW (seconds)
};

type DashboardState = {
  widgets: Widget[];
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  setWidgets: (widgets: Widget[]) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  widgets: [],

  setWidgets: (widgets) => {
    saveDashboard(widgets);
    set({ widgets });
  },

  addWidget: (widget) =>
    set((state) => {
      const updated = [...state.widgets, widget];
      saveDashboard(updated);
      return { widgets: updated };
    }),

  removeWidget: (id) =>
    set((state) => {
      const updated = state.widgets.filter((w) => w.id !== id);
      saveDashboard(updated);
      return { widgets: updated };
    }),
}

));
