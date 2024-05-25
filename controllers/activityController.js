const { getAllActivity, getActivityWithId, editActivityPatch, editActivityPut,
    registerActivity, deleteActivityById } = require('@services/activityService');
const httpStatus = require('@configs/httpStatusCode.json');


const getActivities = async (req, res) => {
    try {
        const activities = await getAllActivity();
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const getActivitiesById = async (req, res) => {
    try {
        const activity = await getActivityWithId(req.params.id);
        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ error: httpStatus['400'] });
            console.log("err")
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const updateActivitiesPatch = async (req, res) => {
    try {
        res.status(200).json(await editActivityPatch(req.params.id, req.body));
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const updateActivitiesPut = async (req, res) => {
    try {
        res.status(200).json(await editActivityPut(req.params.id, req.body));
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const createActivity = async (req, res) => {
    try {
        const result = await registerActivity(req.body);
        res.status(202).status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const deleteActivity = async (req, res) => {
    try {
        const result = await deleteActivityById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getActivities, getActivitiesById, updateActivitiesPatch,
    updateActivitiesPut, createActivity, deleteActivity,
};
