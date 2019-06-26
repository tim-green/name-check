/**
 * Vendor imports.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Custom imports.
 */
import classes from './CheckersGroup.css';
import Checker from '../Checker/Checker';

/**
 * A stateless component representing a group of checkers.
 */
const CheckersGroup = ({ checkers, type }) => (
  <div className={classes.checkersGroup}>
    <ul>
      {checkers.map(id => (
        <li className={classes.item} key={id}>
          <Checker id={id} type={type}/>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Component props.
 */
CheckersGroup.propTypes = {
  /** The type of checkers that are displayed on the group: sites or domains */
  type:       PropTypes.oneOf(['sites', 'domains']).isRequired,
  /** The list of checkers to be included */
  checkers:   PropTypes.array
};

/**
 * Default values for component props.
 */
CheckersGroup.defaultProps = {
  checkers: []
};

/**
 * Props mappings to store's state.
 * @constant {object} mapStateToProps
 */
const mapStateToProps = (store, props) => ({
  checkers: Object.keys(store.checkers[props.type]),
});

/**
 * Module exports.
 */
export default connect(mapStateToProps)(CheckersGroup);
