import React, { forwardRef } from 'react';
import './BannerPreview.css';

const BannerPreview = forwardRef(({
  theme,
  mainTitle,
  subTitle,
  buttonText,
  customImage,
  titleHighlightRange
}, ref) => {
  // 计算主标题字体大小
  const calculateMainTitleFontSize = () => {
    const length = displayedMainTitle.length;
    if (length <= 7) return 44;
    if (length === 8) return 42;
    if (length === 9) return 40;
    if (length === 10) return 37;
    return 34; // 11个字
  };

  // 截取显示的标题和副标题
  const displayedMainTitle = mainTitle.substring(0, 11);
  const displayedSubTitle = subTitle.substring(0, 16);
  
  // 渲染带高亮的主标题
  const renderHighlightedTitle = () => {
    if (titleHighlightRange.start === -1) {
      return <span>{displayedMainTitle}</span>;
    }

    // 调整高亮范围，确保不超出显示范围
    const adjustedStart = Math.min(titleHighlightRange.start, displayedMainTitle.length);
    const adjustedEnd = Math.min(titleHighlightRange.end, displayedMainTitle.length);
    
    if (adjustedStart >= adjustedEnd) {
      return <span>{displayedMainTitle}</span>;
    }

    const beforeHighlight = displayedMainTitle.substring(0, adjustedStart);
    const highlighted = displayedMainTitle.substring(adjustedStart, adjustedEnd);
    const afterHighlight = displayedMainTitle.substring(adjustedEnd);

    return (
      <>
        {beforeHighlight}
        <span className="highlight" style={{ color: theme.highlightColor }}>{highlighted}</span>
        {afterHighlight}
      </>
    );
  };

  return (
    <div 
      ref={ref}
      className="banner-preview"
      style={{ 
        background: `linear-gradient(to bottom, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      <div className="banner-content">
        <div className="banner-left">
          <h1 
            className="banner-main-title"
            style={{ 
              fontSize: `${calculateMainTitleFontSize()}px`,
            }}
          >
            {renderHighlightedTitle()}
          </h1>
          <h2 className="banner-sub-title">
            {displayedSubTitle}
          </h2>
          <button 
            className="banner-button"
            style={{ 
              background: `linear-gradient(to right, ${theme.buttonGradientStart}, ${theme.buttonGradientEnd})`,
            }}
          >
            <span className="button-content">
              <span className="button-text">{buttonText}</span>
              <img 
                src="https://img.alicdn.com/imgextra/i1/O1CN01LEiTXS1gWkj0dD9Ys_!!6000000004150-2-tps-33-50.png" 
                alt="arrow" 
                className="button-icon"
              />
            </span>
          </button>
        </div>
        <div className="banner-right">
          <img 
            src={customImage || "https://img.alicdn.com/imgextra/i4/O1CN01mbmi2s1P4xDYtgzBg_!!6000000001788-2-tps-438-270.png"} 
            alt="Banner" 
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
});

export default BannerPreview;
