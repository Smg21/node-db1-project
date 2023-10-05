const db = require("../../data/db-config");

const getAll = async () => {
  return db("accounts");
}

const getById = async id => {
  return db("accounts").where("id", id).first();
}

const create = async account => {
    const [newAccountID] = await db("accounts").insert(account);
    return getById(newAccountID);
}

const updateById = async (id, account) => {
  await db("accounts").update(account).where("id", id);
  return getById(id);
}

const deleteById = async id => {
  return db("accounts").where("id", id).delete(); 
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}