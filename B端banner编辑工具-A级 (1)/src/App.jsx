import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import BannerEditor from './components/BannerEditor';
import BannerPreview from './components/BannerPreview';
import { themes } from './utils/constants';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('yellow');
  const [mainTitle, setMainTitle] = useState('请在这里输入标题');
  const [subTitle, setSubTitle] = useState('请在这里输入副标题');
  const [buttonText, setButtonText] = useState('按钮文案');
  const [customImage, setCustomImage] = useState(null);
  const [titleHighlightRange, setTitleHighlightRange] = useState({ start: 4, end: 8 });
  const [mainTitleError, setMainTitleError] = useState('');
  const [subTitleError, setSubTitleError] = useState('');
  
  const previewRef = useRef(null);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  const handleMainTitleChange = (value) => {
    setMainTitle(value);
    if (value.length > 11) {
      setMainTitleError('最多输入11个字符');
    } else {
      setMainTitleError('');
    }
  };

  const handleSubTitleChange = (value) => {
    setSubTitle(value);
    if (value.length > 16) {
      setSubTitleError('最多输入16个字');
    } else {
      setSubTitleError('');
    }
  };

  const handleHighlightChange = (start, end) => {
    setTitleHighlightRange({ start, end });
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCustomImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const downloadBanner = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 1.5, // 导出1.5倍图
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
        letterRendering: true,
        logging: false,
        onclone: (clonedDoc) => {
          // 确保字体已加载
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            @font-face {
              font-family: 'HYYakuHei';
              src: url('https://fonts.alicdn.com/HYYakuHei/HYYakuHei.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: block;
            }
          `;
          clonedDoc.head.appendChild(style);
          
          // 给克隆的元素添加额外的样式来确保准确渲染
          const mainTitle = clonedDoc.querySelector('.banner-main-title');
          const subTitle = clonedDoc.querySelector('.banner-sub-title');
          const button = clonedDoc.querySelector('.banner-button');
          
          if (mainTitle) {
            mainTitle.style.fontFamily = "'HYYakuHei', Arial, sans-serif";
            mainTitle.style.transform = 'translateZ(0)';
          }
          
          if (subTitle) {
            subTitle.style.fontFamily = "'HYYakuHei', Arial, sans-serif";
            subTitle.style.transform = 'translateZ(0)';
          }
          
          if (button) {
            button.style.transform = 'translateZ(0)';
          }
        }
      });
      
      const link = document.createElement('a');
      link.download = 'banner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="app-container">
      <div className="editor-section">
        <h1 className="app-title">B端banner编辑工具-A级</h1>
        <BannerEditor 
          currentTheme={currentTheme}
          mainTitle={mainTitle}
          subTitle={subTitle}
          buttonText={buttonText}
          titleHighlightRange={titleHighlightRange}
          mainTitleError={mainTitleError}
          subTitleError={subTitleError}
          onThemeChange={handleThemeChange}
          onMainTitleChange={handleMainTitleChange}
          onSubTitleChange={handleSubTitleChange}
          onButtonTextChange={setButtonText}
          onHighlightChange={handleHighlightChange}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div className="preview-section">
        <div className="preview-container">
          <BannerPreview 
            ref={previewRef}
            theme={themes[currentTheme]}
            mainTitle={mainTitle}
            subTitle={subTitle}
            buttonText={buttonText}
            customImage={customImage}
            titleHighlightRange={titleHighlightRange}
          />
        </div>
        <button className="download-button" onClick={downloadBanner}>
          下载图片
        </button>
      </div>
    </div>
  );
};

export default App;
