import React from 'react';
import '../styles/FloatingActions.css';
import { MessageCircleQuestionIcon as QuestionCircle, MessageCircle, Calendar } from 'lucide-react';

function FloatingActions({ onNoticeBoard }) {
  return (
    <div className="floating-actions">
      <button className="floating-button help" aria-label="Help">
        <QuestionCircle size={24} />
      </button>
      <button className="floating-button discussion" onClick={onNoticeBoard} aria-label="Discussion">
        <MessageCircle size={24} />
      </button>
      <button className="floating-button schedule" aria-label="Schedule">
        <Calendar size={24} />
      </button>
    </div>
  );
}

export default FloatingActions;

