import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Card from '../models/Card';

// @desc    Get platform statistics
// @route   GET /api/stats
// @access  Private (Admin)
export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get basic counts
    const [totalUsers, totalCards, businessUsers, activeToday] = await Promise.all([
      User.countDocuments(),
      Card.countDocuments(),
      User.countDocuments({ isBusiness: true }),
      User.countDocuments({ 
        updatedAt: { $gte: today }
      })
    ]);

    // Get cards per month for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const cardsPerMonth = await Card.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          month: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month'
                }
              }
            }
          },
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get user growth for last 6 months
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          users: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          month: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month'
                }
              }
            }
          },
          users: 1,
          _id: 0
        }
      }
    ]);

    // Get top liked cards
    const topCards = await Card.find()
      .sort({ likes: -1 })
      .limit(5)
      .populate('user_id', 'name email');

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCards,
        businessUsers,
        activeToday,
        cardsPerMonth,
        userGrowth,
        topCards,
        percentBusinessUsers: totalUsers > 0 ? ((businessUsers / totalUsers) * 100).toFixed(1) : 0,
        avgCardsPerUser: totalUsers > 0 ? (totalCards / totalUsers).toFixed(1) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};
