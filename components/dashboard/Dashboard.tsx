"use client";

import { useEffect, useState } from "react";
import WidgetGrid from "./WidgetGrid";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useDashboardStore } from "@/store/dashboardStore";
import WidgetCard from "../widgets/WidgetCard";
import AddWidgetModal from "./AddWidgetModal";
import { loadDashboard } from "@/utils/storage";

function SortableItem({ widget }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WidgetCard widget={widget} />
    </div>
  );
}

export default function Dashboard() {
  const widgets = useDashboardStore((s) => s.widgets);
  const setWidgets = useDashboardStore((s) => s.setWidgets);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = loadDashboard();
    if (saved.length) setWidgets(saved);
  }, [setWidgets]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    setWidgets(arrayMove(widgets, oldIndex, newIndex));
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Finance Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 px-4 py-2 rounded"
        >
          + Add Widget
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <SortableItem key={widget.id} widget={widget} />
            ))}
          </div>
        </SortableContext>
      </DndContext>


      {open && <AddWidgetModal onClose={() => setOpen(false)} />}
    </>
  );
}
