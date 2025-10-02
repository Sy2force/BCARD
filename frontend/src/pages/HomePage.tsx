import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  SparklesIcon, 
  ShareIcon, 
  CogIcon, 
  ChartBarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const HomePage = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: SparklesIcon,
      title: t('home.features.create.title'),
      description: t('home.features.create.description'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShareIcon,
      title: t('home.features.share.title'),
      description: t('home.features.share.description'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CogIcon,
      title: t('home.features.manage.title'),
      description: t('home.features.manage.description'),
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: ChartBarIcon,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description'),
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/30 rounded-full filter blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300/30 rounded-full filter blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300/30 rounded-full filter blur-3xl animate-float animation-delay-4000" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white"
          >
            {t('home.hero')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-100 mb-8 font-medium"
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link to="/register" className="btn-primary flex items-center space-x-2">
              <span>{t('home.getStarted')}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link to="/cards" className="btn-secondary">
              {t('home.learnMore')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {t('home.features.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark rounded-3xl max-w-4xl mx-auto p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who have already upgraded to digital business cards
          </p>
          <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
            <span>Start Free Today</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
