import { useState, useEffect } from 'react'
import './styles/TopNotification.css' 

const TopNotification = ({ 
  notificationMessage, 
  notificationType = 'info', // 'info', 'success', 'warning', 'error'
  notificationIsVisible 
  //onHide 
}) => {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (notificationIsVisible && !isMounted) {
      setIsMounted(true)
      // Small delay to ensure CSS transition works
      setTimeout(() => setShow(true), 10)
      
      // Auto hide after duration
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(() => {
          setIsMounted(false)
          //onHide && onHide();
        }, 300)
      }, 2000)

      return () => clearTimeout(timer);
    }
  }, [notificationIsVisible]) //notificationIsVisible, *onHide*, isMounted

  if (!isMounted) return null

  return (
    <div className={`top-notification ${notificationType} ${show ? 'show' : 'hide'}`}>
      <div className="notification-content">
        <span className="notification-message">{notificationMessage}</span>
        <button 
          className="notification-close"
          onClick={() => {
            setShow(false)
            setTimeout(() => {
              setIsMounted(false);
             // onHide && onHide();
            }, 300)
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TopNotification;