
const Activity = require("@models/index");

const getAllActivity = async () => {
    try {
        return await Activity.findAll();
    } catch (err) {
        throw err;
    }
}

const getActivityWithId = async (id) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            console.log("eror");
            throw new Error('Activity not found');
        }
        return activity;
    } catch (err) {
        throw err;
    }
}

const getActivityByIdGroup = async (id) => {
    try {
        const activity = await Activity.findOne({ where: { id: id } });
        if (!activity) {
            throw new Error('Activity not found');
        }
        return activity;
    } catch (err) {
        throw err;
    }
}


const editActivityPut = async (id, updatedFields) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            throw new Error('Activity not found');
        }
        Object.keys(updatedFields).forEach(key => {
            if (updatedFields[key] !== undefined) {
                activity[key] = updatedFields[key];
            } else {
                throw new Error('All fields are required');
            }
        })
        return await activity.save();
    } catch (err) {
        throw err;
    }
}

const editActivityPatch = async (id, updatedFields) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            throw new Error('activity not found');
        }
        Object.keys(updatedFields).forEach(key => {
            activity[key] = updatedFields[key];
        })
        return await activity.save();
    } catch (err) {
        throw err;
    }
}

const registerActivity = async ({ idGroup, name, amount, type, date }) => {
    try {
        const newActivity = new Activity({ idGroup, name, amount, type, date });
        return await newActivity.save();
    } catch (err) {
        console.log(err);
        console.log("err");
        throw err;
    }
}

const deleteActivityById = async (id) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            throw new Error("activity not found");
        }
        await activity.destroy();
        return { message: "activity deleted successfully" };
    } catch (err) {
        throw err;
    }
};



module.exports = {
    getAllActivity, getActivityWithId, getActivityByIdGroup,
    editActivityPut, editActivityPatch, registerActivity, deleteActivityById
};