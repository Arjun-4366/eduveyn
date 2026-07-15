import { Icon } from '@iconify/react';
import { getSubjectIcon, isIconifyId } from '@/lib/subjectIcons';

interface IconGlyphProps {
  value: string;
  size?: number;
}

/** Renders a stored icon value, whether it's a new Iconify id or a legacy SUBJECT_ICON_MAP key. */
export default function IconGlyph({ value, size = 16 }: IconGlyphProps) {
  if (isIconifyId(value)) {
    return <Icon icon={value} width={size} height={size} />;
  }
  const LegacyIcon = getSubjectIcon(value);
  return <LegacyIcon size={size} />;
}
