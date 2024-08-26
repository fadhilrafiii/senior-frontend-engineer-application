import type { DropAnimation } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const dropAnimationConfig: DropAnimation = {};

export function SortableOverlay({ children }: PropsWithChildren) {
  return createPortal(
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>,
    document.getElementById('root')!,
  );
}
