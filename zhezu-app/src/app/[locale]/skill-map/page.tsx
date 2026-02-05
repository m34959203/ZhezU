import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Network, ArrowRight, GraduationCap, Pickaxe, Cpu, Scale, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-dark relative overflow-hidden">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/[0.03] blur-[150px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 mb-8">
              <Network size={14} className="text-primary-light" />
              <span className="text-[11px] font-semibold text-primary-light uppercase tracking-widest">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-5 leading-[1.1]">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* ── Major selection cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
            {majorCards.map((card) => (
              <button
                key={card.nameKey}
                className={`group/card relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-400 cursor-pointer ${
                  card.active
                    ? 'border-gold/40 bg-gradient-to-b from-gold/12 to-gold/4 shadow-[0_0_30px_rgba(230,179,37,0.12)]'
                    : 'border-border-dark/50 bg-surface-dark/30 hover:border-border-dark hover:bg-surface-dark/50'
                }`}
              >
                {/* Active glow */}
                {card.active && (
                  <div className="absolute inset-0 rounded-2xl bg-gold/5 animate-pulse-glow pointer-events-none" />
                )}

                <div
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    card.active ? 'bg-gold/15' : 'bg-surface-dark/60 group-hover/card:bg-surface-dark/80'
                  }`}
                >
                  <card.icon
                    size={22}
                    style={{ color: card.active ? card.color : '#7B8EB5' }}
                    className="transition-colors duration-300"
                  />
                </div>

                <span
                  className={`text-sm font-bold tracking-wide ${
                    card.active ? 'text-white' : 'text-text-secondary-dark group-hover/card:text-white/80'
                  } transition-colors duration-300`}
                >
                  {t(card.nameKey)}
                </span>
                <span className="text-[10px] text-text-secondary-dark/70 font-medium">
                  {t(card.descKey)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Map Visualization ── */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="premium-card p-5 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold to-gold/30" />
              {t('mapTitle')}
            </h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {[
                { color: '#3B82F6', key: 'legendUNT' },
                { color: '#22C55E', key: 'legendHard' },
                { color: '#8B5CF6', key: 'legendSoft' },
                { color: '#F59E0B', key: 'legendCareer' },
              ].map((item) => (
                <span key={item.key} className="flex items-center gap-2 text-text-secondary-dark">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 8px ${item.color}40`,
                    }}
                  />
                  <span className="font-medium">{t(item.key)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            {/* Subtle inner glow at center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full bg-gold/[0.04] blur-[60px]" />
            </div>
            <SkillMap nodes={SKILL_MAP_NODES} edges={SKILL_MAP_EDGES} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="premium-card p-10 md:p-14 text-center overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-gold/[0.06] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-gold" />
              <span className="text-[10px] font-semibold text-gold uppercase tracking-widest">
                ZhezU Talent
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              {t('ctaTitle')}
            </h3>
            <p className="text-sm text-text-secondary-dark mb-8 max-w-lg mx-auto leading-relaxed">
              {t('ctaDesc')}
            </p>

            <Link
              href="/talent-pool"
              className="btn-premium inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-bg-dark font-bold text-sm tracking-wide"
            >
              {t('ctaButton')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
