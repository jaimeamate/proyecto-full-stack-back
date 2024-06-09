const { Activity, User, UsersHasActivities } = require("@models/index");

const addUsersToActivity = async (userIds, activityId) => {
    try {
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
            idActivitie: activity.id,
            amount: activity.amount || 0
        }));

        return await UsersHasActivities.bulkCreate(userActivities);

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUsersInActivity = async (userIds, activityId) => {
    try {
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
        // Elimina todas las filas existentes para esta actividad
        await UsersHasActivities.destroy({
            where: {
                idActivitie: activityId
            }
        });

        // Crea nuevas filas con los userIds proporcionados
        const userActivities = userIds.map(userId => ({
            idUser: userId,
            idActivitie: activityId,
            amount: activity.amount || 0
        }));

        return await UsersHasActivities.bulkCreate(userActivities, { updateOnDuplicate: ['amount'] });
        // return { message: 'Users updated in activity successfully' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllUsersFromActivity = async (activityId) => {
    try {
        if (!activityId) {
            throw new Error('Invalid input');
        }

        const activity = await Activity.findByPk(activityId);

        if (!activity) {
            throw new Error('Activity not found');
        }

        return await UsersHasActivities.findAll({
            where: {
                idActivitie: activityId
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteUsersFromActivity = async (activityId) => {
    try {
        if (!activityId) {
            throw new Error('Invalid input');
        }
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }

        await UsersHasActivities.destroy({
            where: {
                idActivitie: activityId
            }
        });
        return { message: 'Users removed from activity successfully' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports = { addUsersToActivity, updateUsersInActivity, getAllUsersFromActivity, deleteUsersFromActivity };