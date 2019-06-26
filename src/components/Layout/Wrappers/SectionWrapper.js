/**
 * Vendor imports.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom imports.
 */
import classes from './SectionWrapper.css';

/**
 * A stateless component representing a section wrapper.
 */
const SectionWrapper = ({ title, children }) => (
  <div className={classes.sectionWrapper}>
    <h2 className={classes.title}>{title}</h2>
    {children}
  </div>
);

/**
 * Component props.
 */
SectionWrapper.propTypes = {
  /** The section title */
  title:    PropTypes.string.isRequired,
  /** The children elements to be rendered inside the section wrapper */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

/**
 * Module exports.
 */
export default SectionWrapper;
