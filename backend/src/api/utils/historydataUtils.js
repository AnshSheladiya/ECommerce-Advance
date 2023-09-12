/**
 * File Name: historydataUtils.js
 */

exports.create = (userId, data) => {
  const createHistory = {
    ...data,
    created_at: new Date(),
    created_by: userId,
    is_deleted: false,
  };

  return createHistory;
};

exports.update = (userId, data) => {
  const updateHistory = {
    ...data,
    updated_at: new Date(),
    updated_by: userId,
  };

  return updateHistory;
};

exports.remove = (userId, data) => {
  const removeHistory = {
    ...data,
    deleted_at: new Date(),
    is_deleted: true,
    deleted_by: userId,
    updated_at: new Date(),
    updated_by: userId,
  };

  return removeHistory;
};
