export interface Single {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  type: 'single';
}

export const popularSingles: Single[] = [
  {
    id: 1,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    imageUrl: "/images/singles/anti-hero.jpg.PNG",
    type: 'single'
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    imageUrl: "/images/singles/as-it-was.JPG",
    type: 'single'
  },
  {
    id: 3,
    title: "Break My Soul",
    artist: "Beyoncé",
    imageUrl: "/images/singles/break-out-soul.PNG",
    type: 'single'
  },
  {
    id: 4,
    title: "Easy On Me",
    artist: "Adele",
    imageUrl: "/images/singles/easy-on-me.JPG",
    type: 'single'
  },
  {
    id: 5,
    title: "About Damn Time",
    artist: "Lizzo",
    imageUrl: "/images/singles/about-damn-time.PNG",
    type: 'single'
  }
]; 