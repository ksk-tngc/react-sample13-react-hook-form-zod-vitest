import { memo } from 'react';

/**
 * イベント参加申込フォーム（ヘッダー）
 */
export const Header = memo(() => {
  return (
    <>
      <hgroup>
        <h2>イベント参加申込フォーム</h2>
        <p style={{ marginTop: '0.5rem' }}>
          必要事項をご入力の上、お申し込みください
        </p>
      </hgroup>
      <hr />
    </>
  );
});
