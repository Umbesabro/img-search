import * as nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';


export type UnsplashQuery = {
    query: string,
    per_page: string,
    page: string
}

export class UnsplashService {
  private _apiClient: any;
  constructor() {
    this._apiClient = createApi({
      accessKey: process.env.UNSPLASH_API_KEY!,
      fetch: nodeFetch.default as unknown as typeof fetch,
    });
  }
  
  async search(query: UnsplashQuery) {
    const result = await this._apiClient.search.getPhotos(query);
    if (result.errors) {
      throw new Error(result.errors);
    } else {
      return result;
    }
  }
}
