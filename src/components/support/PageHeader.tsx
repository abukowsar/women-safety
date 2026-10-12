import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  gradient?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  gradient = 'from-brand-50 via-cream to-cream',
  children,
}) => (
  <section className={`relative overflow-hidden bg-gradient-to-b ${gradient}`}>
    <div className="bg-grain absolute inset-0 opacity-60" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>
      )}
      <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-950 sm:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{subtitle}</p>}
      {children}
    </div>
  </section>
);

export default PageHeader;
