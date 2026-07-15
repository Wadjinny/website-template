import { useState } from 'react'
import { Link } from 'react-router'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <section className="flex flex-col items-center gap-6 py-24 text-center">
      <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-sm text-sky-600 dark:text-sky-300">
        Built with React Router (data mode)
      </span>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        A basic example page,
        <span className="bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400">
          {' '}with client-side routing
        </span>
      </h1>
      <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
        This starter uses <code className="text-sky-600 dark:text-sky-300">createBrowserRouter</code> and{' '}
        <code className="text-sky-600 dark:text-sky-300">RouterProvider</code> with route loaders to fetch data
        before rendering.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-sky-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 active:scale-95"
        >
          Clicked {count} {count === 1 ? 'time' : 'times'}
        </button>
        <Link
          to="/features"
          className="rounded-lg border border-slate-200 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
        >
          Explore 404 page 😂
        </Link>
      </div>
    </section>
  )
}

export default Home
