import {
  RadioGroup,
  SelectBox,
  Textarea,
  TextField,
} from '@/features/event-registration/components/EventRegistrationForm/molecules';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * イベント参加申込フォーム（参加情報）
 */
export const AttendanceInfoSection = memo(() => {
  const { watch } = useFormContext();

  return (
    <fieldset>
      <legend>
        <b>参加情報</b>
      </legend>

      <SelectBox
        label="参加人数"
        name="attendeeCount"
        required
        helperText="11名以上の場合は別途お問い合わせください"
        placeholder="選択してください"
        options={[...Array(10).keys()].map((num) => ({
          value: `${num + 1}`,
          label: `${num + 1}名`,
        }))}
      />

      <TextField
        label="参加日"
        type="date"
        name="attendanceDate"
        required
        helperText="90日以内の日付を選択してください"
      />

      <RadioGroup
        label="参加時間帯"
        name="timeSlot"
        required
        direction="column"
        radioProps={[
          { label: '午前（10:00-12:00）', value: 'morning' },
          { label: '午後（14:00-16:00）', value: 'afternoon' },
          { label: '夕方（18:00-20:00）', value: 'evening' },
        ]}
      />

      <RadioGroup
        label="食事の有無"
        name="needsMeal"
        required
        direction="row"
        radioProps={[
          { label: '必要', value: 'yes' },
          { label: '不要', value: 'no' },
        ]}
      />

      {watch('needsMeal') === 'yes' && (
        <Textarea
          label="アレルギー情報"
          name="allergyInfo"
          required
          placeholder="アレルギーがある場合は詳しくご記入ください。特にない場合は「なし」とご記入ください。"
          helperText="食事を希望される場合は必ず入力してください"
          rows={3}
        />
      )}
    </fieldset>
  );
});
