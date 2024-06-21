const { Activity, User, UsersHasActivities, Group } = require("@models/index");

const getAllActivity = async () => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: User,
          as: 'users',
          through: UsersHasActivities,
          attributes: ['id', 'firstName', 'email'],
        },
      ],
    });

    // Calcula el porcentaje que cada usuario debe pagar y elimina el campo 'users_has_activities'
    activities.forEach(activity => {
      const userCount = activity.users.length;
      activity.users.forEach(user => {
        user.dataValues.amount = (activity.amount / userCount).toFixed(2);
        delete user.dataValues.users_has_activities;
      });
    });

    return activities;
  } catch (err) {
    throw err;
  }
};

const getActivityWithId = async (id) => {
  try {
    const activity = await Activity.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          through: UsersHasActivities,
          attributes: ['id', 'firstName', 'email'],
        },
      ],
    });

    if (!activity) {
      throw new Error("Activity not found");
    }

    // Calcula el porcentaje que cada usuario debe pagar y elimina el campo 'users_has_activities'
    const userCount = activity.users.length;
    activity.users.forEach(user => {
      user.dataValues.amount = (activity.amount / userCount).toFixed(2);
      delete user.dataValues.users_has_activities;
    });

    return activity;
  } catch (err) {
    throw err;
  }
};

const getActivityByIdGroup = async (id) => {
  try {
    const activity = await Activity.findOne({ where: { id: id } });
    if (!activity) {
      throw new Error("Activity not found");
    }
    return activity;
  } catch (err) {
    throw err;
  }
};

const editActivityPut = async (id, updatedFields) => {
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      throw new Error("Activity not found");
    }
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] !== undefined) {
        activity[key] = updatedFields[key];
      } else {
        throw new Error("All fields are required");
      }
    });
    return await activity.save();
  } catch (err) {
    throw err;
  }
};

const editActivityPatch = async (id, updatedFields) => {
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      throw new Error("activity not found");
    }
    for (const key of Object.keys(updatedFields)) {
      if (key === "idGroup") {
        const group = await Group.findByPk(updatedFields[key]);
        if (!group) {
          return { message: "Group not found" };
        }
      }
      activity[key] = updatedFields[key];
    }
    return await activity.save();
  } catch (err) {
    throw err;
  }
};

const registerActivity = async ({ idGroup, name, amount, type, date }) => {
  try {
    const newActivity = new Activity({ idGroup, name, amount, type, date });
    return await newActivity.save();
  } catch (err) {
    console.log(err);
    console.log("err");
    throw err;
  }
};

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
  getAllActivity,
  getActivityWithId,
  getActivityByIdGroup,
  editActivityPut,
  editActivityPatch,
  registerActivity,
  deleteActivityById,
};