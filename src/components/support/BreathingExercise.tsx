import React, { useEffect, useState } from 'react';
import { Play, Pause, Wind } from 'lucide-react';
import { Language } from '@/types';
import { L, pick } from '@/data/i18n';

const phases: { label: L; seconds: number; scale: number }[] = [
  { label: { en: 'Breathe in', bn: 'শ্বাস নিন' }, seconds: 4, scale: 1 },
  { label: { en: 'Hold', bn: 'ধরে রাখুন' }, seconds: 4, scale: 1 },
  { label: { en: 'Breathe out slowly', bn: 'ধীরে ছাড়ুন' }, seconds: 6, scale: 0.55 },
];

const start = { phase: 0, left: phases[0].seconds, rounds: 0 };

const BreathingExercise: React.FC<{ lang: Language }> = ({ lang }) => {
  const [running, setRunning] = useState(false);
  const [state, setState] = useState(start);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setState((s) => {
        if (s.left > 1) return { ...s, left: s.left - 1 };
        const phase = (s.phase + 1) % phases.length;
        return { phase, left: phases[phase].seconds, rounds: s.rounds + (phase === 0 ? 1 : 0) };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const toggle = () => {
    if (!running) setState((s) => ({ ...start, rounds: s.rounds }));
    setRunning((r) => !r);
  };

  const current = phases[state.phase];
  const scale = running ? current.scale : 0.55;

  return (
    <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 sm:p-8">
      <div className="flex items-center gap-2 text-teal-700">
        <Wind className="h-5 w-5" />
        <h3 className="font-semibold">{pick(lang, { en: 'Calm breathing', bn: 'শান্ত শ্বাস-প্রশ্বাস' })}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {pick(lang, {
          en: 'Follow the circle for a minute or two. Slow breathing tells your body it is safe.',
          bn: 'এক-দুই মিনিট বৃত্তটির সাথে শ্বাস নিন। ধীর শ্বাস আপনার শরীরকে জানায় যে আপনি নিরাপদ।',
        })}
      </p>

      <div className="relative my-6 grid h-60 place-items-center">
        <div
          className="absolute h-56 w-56 rounded-full bg-teal-300/30"
          style={{ transform: `scale(${scale})`, transition: `transform ${running ? current.seconds : 0.6}s ease-in-out` }}
        />
        <div
          className="absolute h-40 w-40 rounded-full bg-teal-500/85 shadow-lg shadow-teal-500/30"
          style={{ transform: `scale(${scale})`, transition: `transform ${running ? current.seconds : 0.6}s ease-in-out` }}
        />
        <span className="relative text-center font-semibold text-white drop-shadow" aria-live="polite">
          {running ? (
            <>
              <span className="block text-sm">{pick(lang, current.label)}</span>
              <span className="font-display text-3xl">{state.left}</span>
            </>
          ) : (
            <Wind className="h-7 w-7" />
          )}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {state.rounds > 0
            ? pick(lang, { en: `${state.rounds} rounds`, bn: `${state.rounds} বার সম্পন্ন` })
            : pick(lang, { en: 'Ready when you are', bn: 'আপনি প্রস্তুত হলে শুরু করুন' })}
        </p>
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? pick(lang, { en: 'Pause', bn: 'থামান' }) : pick(lang, { en: 'Start', bn: 'শুরু করুন' })}
        </button>
      </div>
    </div>
  );
};

export default BreathingExercise;
