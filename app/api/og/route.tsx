import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const CATEGORY_GRADIENTS: Record<string, { from: string; to: string }> = {
  fundamentals: { from: '#009688', to: '#7c3aed' },
  architecture: { from: '#3b82f6', to: '#06b6d4' },
  testing: { from: '#f97316', to: '#f59e0b' },
  rendering: { from: '#3b82f6', to: '#06b6d4' },
  optimization: { from: '#f97316', to: '#f59e0b' },
  'best-practices': { from: '#8b5cf6', to: '#ec4899' },
  advanced: { from: '#ef4444', to: '#f43f5e' },
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Maxpaths';
  const category = searchParams.get('category') || 'fundamentals';
  const gradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.fundamentals;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 900,
              color: 'white',
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '-0.02em',
            }}
          >
            Maxpaths
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
          }}
        >
          {decodeURIComponent(title)}
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: '24px',
            fontSize: '22px',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 500,
          }}
        >
          Bonnes pratiques frontend par Maxime Morellon
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'rgba(255,255,255,0.3)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
