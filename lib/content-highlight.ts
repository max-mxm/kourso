export interface PublishedContentItem {
  href: string;
  publishedAt?: string;
}

export function getLatestPublishedContent<T extends PublishedContentItem>(items: T[]): T | null {
  return items.reduce<T | null>((latest, item) => {
    if (!item.publishedAt) {
      return latest;
    }

    const itemTime = new Date(item.publishedAt).getTime();
    if (Number.isNaN(itemTime)) {
      return latest;
    }

    if (!latest?.publishedAt) {
      return item;
    }

    const latestTime = new Date(latest.publishedAt).getTime();
    return itemTime > latestTime ? item : latest;
  }, null);
}
