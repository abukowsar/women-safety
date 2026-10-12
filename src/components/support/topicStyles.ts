import {
  Brain,
  LifeBuoy,
  ShieldAlert,
  House,
  Coins,
  GraduationCap,
  Footprints,
  Smartphone,
  LucideIcon,
} from 'lucide-react';
import { TopicAccent, TopicId } from '@/data/topics';

export const topicIcons: Record<TopicId, LucideIcon> = {
  'mental-health': Brain,
  'suicide-prevention': LifeBuoy,
  'sexual-violence': ShieldAlert,
  'domestic-violence': House,
  dowry: Coins,
  'child-marriage': GraduationCap,
  harassment: Footprints,
  'online-safety': Smartphone,
};

interface AccentClasses {
  soft: string; // tinted background
  icon: string; // icon chip
  text: string; // accent text
  ring: string; // hover border
  hero: string; // page header gradient
  dot: string; // bullet / marker
}

// Full class strings so Tailwind can see them at build time.
export const accents: Record<TopicAccent, AccentClasses> = {
  teal: {
    soft: 'bg-teal-50',
    icon: 'bg-teal-100 text-teal-700',
    text: 'text-teal-700',
    ring: 'hover:border-teal-300',
    hero: 'from-teal-50 via-cream to-cream',
    dot: 'bg-teal-500',
  },
  sky: {
    soft: 'bg-sky-50',
    icon: 'bg-sky-100 text-sky-700',
    text: 'text-sky-700',
    ring: 'hover:border-sky-300',
    hero: 'from-sky-50 via-cream to-cream',
    dot: 'bg-sky-500',
  },
  rose: {
    soft: 'bg-rose-50',
    icon: 'bg-rose-100 text-rose-700',
    text: 'text-rose-700',
    ring: 'hover:border-rose-300',
    hero: 'from-rose-50 via-cream to-cream',
    dot: 'bg-rose-500',
  },
  orange: {
    soft: 'bg-orange-50',
    icon: 'bg-orange-100 text-orange-700',
    text: 'text-orange-700',
    ring: 'hover:border-orange-300',
    hero: 'from-orange-50 via-cream to-cream',
    dot: 'bg-orange-500',
  },
  amber: {
    soft: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-700',
    text: 'text-amber-700',
    ring: 'hover:border-amber-300',
    hero: 'from-amber-50 via-cream to-cream',
    dot: 'bg-amber-500',
  },
  violet: {
    soft: 'bg-violet-50',
    icon: 'bg-violet-100 text-violet-700',
    text: 'text-violet-700',
    ring: 'hover:border-violet-300',
    hero: 'from-violet-50 via-cream to-cream',
    dot: 'bg-violet-500',
  },
  fuchsia: {
    soft: 'bg-fuchsia-50',
    icon: 'bg-fuchsia-100 text-fuchsia-700',
    text: 'text-fuchsia-700',
    ring: 'hover:border-fuchsia-300',
    hero: 'from-fuchsia-50 via-cream to-cream',
    dot: 'bg-fuchsia-500',
  },
  indigo: {
    soft: 'bg-indigo-50',
    icon: 'bg-indigo-100 text-indigo-700',
    text: 'text-indigo-700',
    ring: 'hover:border-indigo-300',
    hero: 'from-indigo-50 via-cream to-cream',
    dot: 'bg-indigo-500',
  },
};
