// Runs a Server Component data fetch and swallows failures, returning a fallback
// instead of throwing — so an unreachable backend degrades a section instead of
// crashing the whole page render.
export async function safeFetch<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

// Splits a dynamic (backend-sourced) headline into a plain lead and an emphasized
// last word/phrase, so section titles keep the site's signature "one emphasized
// word + amber squiggle underline" look even when the text isn't a hardcoded
// default with a hand-picked emphasis point. A single-word title emphasizes the
// whole thing.
export function splitHeadlineEmphasis(text: string): { lead: string; emphasis: string } {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return { lead: '', emphasis: text.trim() };
  const emphasis = words.pop() as string;
  return { lead: words.join(' ') + ' ', emphasis };
}

// Cycling brand palette for per-card frame colors on tutor grids (Home highlights + Find Teachers).
export const tutorFrameColors = ['#7C3AED', '#D97706', '#DB2777', '#059669', '#0369A1', '#EA580C'];

// Tutors have no star rating from the backend — performance_score (0-100) is the
// closest signal, so derive a display tag from it rather than fabricating a rating.
export function tutorTag(performanceScore: number): string {
  if (performanceScore >= 90) return 'Top Performer';
  if (performanceScore >= 60) return 'Highly Rated';
  if (performanceScore > 0) return 'Rising Tutor';
  return 'New Tutor';
}
