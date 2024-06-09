const { UsersHasActivities } = require("@models/usersHasActivitiesModel");
const { Activity, User } = require("@models/index");

const addUsersToActivity = async (userIds, activityId) => {
    if (!Array.isArray(userIds) || !activityId) {
        throw new Error('Invalid input');
    }

    const activity = await Activity.findByPk(activityId);

    if (!activity) {
        throw new Error('Activity not found');
    }

    // Verifica que todos los usuarios existen
    const users = await User.findAll({
        where: {
            id: userIds
        }
    });

    if (users.length !== userIds.length) {
        throw new Error('Some users not found');
    }

    const userActivities = userIds.map(userId => ({
        idUser: userId,
        idActivitie: activityId,
        amount: activity.amount || 0
    }));

    await UsersHasActivities.bulkCreate(userActivities);
    return { message: 'Users added to activity successfully' };
};

module.exports = { addUsersToActivity };