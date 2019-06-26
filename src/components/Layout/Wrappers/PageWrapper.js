/**
 * Vendor imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom imports.
 */
import classes from './PageWrapper.css';

/**
 * A stateless component representing a page wrapper.
 */
const PageWrapper = ({ children }) => (
  <div className={classes.pageWrapper}>
    {children}
  </div>
);

/**
 * Component props.
 */
PageWrapper.propTypes = {
  /** The children elements to be rendered inside the page wrapper */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

/**
 * Module exports.
 */
export default PageWrapper;
