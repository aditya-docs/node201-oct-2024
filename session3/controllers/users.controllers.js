const usersJson = require("../users.json");
const { userSearchSchema } = require("../validations/users.validations");

const getUsers = (req, res) => {
  if (req.headers.authorization !== process.env.PASSWORD)
    return res.status(401).send({ message: "Unauthorized" });
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
  const { error } = userSearchSchema.validate({ gender, age });

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

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
