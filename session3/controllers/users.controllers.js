const usersJson = require("../users.json");
const { possibleGenders } = require("../config");

const getUsers = (req, res) => {
  res.send(usersJson.data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const reqUser = usersJson.data.find((user) => user.login.uuid === uuid);
  if (reqUser) return res.send(reqUser);
  res.status(404).send({ message: `User with uuid: '${uuid}' not found` });
};

const searchUsers = (req, res) => {
  const { gender, age } = req.query;

  if (gender && !possibleGenders.includes(gender)) {
    return res.status(400).send({
      message: "Please provide a valid value for gender",
    });
  }
  if ((age && isNaN(age)) || Number(age) < 0 || Number(age) > 100) {
    return res.status(400).send({
      message: "Please provide a number for age between 0 and 100",
    });
  }

  if (gender && age) {
    return res.send(
      usersJson.data.filter(
        (user) => user.gender === gender && String(user.dob.age) === age
      )
    );
  } else if (gender) {
    return res.send(usersJson.data.filter((user) => user.gender === gender));
  } else if (age) {
    return res.send(
      usersJson.data.filter((user) => String(user.dob.age) === age)
    );
  } else {
    return res.status(400).send({
      message: "Please provide either gender or age as query parameter",
    });
  }
};

module.exports = { getUsers, getUserById, searchUsers };
