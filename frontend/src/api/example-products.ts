export type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const BASE = 'https://dummyjson.com'

export async function fetchProducts(params: {
  q?: string
  limit?: number
  skip?: number
}): Promise<ProductsResponse> {
  const { q, limit = 12, skip = 0 } = params
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) })

  const url = q
    ? `${BASE}/products/search?q=${encodeURIComponent(q)}&${search}`
    : `${BASE}/products?${search}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Products request failed: ${res.status}`)
  return res.json() as Promise<ProductsResponse>
}
