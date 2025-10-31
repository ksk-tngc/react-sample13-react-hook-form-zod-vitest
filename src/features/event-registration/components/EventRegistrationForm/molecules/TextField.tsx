import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import type {
  EventRegistrationFormNameType,
  EventRegistrationFormType,
} from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { memo, type HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  type: HTMLInputTypeAttribute;
  name: EventRegistrationFormNameType;
  label: string;
  required: boolean;
  placeholder?: string;
  helperText?: string;
};

/**
 * テキストフィールド
 */
export const TextField = memo(
  ({ type, name, label, required, placeholder, helperText }: Props) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<EventRegistrationFormType>();

    return (
      <div>
        <label
          htmlFor={name}
          className={required ? classes.required : undefined}
        >
          {label}
        </label>

        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          aria-describedby={`${name}-helper`}
          aria-invalid={errors[name] && 'true'}
        />

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
  }
);
