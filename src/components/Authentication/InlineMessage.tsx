import React from 'react';
import './InlineMessage.css';

interface Props {
  message: string;
  type: 'success' | 'error' | 'info';
}

const InlineMessage: React.FC<Props> = ({ message, type }) => {
  return (
    <div className={`inline-message ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default InlineMessage;