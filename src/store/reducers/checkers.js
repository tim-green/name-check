/**
 * Vendor imports.
 */
import * as actionTypes from '../actions/actionTypes';

/**
 * An object containing the initial stored state.
 * @constant {object} initialState
 */
const initialState = {
  /** The username being checked */
  username: '',
  /** The data of all available checkers for both sites and domains */
  checkers: {
    sites: require('../data/sites.json'),
    domains: require('../data/domains.json')
  },
  /** The initial app status */
  checking: false,
  /** The total number of checkers */
  total: 0,
  /** When a checking is being made this holds the number of checkers
   *  that did not finish checking yet.
   * */
  pending: 0
};

/**
 * Change username and mark app status as 'checking'.
 *
 * @param {object} state - The current version of the stored state.
 * @param {object} action - The action that was dispatched.
 */
const changeUsername = ( state, action ) => {
  return {
    ...state,
    username: action.username,
    checking: action.username !== '',
    pending: state.total
  };
}

/**
 * Decrease the number of checkers that are still checking the current username.
 *
 * @param {object} state - The current version of the stored state.
 * @param {object} action - The action that was dispatched.
 */
const checkerFinished = ( state, action ) => {
  return {
    ...state,
    pending: --state.pending,
    checking: !!state.pending
  };
}

/**
 * Reducer for name checking actions.
 *
 * @param {object} state - The current version of the stored state.
 * @param {object} action - The action that was dispatched.
 */
const reducer = ( state, action ) => {

  if (!state) {
    state = initialState;
    let numSites = Object.keys(state.checkers.sites).length;
    let numDomains = Object.keys(state.checkers.domains).length;
    state.total = numSites + numDomains;
  }

  switch ( action.type ) {
      case actionTypes.CHANGE_USERNAME:
        return changeUsername( state, action );
      case actionTypes.CHECKER_FINISHED:
        return checkerFinished( state, action );
      default:
        return state;
  }
};

/**
 * Module exports.
 */
export default reducer;
