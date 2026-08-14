import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getLatestPublishedContent } from './content-highlight';

describe('getLatestPublishedContent', () => {
  it('returns the most recently published item across content types', () => {
    const items = [
      {
        href: '/blog/older',
        type: 'article',
        title: 'Older article',
        description: 'Older article description',
        tags: ['React'],
        accentColor: 'rgb(0, 150, 136)',
        publishedAt: '2026-02-18',
        readingTime: 8,
      },
      {
        href: '/guides/newer',
        type: 'guide',
        title: 'Newer guide',
        description: 'Newer guide description',
        tags: ['Next.js'],
        accentColor: 'rgb(124, 58, 237)',
        publishedAt: '2026-08-14',
        duration: '3h',
      },
    ];

    assert.equal(getLatestPublishedContent(items)?.href, '/guides/newer');
  });

  it('ignores items without a publication date', () => {
    const items = [
      {
        href: '/demos/live',
        type: 'demo',
        title: 'Live demo',
        description: 'Interactive demo description',
        tags: ['Performance'],
        accentColor: 'rgb(249, 115, 22)',
      },
    ];

    assert.equal(getLatestPublishedContent(items), null);
  });
});
