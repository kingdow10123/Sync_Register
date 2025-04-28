import { useState, useEffect } from 'react';

export default function App() {
  const [page, setPage] = useState('welcome');
  const [countdown, setCountdown] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (page === 'verify' && timerRunning) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [page, timerRunning]);

  const handleResend = () => {
    if (countdown === 0) {
      alert('已重新發送驗證碼！');
      setCountdown(90);
      setTimerRunning(true);
    } else {
      alert('請稍後再試');
    }
  };

  return (
    <div className="container">
      {page === 'welcome' && (
        <div>
          <div className="content-section">
            <h1>Welcome to <span className="highlight">Sync!</span></h1>
            <p className="subtitle">點選下方按鈕開始註冊</p>
          </div>
          <div className="image-wrapper">
            <img src="https://i.imgur.com/sYQGyHo.png" alt="Welcome" />
          </div>
          <div className="button-group">
            <button className="primary" onClick={() => setPage('register')}>
              開始註冊
            </button>
          </div>
        </div>
      )}

      {page === 'register' && (
        <div>
          <h1>註冊</h1>
          <input type="text" placeholder="姓名" />
          <input type="text" placeholder="身份證字號" />
          <input type="text" placeholder="電話" />

          <h2>設定緊急聯絡人</h2>
          <input type="text" placeholder="緊急聯絡人名稱" />
          <input type="text" placeholder="緊急聯絡人電話" />

          <h2>基本生理數據</h2>
          <input type="date" placeholder="生日 (YYYY-MM-DD)" />
          <input type="number" placeholder="身高" />
          <input type="number" placeholder="體重 (kg)" />

          <button id="registerBtn" onClick={() => {
            setPage('verify');
            setCountdown(90);
            setTimerRunning(true);
          }}>
            註冊
          </button>
        </div>
      )}

      {page === 'verify' && (
        <div>
          <h1>驗證</h1>
          <input type="text" id="codeInput" placeholder="請輸入驗證碼" />
          <p id="timerText">
            {countdown > 0
              ? `${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}後可重新發送驗證碼`
              : '你可以重新發送驗證碼'}
          </p>
          <p className="resend-link" id="resendLink" onClick={handleResend}>
            我沒有收到驗證碼？
          </p>
          <button id="verifyBtn" onClick={() => {
            const code = document.getElementById('codeInput').value;
            alert(`你輸入的驗證碼是：${code}`);
          }}>
            確認
          </button>
        </div>
      )}
    </div>
  );
}
