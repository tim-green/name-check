/**
 * Vendor imports.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

/**
 * Custom imports.
 */
import classes from './Checker.css';
import * as actions from '../../store/actions/index';

/**
 * An object containing all the statuses a checker can have.
 * @constant {object} CHECKER_STATUS
 */
const CHECKER_STATUS = {
  UNCHECKED: 'unchecked',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  CHECKING: 'checking'
};

/**
 * The URL of the CORS proxy being used to check the URLs.
 * @constant {string} CORS_PROXY
 */
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

/**
 * A stateful component representing a site or domain checker.
 * @extends Component
 */
class Checker extends Component {

  /**
   * Component props.
   */
  static propTypes = {
    /** The unique ID associated with the checker */
    id:         PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** The type of checker: sites or domains */
    type:       PropTypes.oneOf(['sites', 'domains']).isRequired,
    /** A callback function to be executed when the checker finishes checking a URL */
    onFinished: PropTypes.func.isRequired,
    /**
     * All the data associated with the checker.
     * This is loaded from the store.
     */
    data:       PropTypes.object.isRequired,
    /**
     * The username that needs to be checked.
     * This is loaded from the store.
     */
    username:   PropTypes.string.isRequired
  };

  /**
   * Component state.
   */
  state = {
    /** The current status */
    status: CHECKER_STATUS.UNCHECKED,
    /** The username being checked */
    username: '',
    /** The URL to be used when the checker is clicked */
    activeUrl: ''
  }

  /**
   * Implementation of React Component's 'getDerivedStateFromProps' method.
   */
  static getDerivedStateFromProps(props, state) {
    const username = props.username;
    // Did the username change? If so, update state.
    if (username !== state.username) {
      return {
        // If the username is not null, change status to 'checking'.
        status: username === '' ? CHECKER_STATUS.UNCHECKED : CHECKER_STATUS.CHECKING,
        // Save new username.
        username: username
      };
    }

    return null;
  }

  /**
   * Implementation of React Component's 'componentDidUpdate' method.
   */
  componentDidUpdate(prevProps, prevState) {
    const username = this.state.username;
    // Only do something if the username changed and it's not empty.
    if (username !== prevState.username && username !== '') {
      // Check if the URL is available for username.
      this.isAvailableUrl(username)
          .then(available => {
              // Change checker status based on URL availability.
              available ?
                this.setStatus(CHECKER_STATUS.AVAILABLE) :
                this.setStatus(CHECKER_STATUS.UNAVAILABLE);
              // Dispatch 'checkerFinished' action.
              this.props.onFinished(this.props.id);
      });
    }
  }

  /**
   * Set new component status and update extra data if needed.
   *
   * @param {object} newStatus - The new component status.
   */
  setStatus(newStatus) {

    // Setup new status.
    let status = { status: newStatus };

    const { get, view } = this.props.data.urls;

    // Update 'activeURL' based on new checker status.
    switch (newStatus) {

      case CHECKER_STATUS.AVAILABLE:
        status.activeUrl = get;
        break;
      case CHECKER_STATUS.UNAVAILABLE:
        status.activeUrl = view;
        status.activeUrl = status.activeUrl.replace('%username%', this.props.username);
        break;
      default:
        status.activeUrl = '';
        break;
    }

    this.setState(status);
  }

  /**
   * Check if the username is available by checking the URL.
   * @async
   *
   * @param {string} username - The username that needs to be checked.
   * @return {boolean} true if the URL is available or false otherwise.
   */
  async isAvailableUrl (username) {

    let available = false;
    // Grab the checker 'check' URL and fill it with the username.
    let url = this.props.data.urls.check.replace('%username%', username);
    try {
      // Make request using a CORS proxy.
      const response = await axios.head(CORS_PROXY + url);
      // Calculate availability.
      available = response.status !== 200;
    } catch (error) {
      // If there was an error (any error) then mark the URL as unavailable.
      available = true;
    }

    return available;
  }

  /**
   * Implementation of React Component's 'render' method.
   */
  render () {

    const { status, activeUrl } = this.state;

    // Add a random 'checking' animation delay for each checker.
    let randomStyles = {};
    if (status === CHECKER_STATUS.CHECKING) {
      randomStyles = {
        animationDelay: (-1 * Math.floor(Math.random() * 20)) + "s"
      }
    }

    return (
      <div className={[classes.checker, classes[status]].join(' ')}>
        <a href={activeUrl} className={classes.link} target="_blank" rel='noreferrer noopener'>
          <p className={classes.content} style={randomStyles}>
            {this.props.data.name}
          </p>
        </a>
      </div>
    );
  }
}

/**
 * Props mappings to store's state.
 * @constant {object} mapStateToProps
 */
const mapStateToProps = (store, props) => ({
  username: store.username,
  data: store.checkers[props.type][props.id]
});

/**
 * * Props mappings to store's actions.
 * @constant {object} mapDispatchToProps
 */
const mapDispatchToProps = (dispatch)  => ({
  onFinished: (id) => dispatch(actions.checkerFinished(id))
});

/**
 * Module exports.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Checker);
