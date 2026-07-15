import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

function ErrorPage() {
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400">{message}</p>
      <Link
        to="/"
        className="rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-400"
      >
        Back home
      </Link>
    </div>
  )
}

export default ErrorPage
