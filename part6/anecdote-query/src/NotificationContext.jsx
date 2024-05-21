import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const { children } = props; // Destructure children from props
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  const showNotification = (message) => {
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children} {/* Render children */}
    </NotificationContext.Provider>
  );
};

// Validate 'children' prop
NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotificationValue = () =>
  useContext(NotificationContext).notification;

export const useNotificationDispatch = () =>
  useContext(NotificationContext).showNotification;

export default NotificationContext;
