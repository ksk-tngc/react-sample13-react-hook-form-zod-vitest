import { TextField } from '@/features/event-registration/components/EventRegistrationForm/molecules';
import { memo } from 'react';

/**
 * イベント参加申込フォーム（参加者情報）
 */
export const AttendeeInfoSection = memo(() => {
  return (
    <fieldset>
      <legend>
        <b>参加者情報</b>
      </legend>

      <TextField
        label="氏名"
        type="text"
        name="fullName"
        required
        placeholder="山田 太郎"
      />

      <TextField
        label="フリガナ"
        type="text"
        name="furigana"
        required
        placeholder="ヤマダ タロウ"
        helperText="全角カタカナで入力してください"
      />

      <TextField
        label="メールアドレス"
        type="email"
        name="email"
        required
        placeholder="example.email.com"
      />

      <TextField
        label="電話番号"
        type="text"
        name="phone"
        required
        placeholder="09012345678"
        helperText="ハイフンなしで入力してください"
      />

      <TextField
        label="年齢"
        type="number"
        name="age"
        required
        placeholder="25"
        helperText="6歳以上の方が参加できます"
      />
    </fieldset>
  );
});
