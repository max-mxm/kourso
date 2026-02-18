import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { HexagonalArchitectureDemo } from '@/app/demos/_components/hexagonal-architecture-demo';

export default function DemoInteractiveSection() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Cette demo montre exactement le principe des ports et adapters: vous changez
        l implementation technique, mais le use case metier reste identique.
      </p>

      <HexagonalArchitectureDemo compact />

      <Link
        href="/demos/simulateur-architecture-hexagonale"
        className="group block rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-5 transition-all duration-300 hover:border-cyan-500 hover:shadow-lg"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-cyan-600" />
              <span className="text-lg font-semibold text-foreground">
                Ouvrir la demo complete
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Lancez des scenarios complets avec timeline et resultat detaille.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-cyan-600" />
        </div>
      </Link>
    </div>
  );
}
