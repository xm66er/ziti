import React, { useRef, useState } from 'react';
import { themes } from '../utils/constants';
import './BannerEditor.css';

const BannerEditor = ({
  currentTheme,
  mainTitle,
  subTitle,
  buttonText,
  titleHighlightRange,
  mainTitleError,
  subTitleError,
  onThemeChange,
  onMainTitleChange,
  onSubTitleChange,
  onButtonTextChange,
  onHighlightChange,
  onImageUpload
}) => {
  const fileInputRef = useRef(null);
  const [highlightText, setHighlightText] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleHighlightClick = (type) => {
    const titleLength = mainTitle.length;
    
    if (type === 'all') {
      onHighlightChange(0, titleLength);
      setHighlightText(mainTitle);
    } else if (type === 'none') {
      onHighlightChange(-1, -1);
      setHighlightText('');
    } else if (type === 'default') {
      // 默认高亮"输入标题"
      if (mainTitle === '请在这里输入标题') {
        onHighlightChange(4, 8);
        setHighlightText('输入标题');
      }
    }
  };
  
  const handleHighlightTextChange = (e) => {
    const text = e.target.value;
    setHighlightText(text);
    
    if (!text) {
      onHighlightChange(-1, -1);
      return;
    }
    
    const index = mainTitle.indexOf(text);
    if (index !== -1) {
      onHighlightChange(index, index + text.length);
    } else {
      onHighlightChange(-1, -1);
    }
  };

  // 在组件初始化时设置默认高亮文本
  useState(() => {
    if (mainTitle === '请在这里输入标题' && titleHighlightRange.start === 4 && titleHighlightRange.end === 8) {
      setHighlightText('输入标题');
    }
  }, []);

  return (
    <div className="banner-editor">
      <div className="section-title">选择主题</div>
      <div className="theme-buttons">
        <button 
          className={`theme-button yellow-theme ${currentTheme === 'yellow' ? 'active' : ''}`}
          onClick={() => onThemeChange('yellow')}
        >
          黄色主题
        </button>
        <button 
          className={`theme-button red-theme ${currentTheme === 'red' ? 'active' : ''}`}
          onClick={() => onThemeChange('red')}
        >
          红色主题
        </button>
        <button 
          className={`theme-button blue-theme ${currentTheme === 'blue' ? 'active' : ''}`}
          onClick={() => onThemeChange('blue')}
        >
          蓝色主题
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">主标题</label>
        <input 
          type="text" 
          className="form-input"
          value={mainTitle}
          onChange={(e) => onMainTitleChange(e.target.value)}
          placeholder="请在这里输入标题"
        />
        {mainTitleError && <div className="error-message">{mainTitleError}</div>}
        
        <div className="highlight-controls">
          <div className="form-label">高亮设置</div>
          <button 
            className={`highlight-button ${titleHighlightRange.start === 0 && titleHighlightRange.end === mainTitle.length ? 'active' : ''}`}
            onClick={() => handleHighlightClick('all')}
          >
            全部高亮
          </button>
          <button 
            className={`highlight-button ${titleHighlightRange.start === -1 ? 'active' : ''}`}
            onClick={() => handleHighlightClick('none')}
          >
            无高亮
          </button>
          
          <div className="highlight-input-container">
            <label className="form-label highlight-label">输入需要高亮的文案</label>
            <input 
              type="text" 
              className="form-input highlight-input"
              value={highlightText}
              onChange={handleHighlightTextChange}
              placeholder="输入需要高亮的文案"
            />
            {titleHighlightRange.start === -1 && highlightText && (
              <div className="error-message">未找到匹配的文本</div>
            )}
            
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">副标题</label>
        <input 
          type="text" 
          className="form-input"
          value={subTitle}
          onChange={(e) => onSubTitleChange(e.target.value)}
          placeholder="请在这里输入副标题"
        />
        {subTitleError && <div className="error-message">{subTitleError}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">按钮文案</label>
        <input 
          type="text" 
          className="form-input"
          value={buttonText}
          onChange={(e) => onButtonTextChange(e.target.value)}
          placeholder="按钮文案"
        />
      </div>

      <div className="form-group">
        <label className="form-label">自定义图片</label>
        <div className="image-uploader" onClick={triggerFileInput}>
          <div className="image-uploader-text">点击上传图片</div>
          <div className="image-uploader-hint">建议尺寸: 292 x 180 px</div>
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default BannerEditor;
