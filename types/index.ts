export interface IUserOrder {
  awards: {
    date: string
    id: number
    image_url: string
    name: string
  }[]
  awards_count: number
  biography: string
  id: number
  name: string
  position: string
}
export interface IAwardee {
  name: string
  description: string
  image_url: string
  code: boolean
  partner_count: number
  link: string
}
