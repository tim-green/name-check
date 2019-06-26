
import * as actionTypes from './actionTypes';

export const changeUsername = (username) => {
  return {
      type: actionTypes.CHANGE_USERNAME,
      username: username
  };
};

export const checkerFinished = (id) => {
  return {
      type: actionTypes.CHECKER_FINISHED,
      id: id
  };
};