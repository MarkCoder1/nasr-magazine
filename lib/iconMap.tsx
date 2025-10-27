"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconByNameProps = {
  name?: string | null;
  size?: number;
  className?: string;
  title?: string;
};

export default function IconByName({ name, size = 24, className = '', title, ...props }: IconByNameProps) {
  // lucide-react exports icons as PascalCase named exports. We look up by string.
  const IconComp = name ? (LucideIcons as any)[name] : undefined;
  // Fallback to a sensible icon that is likely present in lucide-react
  const Fallback = (LucideIcons as any).BookOpen || Object.values(LucideIcons)[0];
  const Comp = IconComp || Fallback;

  if (!Comp) return null;

  // If the consumer provided a title, keep it accessible; otherwise mark as decorative
  const ariaHidden = title ? undefined : true;

  return <Comp size={size} className={className} aria-hidden={ariaHidden} {...props} />;
}
