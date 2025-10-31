import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import { memo } from 'react';

/**
 * イベント参加申込フォーム（ボタンエリア）
 */
export const ButtonSection = memo(() => {
  return (
    <>
      <div className={classes.buttonArea}>
        <button type="submit">申し込みを確定する</button>
      </div>

      <div className={classes.requiredDescription}>
        <small>
          <span className={classes.textRed}>*</span> は必須項目です
        </small>
      </div>
    </>
  );
});
