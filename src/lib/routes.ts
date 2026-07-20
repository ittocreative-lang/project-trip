export const routes = {
  hotelDetail: (
    locale: string,
    slug: string
  ) => `/${locale}/hotels/${slug}`,

  hotels: (locale: string) =>
    `/${locale}/hotels`,
}