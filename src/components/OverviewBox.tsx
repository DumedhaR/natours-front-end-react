import React from 'react';

const OverviewBox: React.FC<{ label: string; text: string; icon: string }> = ({
    label,
    text,
    icon,
  }) => (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );

  export default OverviewBox;