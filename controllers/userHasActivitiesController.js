const { addUsersToActivity } = require("@services/usersHasActivitiesServices");

const addUsersToActivityController = async (req, res) => {
    try {
        const { userIds, activityId, amount } = req.body;
        const result = await addUsersToActivity(userIds, activityId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addUsersToActivityController };