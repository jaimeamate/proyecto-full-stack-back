const {
  addUsersToActivity,
  updateUsersInActivity,
  getAllUsersFromActivity,
  deleteUsersFromActivity,
} = require("@services/usersHasActivitiesServices");

const postUsersInActivity = async (req, res) => {
  try {
    const { idActivity, userIds } = req.body;
    const result = await addUsersToActivity(userIds, idActivity);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const patchUsersInActivity = async (req, res) => {
  try {
    const { userIds } = req.body;
    const result = await updateUsersInActivity(userIds, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getUsersFromActivity = async (req, res) => {
  try {
    const result = await getAllUsersFromActivity(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const removeUsersFromActivity = async (req, res) => {
  try {
    const result = await deleteUsersFromActivity(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postUsersInActivity,
  patchUsersInActivity,
  getUsersFromActivity,
  removeUsersFromActivity,
};
