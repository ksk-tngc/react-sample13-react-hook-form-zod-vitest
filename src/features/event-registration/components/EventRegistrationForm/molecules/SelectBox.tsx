import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import type {
  EventRegistrationFormNameType,
  EventRegistrationFormType,
} from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

type SelectOption = {
  value: string | number;
  label: string;
};

type Props = {
  name: EventRegistrationFormNameType;
  label: string;
  required: boolean;
  placeholder: string;
  options: SelectOption[];
  helperText?: string;
};

/**
 * セレクトボックス
 */
export const SelectBox = memo(
  ({ name, label, required, placeholder, options, helperText }: Props) => {
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

        <select
          id={name}
          {...register(name)}
          aria-describedby={`${name}-helper`}
          aria-invalid={errors[name] && 'true'}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

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
