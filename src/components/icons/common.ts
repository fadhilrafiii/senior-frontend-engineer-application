import { SVGProps } from 'react';

import { Color } from '@libs/types/color.type';

export interface IconProps extends SVGProps<SVGSVGElement> {
  color?: Color | string;
  size?: number;
  className?: string;
}
