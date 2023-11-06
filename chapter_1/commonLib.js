export const grade = {
  L1: 'L1',
  L2: 'L2',
  L3: 'L3',
  L4: 'L4',
};

export function makeTeam(mng, frontenders, backenders) {
  let team = {
    manager: mng,
    developers: {
      frontend: frontenders,
      backend: backenders,
    },
  };

  return team;
}

export function makeStaff(managers_, frontenders, backenders) {
  let staff = {
    managers: managers_,
    developers: {
      frontend: frontenders,
      backend: backenders,
    },
  };

  return staff;
}

export var checkType = function checkType(value, type) {
  if (Array.isArray(value) || type === null || type === undefined) {
    throw new Error(
      'The argument "type" can not be a array, "null", "undefined"!'
    );
  }

  return Object.getPrototypeOf(Object(value)) === type.prototype;
};

export var checkArrayType = function checkArrayType(value, type) {
  if (!Array.isArray(value) || type === null || type === undefined) {
    throw new Error(
      'The argument "type" must be a array, not "null", "undefined"!'
    );
  }

  return value.every(function (e) {
    return Object.getPrototypeOf(Object(e)) === type.prototype;
  });
};
