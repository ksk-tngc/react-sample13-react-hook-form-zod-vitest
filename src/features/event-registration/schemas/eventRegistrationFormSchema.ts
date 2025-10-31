import { ERROR_MESSAGE_EVENT_REGISTRATION_FORM as ERROR } from '@/features/event-registration/constants/error-message/eventRegistrationForm';
import z from 'zod';

/**
 * イベント参加申込フォームのスキーマ定義
 */
export const eventRegistrationFormSchema = z
  .object({
    // ---------------------------------
    // 氏名
    // ---------------------------------
    fullName: z
      .string()
      .trim()
      .min(1, ERROR.FULL_NAME.REQUIRED)
      .min(2, ERROR.FULL_NAME.LENGTH)
      .max(50, ERROR.FULL_NAME.LENGTH),
    // ---------------------------------
    // フリガナ
    // ---------------------------------
    furigana: z
      .string()
      .trim()
      .min(1, ERROR.FURIGANA.REQUIRED)
      .min(2, ERROR.FURIGANA.LENGTH)
      .max(50, ERROR.FURIGANA.LENGTH)
      .regex(/^[ァ-ヶー\s]+$/, ERROR.FURIGANA.FORMAT),
    // ---------------------------------
    // メールアドレス
    // ---------------------------------
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, ERROR.EMAIL.REQUIRED)
      .pipe(z.email(ERROR.EMAIL.FORMAT)),
    // ---------------------------------
    // 電話番号
    // ---------------------------------
    phone: z
      .string()
      .trim()
      .min(1, ERROR.PHONE.REQUIRED)
      .regex(/^\d{10,11}$/, ERROR.PHONE.FORMAT),
    // ---------------------------------
    // 年齢
    // ---------------------------------
    age: z.coerce
      .string<number>()
      .min(1, ERROR.AGE.REQUIRED)
      .pipe(z.coerce.number(ERROR.AGE.FORMAT))
      .pipe(
        z
          .number()
          .int(ERROR.AGE.FORMAT)
          .min(6, ERROR.AGE.MIN)
          .max(100, ERROR.AGE.MAX)
      ),
    // ---------------------------------
    // 参加人数
    // ---------------------------------
    attendeeCount: z.coerce
      .string<number>()
      .min(1, ERROR.ATTENDEE_COUNT.REQUIRED)
      .pipe(z.coerce.number(ERROR.ATTENDEE_COUNT.FORMAT))
      .pipe(
        z
          .number()
          .int(ERROR.ATTENDEE_COUNT.FORMAT)
          .min(1, ERROR.ATTENDEE_COUNT.LENGTH)
          .max(10, ERROR.ATTENDEE_COUNT.LENGTH)
      ),
    // ---------------------------------
    // 参加日
    // ---------------------------------
    attendanceDate: z
      .string()
      .min(1, ERROR.ATTENDANCE_DATE.REQUIRED)
      .pipe(z.iso.date(ERROR.ATTENDANCE_DATE.FORMAT))
      .refine(
        // 明日以降であること
        (input) => {
          // ISO形式（YYYY-MM-DD）であれば文字列として直接比較可能
          const today = new Date().toISOString().split('T')[0];
          return today < input;
        },
        ERROR.ATTENDANCE_DATE.PAST_DATE
      )
      .refine(
        // 90日以内であること
        (input) => {
          // ISO形式（YYYY-MM-DD）であれば文字列として直接比較可能
          // 90日後
          const futureDate = new Date();
          futureDate.setDate(new Date().getDate() + 90);
          const futureDateString = futureDate.toISOString().split('T')[0];
          // 90日以内ならOK
          return input <= futureDateString;
        },
        ERROR.ATTENDANCE_DATE.OVER_DAYS
      ),
    // ---------------------------------
    // 参加時間帯
    // ---------------------------------
    timeSlot: z.enum(
      ['morning', 'afternoon', 'evening'],
      ERROR.TIME_SLOT.REQUIRED
    ),
    // ---------------------------------
    // 食事の有無
    // ---------------------------------
    needsMeal: z.enum(['yes', 'no'], ERROR.NEEDS_MEAL.REQUIRED),
    // ---------------------------------
    // アレルギー情報
    // ---------------------------------
    allergyInfo: z.string().trim().optional(),
    // ---------------------------------
    // 連絡事項
    // ---------------------------------
    notice: z.string().trim().max(500, ERROR.NOTICE.LENGTH).optional(),
    // ---------------------------------
    // プライバシーポリシー同意
    // ---------------------------------
    agreeToPolicy: z
      .boolean()
      .refine((input) => input === true, ERROR.AGREE_TO_POLICY.REQUIRED),
  })
  // ---------------------------------
  // アレルギー情報の検証
  // ---------------------------------
  .superRefine((data, ctx) => {
    // 食事が不要な場合は検証不要
    if (data.needsMeal === 'no') return;

    // 未入力
    if (!data.allergyInfo) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR.ALLERGY_INFO.REQUIRED,
        path: ['allergyInfo'],
      });
    }

    // 2文字未満、200文字超過
    if (
      data.allergyInfo &&
      (data.allergyInfo.length < 2 || data.allergyInfo.length > 200)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR.ALLERGY_INFO.LENGTH,
        path: ['allergyInfo'],
      });
    }
  });

/**
 * スキーマから型を生成
 */
export type EventRegistrationFormType = z.infer<
  typeof eventRegistrationFormSchema
>;

/**
 * フォームのプロパティ名のユニオン型（name属性のリテラル型）
 */
export type EventRegistrationFormNameType = keyof EventRegistrationFormType;
