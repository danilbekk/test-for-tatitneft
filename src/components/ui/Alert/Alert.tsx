import React, { ReactNode, useState, useEffect, useRef } from 'react';
import styles from './alert.module.css';

interface AlertProps {
  children: ReactNode;
  visibleTime?: number;
}

const Alert: React.FC<AlertProps> = ({ children, visibleTime = 2000 }) => {
  const [show, setShow] = useState(true);
  const [animationEnded, setAnimationEnded] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, visibleTime);

    return () => clearTimeout(timer);
  }, [visibleTime]);

  const onAnimationEnd = () => {
    if (!show) {
      setAnimationEnded(true);
    }
  };

  useEffect(() => {
    if (animationEnded) {
      // После завершения анимации скрытия, можно показать компонент снова
      setShow(true);
      setAnimationEnded(false);
    }
  }, [animationEnded]);

  if (!show) {
    return null;
  }

  return (
    <div
      ref={alertRef}
      className={`${styles.alert} ${show ? styles.slideIn : styles.slideOut}`}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  );
};

export default Alert;
