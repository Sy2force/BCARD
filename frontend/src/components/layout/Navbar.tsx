import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { 
  HomeIcon, 
  CreditCardIcon,
  RectangleStackIcon,
  HeartIcon, 
  UserIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useState, useCallback, useMemo, useEffect } from 'react'

// Language configuration
const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'he', label: 'עב', flag: '🇮🇱', dir: 'rtl' }
]

// Navigation items configuration - Unique icons for each route
const getNavItems = (t: any, user: any) => [
  { path: '/', label: t('nav.home'), icon: HomeIcon, show: true },
  { path: '/cards', label: t('nav.cards'), icon: CreditCardIcon, show: true },
  { path: '/my-cards', label: t('nav.myCards'), icon: RectangleStackIcon, show: !!user },
  { path: '/favorites', label: t('nav.favorites'), icon: HeartIcon, show: !!user },
  { path: '/dashboard', label: t('nav.dashboard'), icon: ChartBarIcon, show: !!user },
  { path: '/admin', label: t('nav.admin'), icon: CogIcon, show: user?.isAdmin },
]

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Memoized navigation items
  const navItems = useMemo(() => getNavItems(t, user), [t, user])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Optimized callbacks
  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }, [logout, navigate])

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }, [i18n])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  // Check if current path is active
  const isActive = useCallback((path: string) => {
    return location.pathname === path
  }, [location.pathname])

  return (
    <nav className={`glass-navbar sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'shadow-lg' 
        : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ProCards
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => item.show).map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200
                    ${active 
                      ? 'text-purple-600 dark:text-cyan-400' 
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-cyan-400'
                    }
                  `}
                >
                  {active && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative w-5 h-5" />
                  <span className="relative font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}

            {user?.isBusiness && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/create-card" 
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('cards.createCard')}</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative flex items-center glass rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`
                    relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                    ${i18n.language === lang.code 
                      ? 'text-white' 
                      : 'text-black dark:text-gray-400 hover:text-purple-600'
                    }
                  `}
                  dir={lang.dir}
                >
                  {i18n.language === lang.code && (
                    <motion.div
                      layoutId="langActive"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center space-x-1">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <SunIcon className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-purple-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg glass hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group"
                >
                  <div className="relative">
                    <UserIcon className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors" />
                    {user.isAdmin && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                    {user.isBusiness && !user.isAdmin && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-white">{user.name.first}</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-white/80 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group shadow-sm border border-gray-200/50 dark:border-transparent"
                  title={t('nav.logout')}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-red-500 transition-colors" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-black dark:text-gray-200 hover:text-purple-600 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-purple-600" />
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  ) : (
                    <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.filter(item => item.show).map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${active 
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}

                {user?.isBusiness && (
                  <Link 
                    to="/create-card" 
                    className="flex items-center space-x-3 px-4 py-3 mx-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span className="font-medium">{t('cards.createCard')}</span>
                  </Link>
                )}

                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
                  {/* Language Selector Mobile */}
                  <div className="flex justify-center space-x-2 pb-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`
                          px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                          ${i18n.language === lang.code 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }
                        `}
                      >
                        {lang.flag} {lang.label}
                      </button>
                    ))}
                  </div>

                  {user ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <UserIcon className="w-5 h-5" />
                        <span className="font-medium">{user.name.first}</span>
                        {user.isAdmin && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Admin</span>
                        )}
                        {user.isBusiness && !user.isAdmin && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Business</span>
                        )}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span className="font-medium">{t('nav.logout')}</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2 px-2">
                      <Link 
                        to="/login" 
                        className="block w-full px-4 py-2 text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
                      >
                        {t('nav.login')}
                      </Link>
                      <Link 
                        to="/register" 
                        className="block w-full px-4 py-2 text-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                      >
                        {t('nav.register')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
