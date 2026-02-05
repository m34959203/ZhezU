import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Network, ArrowRight, GraduationCap, Pickaxe, Cpu, Scale } from 'lucide-react';
import { SkillMap } from '@/components/talent/SkillMap';
import { SKILL_MAP_NODES, SKILL_MAP_EDGES } from '@/lib/talent-data';
import type { Locale } from '@/types';

const majorCards = [
  {
    icon: Pickaxe,
    nameKey: 'majorMining',
    descKey: 'majorMiningDesc',
    color: '#E6B325',
    active: true,
  },
  {
    icon: GraduationCap,
    nameKey: 'majorMetallurgy',
    descKey: 'majorMetallurgyDesc',
    color: '#3B82F6',
    active: false,
  },
  {
    icon: Cpu,
    nameKey: 'majorEnergy',
    descKey: 'majorEnergyDesc',
    color: '#22C55E',
    active: false,
  },
  {
    icon: Scale,
    nameKey: 'majorLaw',
    descKey: 'majorLawDesc',
    color: '#8B5CF6',
    active: false,
  },
];

export default function SkillMapPage() {
  const t = useTranslations('skillMap');
  const locale = useLocale() as Locale;

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Hero */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Network size={16} className="text-primary-light" />
              <span className="text-sm font-medium text-primary-light">{t('badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-dark max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Major selection cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
            {majorCards.map((card) => (
              <button
                key={card.nameKey}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                  card.active
                    ? 'border-gold/40 bg-gold/10 shadow-[0_0_20px_rgba(230,179,37,0.15)]'
                    : 'border-border-dark/50 bg-surface-dark/40 hover:border-border-dark'
                }`}
              >
                <card.icon
                  size={24}
                  style={{ color: card.active ? card.color : '#94A3B8' }}
                />
                <span
                  className={`text-sm font-semibold ${
                    card.active ? 'text-white' : 'text-text-secondary-dark'
                  }`}
                >
                  {t(card.nameKey)}
                </span>
                <span className="text-[10px] text-text-secondary-dark">{t(card.descKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Map Visualization */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl border border-border-dark/60 bg-surface-dark/30 backdrop-blur-sm p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gold" />
              {t('mapTitle')}
            </h2>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                {t('legendUNT')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                {t('legendHard')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                {t('legendSoft')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                {t('legendCareer')}
              </span>
            </div>
          </div>

          <SkillMap nodes={SKILL_MAP_NODES} edges={SKILL_MAP_EDGES} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl border border-border-dark/60 bg-gradient-to-r from-primary/10 via-surface-dark/50 to-gold/10 p-8 text-center">
          <h3 className="text-xl font-display font-bold text-white mb-2">{t('ctaTitle')}</h3>
          <p className="text-sm text-text-secondary-dark mb-5 max-w-md mx-auto">{t('ctaDesc')}</p>
          <Link
            href="/talent-pool"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-bg-dark font-semibold text-sm hover:bg-gold-light transition-colors"
          >
            {t('ctaButton')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
