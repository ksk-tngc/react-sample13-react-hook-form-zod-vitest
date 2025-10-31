import classes from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm.module.css';
import {
  AttendanceInfoSection,
  AttendeeInfoSection,
  ButtonSection,
  Footer,
  Header,
  OtherSection,
} from '@/features/event-registration/components/EventRegistrationForm/organisms';
import {
  eventRegistrationFormSchema,
  type EventRegistrationFormType,
} from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/**
 * イベント参加申込フォーム
 */
export const EventRegistrationForm = memo(() => {
  const methods = useForm<EventRegistrationFormType>({
    mode: 'onTouched',
    resolver: zodResolver(eventRegistrationFormSchema),
    defaultValues: {
      timeSlot: 'morning', // 参加時間帯
      needsMeal: 'yes', // 食事の有無
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log('送信成功');
    console.log(data);
  });

  return (
    <div className={`container ${classes.container}`}>
      <Header />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate>
          {/* 参加者情報 */}
          <AttendeeInfoSection />

          {/* 参加情報 */}
          <hr />
          <AttendanceInfoSection />

          {/* その他 */}
          <hr />
          <OtherSection />

          {/* ボタン */}
          <ButtonSection />
        </form>
      </FormProvider>

      <Footer />
    </div>
  );
});
