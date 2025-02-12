'use server';

import parse from 'node-html-parser';

export async function fetchOG(url: string) {
  console.log('fetch Data from this url>>', url);
  const html = await fetch(url).then((res) => res.text());

  // node-html-parser로 파싱
  const root = parse(html);
  const title =
    root.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    'no title';
  const imgUrl =
    root.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
    'no img';
  const description =
    root
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content') || 'no description';

  return { title, imgUrl, description };
}
