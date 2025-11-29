import { MetadataRoute } from 'next';

// 1. Next.js의 MetadataRoute.Sitemap 타입을 가져옵니다.
// 이 타입을 사용하면 Next.js가 자동으로 XML 형식으로 변환해 줍니다.
export default function sitemap(): MetadataRoute.Sitemap {
  // 2. 'daily'로 설정된 market 페이지의 lastModified 값을 동적으로 처리하기 위해
  // 현재 시점의 날짜/시간을 ISO 8601 형식으로 가져옵니다.
  // 참고: 이 파일은 기본적으로 빌드 시점에 실행되지만, 아래 market URL에서
  // fetch API를 사용하거나, revalidate 설정을 통해 동적 렌더링을 유도할 수 있습니다.
  const currentDate = new Date().toISOString();

  // 3. URL 객체 배열을 반환합니다. 이 배열의 각 객체가 사이트맵의 <url> 요소가 됩니다.
  return [
    {
      url: 'https://www.bitswipe.xyz',
      lastModified: '2025-11-27T15:02:24.021Z',
      changeFrequency: 'weekly', // <changefreq>weekly</changefreq>
      priority: 1,                // <priority>1</priority>
    },
    {
      url: 'https://www.bitswipe.xyz/privacy',
      lastModified: '2025-11-26T15:02:24.021Z',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.bitswipe.xyz/terms',
      lastModified: '2025-11-26T15:02:24.021Z',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.bitswipe.xyz/market',
      // 'daily' 변경 빈도에 맞춰 lastModified를 현재 시점(빌드 또는 요청 시점)으로 설정합니다.
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    // TODO: 만약 게시글이나 제품과 같은 동적 페이지가 있다면
    // 이 부분에서 데이터베이스 또는 API를 호출하여 URL 목록을 추가해야 합니다.
  ];
}