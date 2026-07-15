import {
  FaCalculator,
  FaAtom,
  FaFlask,
  FaDna,
  FaBookOpen,
  FaLanguage,
  FaEarthAmericas,
  FaLandmark,
  FaMapLocationDot,
  FaCode,
  FaChartLine,
  FaPalette,
  FaMusic,
  FaBook,
  FaMagnifyingGlass,
  FaCircleCheck,
  FaShieldHalved,
  FaBullseye,
  FaGift,
  FaLock,
  FaArrowTrendUp,
  FaUsers,
  FaPlay,
  FaStar,
  FaGlobe,
  FaClock,
  FaHeart,
  FaRocket,
  FaTrophy,
  FaGraduationCap,
  FaCalendarDays,
  FaUserGraduate,
  FaComments,
  FaEnvelope,
  FaPhone,
  FaHandshake,
  FaAward,
  FaSchool,
  FaUsersViewfinder,
  FaCalendarDay,
  FaCirclePlay,
  FaUser,
} from "react-icons/fa6";
import type { IconType } from 'react-icons';

/**
 * Mirrors eduveyn-admin's `src/lib/subjectIcons.ts` picker keys exactly (same
 * keys, same react-icons components) so a subject's `icon` string renders the
 * same glyph here as it does in the admin icon picker. Keep the two in sync.
 *
 * The block below the mirrored keys is extra aliases for icon strings that
 * exist in real site-content data but predate the picker (kebab-case /
 * singular variants like "shield-check", "chart-line", "play-circle", "user")
 * - kept display-only here so old records still render a sensible icon
 * instead of the FaBook fallback; not added to admin's picker options list
 * since new edits should normalize to the canonical keys above.
 */
export const SUBJECT_ICON_MAP: Record<string, IconType> = {
  math: FaCalculator,
  physics: FaAtom,
  chemistry: FaFlask,
  biology: FaDna,
  english: FaBookOpen,
  language: FaLanguage,
  social_science: FaEarthAmericas,
  history: FaLandmark,
  geography: FaMapLocationDot,
  coding: FaCode,
  commerce: FaChartLine,
  art: FaPalette,
  music: FaMusic,
  book: FaBook,
  search: FaMagnifyingGlass,
  verified: FaCircleCheck,
  shield: FaShieldHalved,
  target: FaBullseye,
  gift: FaGift,
  lock: FaLock,
  trending_up: FaArrowTrendUp,
  users: FaUsers,
  play: FaPlay,
  star: FaStar,
  globe: FaGlobe,
  clock: FaClock,
  heart: FaHeart,
  rocket: FaRocket,
  trophy: FaTrophy,
  graduation: FaGraduationCap,
  calendar: FaCalendarDays,
  person: FaUserGraduate,
  chat: FaComments,
  mail: FaEnvelope,
  phone: FaPhone,
  handshake: FaHandshake,
  award: FaAward,
  school: FaSchool,
  person_search: FaUsersViewfinder,
  calendar_month: FaCalendarDay,
  play_circle: FaCirclePlay,

  // Legacy/alias keys (see comment above) — not part of the picker's option list.
  'shield-check': FaShieldHalved,
  'chart-line': FaChartLine,
  'play-circle': FaCirclePlay,
  user: FaUser,
};

export function getSubjectIcon(key: string): IconType {
  return SUBJECT_ICON_MAP[key] ?? FaBook;
}

/**
 * New icon values (picked via eduveyn-admin's Iconify-backed picker) are
 * Iconify ids (`"mdi:calculator"` - library:name, always containing a
 * colon). Old rows still hold a bare legacy key (`"math"`) from the
 * SUBJECT_ICON_MAP above - this tells the two apart so a single renderer
 * (`IconGlyph`) can handle both without a data migration.
 */
export function isIconifyId(value: string): boolean {
  return value.includes(":");
}
