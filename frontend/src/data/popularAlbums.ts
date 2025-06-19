export interface Album {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  type: 'album';
}

export const popularAlbums: Album[] = [
  {
    id: 1,
    title: "Renaissance",
    artist: "Beyoncé",
    imageUrl: "/images/albums/renaissance.JPG",
    type: 'album'
  },
  {
    id: 2,
    title: "30",
    artist: "Adele",
    imageUrl: "/images/albums/30.PNG",
    type: 'album'
  },
  {
    id: 3,
    title: "Midnights",
    artist: "Taylor Swift",
    imageUrl: "/images/albums/midnights.JPG",
    type: 'album'
  },
  {
    id: 4,
    title: "Harry's House",
    artist: "Harry Styles",
    imageUrl: "/images/albums/harrys-house.JPG",
    type: 'album'
  },
  {
    id: 5,
    title: "Planet Her",
    artist: "Doja Cat",
    imageUrl: "/images/albums/planet-her.JPG",
    type: 'album'
  }
]; 