import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import type {
  EventRegistrationFormNameType,
  EventRegistrationFormType,
} from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { Fragment, memo } from 'react';
import { useFormContext } from 'react-hook-form';

type Radio = {
  label: string;
  value: string;
};

type Props = {
  name: EventRegistrationFormNameType;
  label: string;
  required: boolean;
  direction?: 'row' | 'column';
  radioProps: Radio[];
  helperText?: string;
};

/**
 * ラジオボタングループ
 */
export const RadioGroup = memo(
  ({
    name,
    label,
    required,
    direction = 'column',
    radioProps,
    helperText,
  }: Props) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<EventRegistrationFormType>();

    return (
      <div>
        <fieldset role='radiogroup'>
          <legend className={required ? classes.required : undefined}>
            {label}
          </legend>

          {direction === 'column' &&
            radioProps.map((radio) => (
              <label key={radio.value}>
                <input
                  type="radio"
                  value={radio.value}
                  {...register(name)}
                  aria-describedby={`${name}-helper`}
                  aria-invalid={errors[name] && 'true'}
                />
                {radio.label}
              </label>
            ))}

          {direction === 'row' &&
            radioProps.map((radio) => (
              <Fragment key={radio.value}>
                <input
                  type="radio"
                  id={`${name}-${radio.value}`}
                  value={radio.value}
                  {...register(name)}
                  aria-describedby={`${name}-helper`}
                  aria-invalid={errors[name] && 'true'}
                />
                <label htmlFor={`${name}-${radio.value}`}>{radio.label}</label>
              </Fragment>
            ))}

          {/* ヘルパーテキスト、エラーメッセージ */}
          <small id={`${name}-helper`}>
            {helperText && (
              <div className={classes.helperText}>{helperText}</div>
            )}
            {errors[name] && (
              <div role="alert" className={classes.errorMessage}>
                {errors[name]['message']}
              </div>
            )}
          </small>
        </fieldset>
      </div>
    );
  }
);
