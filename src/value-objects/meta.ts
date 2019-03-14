export interface Meta {
  title?: string;
  description?: string;
  image?: string;
  og?: OG;
  twitter?: Twitter;
}

export interface OG {
  url?: string;
  type?: 'website' | 'article';
}

export interface Twitter {
  card?: 'summary' | 'summary_large_image';
  site?: string;
}

function setter<T>(to?: T, values?: T): T {
  return { ...(to || ({} as T)), ...(values || ({} as T)) };
}

export function create(from: Meta = {}): Meta {
  return from;
}

export function set(to: Meta, values: Meta): Meta {
  const og: OG = setter(to.og, values.og);
  const twitter: Twitter = setter(to.twitter, values.twitter);
  return { ...to, ...values, og, twitter };
}
