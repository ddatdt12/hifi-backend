const excludeFields = (object, ...excludedFields) => {
  const newObj = {};
  Object.keys(object).forEach((el) => {
    if (!excludedFields.includes(el)) newObj[el] = object[el];
  });
  return newObj;
};
const filterObject = (object, ...allowedFields) => {
  const newObj = {};
  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = object[el];
  });
  return newObj;
};

const convertBooleanQuery = (object, ...fields) => {
  Object.keys(object).forEach((el) => {
    if (fields.includes(el)) object[el] = object[el] === '1';
  });
};

const objIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const convertNestedObjectQuery = (objectName, object) => {
  const newObj = {};
  Object.keys(object).forEach((k) => {
    newObj[`${objectName}.${k}`] = object[k];
  });

  return newObj;
};
module.exports = {
  excludeFields,
  filterObject,
  objIsEmpty,
  convertBooleanQuery,
  convertNestedObjectQuery,
};
