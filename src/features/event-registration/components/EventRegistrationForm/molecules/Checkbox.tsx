import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import type {
  EventRegistrationFormNameType,
  EventRegistrationFormType,
} from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: EventRegistrationFormNameType;
  label: string;
  required: boolean;
  helperText?: string;
};

/**
 * チェックボックス
 */
export const Checkbox = memo(({ name, label, required, helperText }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventRegistrationFormType>();

  return (
    <div>
      <label className={required ? classes.required : undefined}>
        <input
          type="checkbox"
          {...register(name)}
          aria-describedby={`${name}-helper`}
          aria-invalid={errors[name] && 'true'}
        />
        {label}
      </label>

      {/* ヘルパーテキスト、エラーメッセージ */}
      <small id={`${name}-helper`}>
        {helperText && <div className={classes.helperText}>{helperText}</div>}
        {errors[name] && (
          <div role="alert" className={classes.errorMessage}>
            {errors[name]['message']}
          </div>
        )}
      </small>
    </div>
  );
});
