import { Meta } from '~/value-objects/Meta';

interface HeadChildren {
  description: HTMLMetaElement;
  itemPropName: HTMLMetaElement;
  itemPropDescription: HTMLMetaElement;
  itemPropImage: HTMLMetaElement;
  ogUrl: HTMLMetaElement;
  ogType: HTMLMetaElement;
  ogTitle: HTMLMetaElement;
  ogDescription: HTMLMetaElement;
  ogImage: HTMLMetaElement;
  twitterCard: HTMLMetaElement;
  twitterSite: HTMLMetaElement;
  twitterTitle: HTMLMetaElement;
  twitterDescription: HTMLMetaElement;
  twitterImage: HTMLMetaElement;
}

type MetaType = 'name' | 'itemprop' | 'property';

function convertHeadChildrenToObject(elements: HTMLMetaElement[]): Partial<HeadChildren> {
  const result: Partial<HeadChildren> = {};

  elements.forEach(e => {
    const name = e.getAttribute('name');
    const itemprop = e.getAttribute('itemprop');
    const property = e.getAttribute('property');

    if (name === 'description') {
      result.description = e;
    } else if (itemprop === 'name') {
      result.itemPropName = e;
    } else if (itemprop === 'description') {
      result.itemPropDescription = e;
    } else if (itemprop === 'image') {
      result.itemPropImage = e;
    } else if (property === 'og:url') {
      result.ogUrl = e;
    } else if (property === 'og:type') {
      result.ogType = e;
    } else if (property === 'og:title') {
      result.ogTitle = e;
    } else if (property === 'og:description') {
      result.ogDescription = e;
    } else if (property === 'og:image') {
      result.ogImage = e;
    } else if (name === 'twitter:card') {
      result.twitterCard = e;
    } else if (name === 'twitter:site') {
      result.twitterSite = e;
    } else if (name === 'twitter:title') {
      result.twitterTitle = e;
    } else if (name === 'twitter:description') {
      result.twitterDescription = e;
    } else if (name === 'twitter:image') {
      result.twitterImage = e;
    }
  });

  return result;
}

function addMetaElement({ key, type, content }: { key: string; type: MetaType; content: string }) {
  const meta = document.createElement('meta');
  meta.setAttribute(type, key);
  meta.content = content;
  document.head.appendChild(meta);
}

export function updateMetaService(meta: Meta) {
  if (typeof document === 'undefined') {
    return;
  }

  const headChildren = convertHeadChildrenToObject(Array.from(document.head.children).filter(
    e => e instanceof HTMLMetaElement,
  ) as HTMLMetaElement[]);

  if (meta.title) {
    document.title = meta.title;

    if (headChildren.itemPropName) {
      headChildren.itemPropName.content = meta.title;
    } else {
      addMetaElement({ key: 'name', type: 'itemprop', content: meta.title });
    }

    if (headChildren.ogTitle) {
      headChildren.ogTitle.content = meta.title;
    } else {
      addMetaElement({ key: 'og:title', type: 'property', content: meta.title });
    }

    if (headChildren.twitterTitle) {
      headChildren.twitterTitle.content = meta.title;
    } else {
      addMetaElement({ key: 'twitter:title', type: 'name', content: meta.title });
    }
  }

  if (meta.description) {
    if (headChildren.description) {
      headChildren.description.content = meta.description;
    } else {
      addMetaElement({ key: 'description', type: 'name', content: meta.description });
    }

    if (headChildren.itemPropDescription) {
      headChildren.itemPropDescription.content = meta.description;
    } else {
      addMetaElement({ key: 'description', type: 'itemprop', content: meta.description });
    }

    if (headChildren.ogDescription) {
      headChildren.ogDescription.content = meta.description;
    } else {
      addMetaElement({ key: 'og:description', type: 'property', content: meta.description });
    }

    if (headChildren.twitterDescription) {
      headChildren.twitterDescription.content = meta.description;
    } else {
      addMetaElement({ key: 'twitter:description', type: 'name', content: meta.description });
    }
  }

  if (meta.image) {
    if (headChildren.itemPropImage) {
      headChildren.itemPropImage.content = meta.image;
    } else {
      addMetaElement({ key: 'image', type: 'itemprop', content: meta.image });
    }

    if (headChildren.ogImage) {
      headChildren.ogImage.content = meta.image;
    } else {
      addMetaElement({ key: 'og:image', type: 'property', content: meta.image });
    }

    if (headChildren.twitterImage) {
      headChildren.twitterImage.content = meta.image;
    } else {
      addMetaElement({ key: 'twitter:image', type: 'name', content: meta.image });
    }
  }

  if (meta.og) {
    if (meta.og.type) {
      if (headChildren.ogType) {
        headChildren.ogType.content = meta.og.type;
      } else {
        addMetaElement({ key: 'og:type', type: 'property', content: meta.og.type });
      }
    }

    if (meta.og.url) {
      if (headChildren.ogUrl) {
        headChildren.ogUrl.content = meta.og.url;
      } else {
        addMetaElement({ key: 'og:url', type: 'property', content: meta.og.url });
      }
    }
  }

  if (meta.twitter) {
    if (meta.twitter.card) {
      if (headChildren.twitterCard) {
        headChildren.twitterCard.content = meta.twitter.card;
      } else {
        addMetaElement({ key: 'twitter:card', type: 'name', content: meta.twitter.card });
      }
    }

    if (meta.twitter.site) {
      if (headChildren.twitterSite) {
        headChildren.twitterSite.content = meta.twitter.site;
      } else {
        addMetaElement({ key: 'twitter:site', type: 'name', content: meta.twitter.site });
      }
    }
  }
}
