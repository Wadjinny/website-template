import { NavLink, Outlet } from 'react-router'
import { useTheme } from '../theme'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-lg border border-slate-200 px-2 py-1 text-base transition hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/5"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-white/10">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            Template Website
          </NavLink>
          <div className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }: { isActive: boolean }) =>
                  `transition hover:text-slate-900 dark:hover:text-white ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Template Website. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default RootLayout
