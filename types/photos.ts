// types/photos.ts
export interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: PhotoUrls;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string | null;
    };
  };
}

export interface UnsplashSearchAPIResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface GalleryItem {
  id: string;
  description: string | null;
  urls: PhotoUrls;
}

export interface UnsplashResponse {
  data: GalleryItem[] | null;
  error: string | null;
}
