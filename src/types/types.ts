export interface City {
  href: string,
  location: {
    city: string
  }
}

export interface Network {
  name: string,
  stations: Station[]
}

export interface Station {
  name: string,
  id: string
}
export interface LikedStations {
  likedStations: Station[]
}