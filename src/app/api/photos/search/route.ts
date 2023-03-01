import { UnsplashService } from '../../../../services/unsplash.service';

const unsplashService = new UnsplashService();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { query, per_page, page } = Object.fromEntries(url.searchParams.entries());

  if (!query) {
    return new Response('Missing query param', { status: 400 });
  }
  try {
    const imageSearchResponse = await unsplashService.search({ query, per_page, page });
    const response = new Response(JSON.stringify(imageSearchResponse.response), {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (err) {
    console.error(`Failed to fetch images ${err}`);
    return new Response('Failed to feetch images', { status: 500 });
  }
}
