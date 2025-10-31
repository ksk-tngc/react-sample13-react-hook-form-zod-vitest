import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import { memo } from 'react';

/**
 * イベント参加申込フォーム（フッター）
 */
export const Footer = memo(() => {
  return (
    <footer className={classes.footer}>
      <small>お問い合わせ: event@example.com | TEL: 03-1234-5678</small>
    </footer>
  );
});
