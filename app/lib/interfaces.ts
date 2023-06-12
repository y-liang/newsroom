export interface Article {
   title: string;
   source: string;
   publishedAt: string;
   description: string;
   url: string;
   urlToImage: string;
};

export interface BookmarkContext {
   starred: Set<Article>;
   setStarred: (starred: Set<Article>) => void;
   visited: Set<string>;
   setVisited: (visited: Set<string>) => void;
}