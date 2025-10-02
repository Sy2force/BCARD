import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../api/axiosInstance';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  UsersIcon, CreditCardIcon, ChartBarIcon, ArrowTrendingUpIcon,
  CalendarIcon, BuildingOfficeIcon, ClockIcon, StarIcon
} from '@heroicons/react/24/outline';

interface Stats {
  totalUsers: number;
  totalCards: number;
  businessUsers: number;
  activeToday: number;
  cardsPerMonth: Array<{ month: string; count: number }>;
  userGrowth: Array<{ month: string; users: number }>;
  topCards: Array<any>;
  percentBusinessUsers: number;
  avgCardsPerUser: number;
}

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500">
        Failed to load statistics
      </div>
    );
  }

  const pieData = [
    { name: 'Business Users', value: stats.businessUsers },
    { name: 'Regular Users', value: stats.totalUsers - stats.businessUsers }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Platform statistics and insights
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 inline mr-1" />
            {stats.percentBusinessUsers}% are business users
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Cards</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalCards.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="mt-2 text-sm text-blue-600">
            <ChartBarIcon className="w-4 h-4 inline mr-1" />
            {stats.avgCardsPerUser} cards per user
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Business Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.businessUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl">
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="mt-2 text-sm text-purple-600">
            <StarIcon className="w-4 h-4 inline mr-1" />
            Premium accounts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Today</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeToday.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="mt-2 text-sm text-orange-600">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Daily active users
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            User Growth Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
                name="New Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cards Per Month */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Cards Created Per Month
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.cardsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#ec4899" 
                name="Cards Created"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            User Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Top Liked Cards
          </h3>
          <div className="space-y-3">
            {stats.topCards.map((card, index) => (
              <div key={card._id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{card.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{card.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-pink-600">{card.likes?.length || 0} likes</p>
                  <p className="text-xs text-gray-500">{card.user_id?.name?.first} {card.user_id?.name?.last}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
