import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { UserIcon, BriefcaseIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const ProfilePage = () => {
  const { t } = useTranslation()
  const { user, updateUser, toggleBusinessStatus } = useAuth()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: {
      first: user?.name.first || '',
      middle: user?.name.middle || '',
      last: user?.name.last || ''
    },
    phone: user?.phone || '',
    image: {
      url: user?.image?.url || '',
      alt: user?.image?.alt || ''
    },
    address: {
      country: user?.address?.country || '',
      city: user?.address?.city || '',
      street: user?.address?.street || '',
      houseNumber: user?.address?.houseNumber || '',
      state: user?.address?.state || '',
      zip: user?.address?.zip || ''
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateUser({
        ...formData,
        address: {
          ...formData.address,
          houseNumber: Number(formData.address.houseNumber),
          zip: formData.address.zip ? Number(formData.address.zip) : null
        }
      })
      setEditing(false)
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false)
    }
  }

  const handleToggleBusiness = async () => {
    try {
      await toggleBusinessStatus()
    } catch (error) {
      // Error handled in context
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const getAccountTypeIcon = () => {
    if (user?.isAdmin) return <ShieldCheckIcon className="w-5 h-5" />
    if (user?.isBusiness) return <BriefcaseIcon className="w-5 h-5" />
    return <UserIcon className="w-5 h-5" />
  }

  const getAccountTypeLabel = () => {
    if (user?.isAdmin) return t('profile.admin')
    if (user?.isBusiness) return t('profile.business')
    return t('profile.regular')
  }

  return (
    <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          {t('profile.title')}
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass dark:glass-dark rounded-3xl p-8"
      >
        {/* Account Type Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            {getAccountTypeIcon()}
            <span className="font-medium">{getAccountTypeLabel()}</span>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn-secondary"
            >
              {t('profile.editProfile')}
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('profile.personalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.firstName')}
                  </label>
                  <input
                    type="text"
                    name="name.first"
                    value={formData.name.first}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="name.middle"
                    value={formData.name.middle}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.lastName')}
                  </label>
                  <input
                    type="text"
                    name="name.last"
                    value={formData.name.last}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('auth.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.country')}
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.city')}
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.street')}
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('auth.houseNumber')}
                  </label>
                  <input
                    type="number"
                    name="address.houseNumber"
                    value={formData.address.houseNumber}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn-secondary"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? t('common.loading') : t('common.save')}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Display Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('profile.personalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-medium">{user?.name.first} {user?.name.middle} {user?.name.last}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                  <p className="font-medium">
                    {user?.address.houseNumber} {user?.address.street}, {user?.address.city}, {user?.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Business Status Toggle */}
      {!user?.isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass dark:glass-dark rounded-3xl p-8"
        >
          <h3 className="text-lg font-semibold mb-4">{t('profile.businessStatus')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {user?.isBusiness 
              ? 'You have a business account. You can create and manage business cards.'
              : 'Upgrade to a business account to create and manage business cards.'}
          </p>
          <button
            onClick={handleToggleBusiness}
            className="btn-primary"
          >
            {user?.isBusiness ? 'Switch to Regular Account' : 'Upgrade to Business Account'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default ProfilePage
