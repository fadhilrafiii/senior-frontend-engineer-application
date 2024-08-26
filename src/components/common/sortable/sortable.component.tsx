import React, { useMemo, useState } from 'react';

import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

import { DragHandle, SortableItem } from './sortable-item/sortable-item.component';
import { SortableOverlay } from './sortable-overlay/sortable-overlay.component';

interface BaseItem {
  id: UniqueIdentifier;
}

interface IProps<T extends BaseItem> {
  id: string;
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T, idx: number): ReactNode;
}

export function Sortable<T extends BaseItem>({ items, onChange, id, renderItem }: IProps<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items} id={id}>
        <ul className="flex flex-col" role="application">
          {items.map((item, idx) => renderItem(item, idx))}
        </ul>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem, 0) : null}</SortableOverlay>
    </DndContext>
  );
}

Sortable.Item = SortableItem;
Sortable.DragHandle = DragHandle;
