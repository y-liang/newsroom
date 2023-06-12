import { Article } from '@/app/lib/interfaces';

const { NEWS_API_URL: baseUrl, NEWS_API_KEY: key, NODE_ENV: environment } = process.env;

async function getNews(query?: string): Promise<{ status: string; articles?: Article[]; }> {
  const endpoint = query ? `${baseUrl}/everything?q=${query}` : `${baseUrl}/top-headlines?country=us`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': key!,
      },
      cache: `${environment == 'production' ? 'no-store' : 'force-cache'}`
    });

    const { status, ...result } = await response.json();

    if(status == 'error') {
      console.error(result.code + ': ' + result.message);
    }

    const { articles } = result;

    return { status, articles };
  } catch(error) {
    console.error(error);
    return { status: 'error' };
  }
}

function reshapeArticles(articles: Article[]) {
  articles.forEach((item: any) => {
    delete item.content;
    item.source = item.source.name;
    item.publishedAt = new Date(item.publishedAt).toLocaleDateString();
  });
  return articles;
}

export default async function findNews(query?: string) {
  const { articles } = await getNews(query);
  if(!articles) return [];
  return reshapeArticles(articles);
}


