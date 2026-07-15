import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/example-products'

const PAGE_SIZE = 12

function Products() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ['products', { q, page }],
    queryFn: () => fetchProducts({ q, limit: PAGE_SIZE, skip: page * PAGE_SIZE }),
    placeholderData: keepPreviousData,
  })

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0

  return (
    <section className="py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Products</h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">
        Fetched from the DummyJSON API with TanStack Query.
      </p>

      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setPage(0)
        }}
        placeholder="Search products…"
        className="mb-8 w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
      />

      {isPending && <p className="text-slate-500 dark:text-slate-400">Loading…</p>}
      {isError && <p className="text-red-500 dark:text-red-400">{(error as Error).message}</p>}

      {data && (
        <>
          {data.products.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No products found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-400/40 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="mb-3 h-36 w-full rounded-lg bg-slate-100 object-cover dark:bg-white/5"
                  />
                  <span className="text-xs uppercase tracking-wide text-sky-600 dark:text-sky-300">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-semibold">{product.title}</h3>
                  <p className="mt-auto pt-2 text-sm text-slate-500 dark:text-slate-400">
                    ${product.price.toFixed(2)}
                  </p>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/15 dark:hover:bg-white/5"
            >
              Prev
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {page + 1} / {totalPages || 1}
              {isFetching && ' · updating…'}
            </span>
            <button
              onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
              disabled={page + 1 >= totalPages}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/15 dark:hover:bg-white/5"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Products
