import {
  Checkbox,
  Textarea,
} from '@/features/event-registration/components/EventRegistrationForm/molecules';
import { memo } from 'react';

/**
 * イベント参加申込フォーム（その他）
 */
export const OtherSection = memo(() => {
  return (
    <fieldset>
      <legend>
        <b>その他</b>
      </legend>

      <Textarea
        label="連絡事項"
        name="notice"
        required={false}
        placeholder="ご質問やご要望などがあればご記入ください"
        helperText="500文字以内で入力してください"
        rows={4}
      />

      <Checkbox
        label="プライバシーポリシーに同意します"
        name="agreeToPolicy"
        required
      />
    </fieldset>
  );
});
