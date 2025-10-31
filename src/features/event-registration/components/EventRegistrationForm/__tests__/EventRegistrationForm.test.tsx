import { EventRegistrationForm } from '@/features/event-registration/components/EventRegistrationForm/EventRegistrationForm';
import { ERROR_MESSAGE_EVENT_REGISTRATION_FORM as ERROR } from '@/features/event-registration/constants/error-message/eventRegistrationForm';
import type { EventRegistrationFormType } from '@/features/event-registration/schemas/eventRegistrationFormSchema';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ------------------------------------------------------------
// テストデータ
// ------------------------------------------------------------

// 明日のISO日付
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
const tomorrowIsoString = tomorrow.toISOString().split('T')[0];

// 正常データ
type ValidData = EventRegistrationFormType & {
  timeSlotLabel: string;
  needsMealLabel: string;
};
const validData: ValidData = {
  fullName: '山田 花子',
  furigana: 'ヤマダ ハナコ',
  email: 'hanako@example.com',
  phone: '08012345678',
  age: 35,
  attendeeCount: 1,
  attendanceDate: tomorrowIsoString,
  timeSlot: 'afternoon',
  timeSlotLabel: '夕方（18:00-20:00）',
  needsMeal: 'yes',
  needsMealLabel: '必要',
  allergyInfo: 'アレルギーなし',
  notice: 'ペットを連れて行くことは可能でしょうか？',
  agreeToPolicy: true,
};

// ------------------------------------------------------------
// ヘルパー
// ------------------------------------------------------------

/**
 * コンポーネントをレンダリング
 */
const renderComponent = () => {
  return render(<EventRegistrationForm />);
};

/**
 * 正常データを入力
 */
const inputValidData = async () => {
  const user = userEvent.setup();

  // 氏名
  const fullName = screen.getByRole('textbox', { name: '氏名' });
  await user.type(fullName, validData.fullName);

  // フリガナ
  const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
  await user.type(furigana, validData.furigana);

  // メールアドレス
  const email = screen.getByRole('textbox', { name: 'メールアドレス' });
  await user.type(email, validData.email);

  // 電話番号
  const phone = screen.getByRole('textbox', { name: '電話番号' });
  await user.type(phone, validData.phone);

  // 年齢
  const age = screen.getByRole('spinbutton', { name: '年齢' });
  await user.type(age, String(validData.age));

  // 参加人数
  const attendeeCount = screen.getByRole('combobox', { name: '参加人数' });
  await user.selectOptions(attendeeCount, String(validData.attendeeCount));

  // 参加日
  const attendanceDate = screen.getByLabelText('参加日');
  await user.type(attendanceDate, validData.attendanceDate);

  // 参加時間帯
  const timeSlot = screen.getByRole('radio', { name: validData.timeSlotLabel });
  await user.click(timeSlot);

  // 食事の有無
  const needsMeal = screen.getByRole('radio', {
    name: validData.needsMealLabel,
  });
  await user.click(needsMeal);

  // アレルギー情報
  const allergyInfo = screen.getByRole('textbox', { name: 'アレルギー情報' });
  await user.type(allergyInfo, validData.allergyInfo!);

  // 連絡事項
  const notice = screen.getByRole('textbox', { name: '連絡事項' });
  await user.type(notice, validData.notice!);

  // プライバシーポリシー同意
  const agreeToPolicy = screen.getByRole('checkbox', {
    name: 'プライバシーポリシーに同意します',
  });
  await user.click(agreeToPolicy);
};

/**
 * 値をログに出力
 */
// @ts-expect-error TS6133: デバッグ用関数
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const outputValues = () => {
  // 氏名
  const fullName = screen.getByRole('textbox', {
    name: '氏名',
  }) as HTMLInputElement;
  console.log('fullName:', fullName.value);

  // フリガナ
  const furigana = screen.getByRole('textbox', {
    name: 'フリガナ',
  }) as HTMLInputElement;
  console.log('furigana:', furigana.value);

  // メールアドレス
  const email = screen.getByRole('textbox', {
    name: 'メールアドレス',
  }) as HTMLInputElement;
  console.log('email:', email.value);

  // 電話番号
  const phone = screen.getByRole('textbox', {
    name: '電話番号',
  }) as HTMLInputElement;
  console.log('phone:', phone.value);

  // 年齢
  const age = screen.getByRole('spinbutton', {
    name: '年齢',
  }) as HTMLInputElement;
  console.log('age:', age.value);

  // 参加人数
  const attendeeCount = screen.getByRole('combobox', {
    name: '参加人数',
  }) as HTMLSelectElement;
  console.log('attendeeCount:', attendeeCount.value);

  // 参加日
  const attendanceDate = screen.getByLabelText('参加日') as HTMLInputElement;
  console.log('attendanceDate:', attendanceDate.value);

  // 参加時間帯
  const timeSlotGroup = screen.getByRole('radiogroup', { name: '参加時間帯' });
  const timeSlotRadios = within(timeSlotGroup).getAllByRole(
    'radio'
  ) as HTMLInputElement[];
  const selectedTimeSlot = timeSlotRadios.find(
    (radio) => radio.checked
  ) as HTMLInputElement;
  console.log('timeSlot:', selectedTimeSlot.value);

  // 食事の有無
  const needsMealGroup = screen.getByRole('radiogroup', { name: '食事の有無' });
  const needsMealRadios = within(needsMealGroup).getAllByRole(
    'radio'
  ) as HTMLInputElement[];
  const selectedNeedsMeal = needsMealRadios.find(
    (radio) => radio.checked
  ) as HTMLInputElement;
  console.log('needsMeal:', selectedNeedsMeal.value);

  // アレルギー情報
  const allergyInfo = screen.getByRole('textbox', {
    name: 'アレルギー情報',
  }) as HTMLInputElement;
  console.log('allergyInfo:', allergyInfo.value);

  // 連絡事項
  const notice = screen.getByRole('textbox', {
    name: '連絡事項',
  }) as HTMLInputElement;
  console.log('notice:', notice.value);

  // プライバシーポリシー同意
  const agreeToPolicy = screen.getByRole('checkbox', {
    name: 'プライバシーポリシーに同意します',
  }) as HTMLInputElement;
  console.log('agreeToPolicy:', agreeToPolicy.checked);
};

/**
 * console.logをスパイしつつ出力を無効化
 */
const spyOnConsoleLog = () => {
  return vi.spyOn(console, 'log').mockImplementation(() => {});
};

// ------------------------------------------------------------
// テスト
// ------------------------------------------------------------

test('全フィールドを正しく入力して送信成功', async () => {
  const spyLog = spyOnConsoleLog();

  renderComponent();
  await inputValidData();

  const user = userEvent.setup();
  const submitButton = screen.getByRole('button', {
    name: '申し込みを確定する',
  });
  await user.click(submitButton);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(spyLog).toHaveBeenCalledWith('送信成功');
});

// ------------------ 氏名 ------------------ //

describe('氏名', () => {
  describe('正常系', () => {
    test('2文字、50文字', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const fullName = screen.getByRole('textbox', { name: '氏名' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 2文字
      await user.clear(fullName);
      await user.type(fullName, 'あい');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 50文字
      await user.clear(fullName);
      await user.type(fullName, 'あ'.repeat(50));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const fullName = screen.getByRole('textbox', { name: '氏名' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(fullName);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FULL_NAME.REQUIRED));
    });

    test('1文字', async () => {
      renderComponent();

      const user = userEvent.setup();
      const fullName = screen.getByRole('textbox', { name: '氏名' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(fullName);
      await user.type(fullName, 'あ');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FULL_NAME.LENGTH));
    });

    test('51文字', async () => {
      renderComponent();

      const user = userEvent.setup();
      const fullName = screen.getByRole('textbox', { name: '氏名' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(fullName);
      await user.type(fullName, 'あ'.repeat(51));
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FULL_NAME.LENGTH));
    });
  });
});

// ------------------ フリガナ ------------------ //

describe('フリガナ', () => {
  describe('正常系', () => {
    test('2文字、50文字（カタカナ）', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 2文字（カタカナ）
      await user.clear(furigana);
      await user.type(furigana, 'アイ');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 50文字（カタカナ）
      await user.clear(furigana);
      await user.type(furigana, 'ア'.repeat(50));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(furigana);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FURIGANA.REQUIRED));
    });

    test('1文字、カタカナ', async () => {
      renderComponent();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(furigana);
      await user.type(furigana, 'ア');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FURIGANA.LENGTH));
    });

    test('51文字、カタカナ', async () => {
      renderComponent();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(furigana);
      await user.type(furigana, 'ア'.repeat(51));
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FURIGANA.LENGTH));
    });

    test('ひらがな', async () => {
      renderComponent();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(furigana);
      await user.type(furigana, 'あいうえお');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FURIGANA.FORMAT));
    });

    test('英数字', async () => {
      renderComponent();

      const user = userEvent.setup();
      const furigana = screen.getByRole('textbox', { name: 'フリガナ' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(furigana);
      await user.type(furigana, '123ABC');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.FURIGANA.FORMAT));
    });
  });
});

// ------------------ メールアドレス ------------------ //

describe('メールアドレス', () => {
  describe('正常系', () => {
    test('メール形式', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const email = screen.getByRole('textbox', { name: 'メールアドレス' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(email);
      await user.type(email, 'valid.email@example.com');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const email = screen.getByRole('textbox', { name: 'メールアドレス' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(email);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.EMAIL.REQUIRED));
    });

    test('非メール形式', async () => {
      renderComponent();

      const user = userEvent.setup();
      const email = screen.getByRole('textbox', { name: 'メールアドレス' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(email);
      await user.type(email, 'invalid-email-format');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.EMAIL.FORMAT));
    });
  });
});

// ------------------ 電話番号 ------------------ //

describe('電話番号', () => {
  describe('正常系', () => {
    test('10桁、11桁の数字（ハイフンなし）', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const phone = screen.getByRole('textbox', { name: '電話番号' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 10桁
      await user.clear(phone);
      await user.type(phone, '1'.repeat(10));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 11桁
      await user.clear(phone);
      await user.type(phone, '1'.repeat(11));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const phone = screen.getByRole('textbox', { name: '電話番号' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(phone);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.PHONE.REQUIRED));
    });

    test('10桁の数字（ハイフンあり）', async () => {
      renderComponent();

      const user = userEvent.setup();
      const phone = screen.getByRole('textbox', { name: '電話番号' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      const input = '03-1234-5678';
      expect(input.replaceAll('-', '').length).toBe(10);

      await user.clear(phone);
      await user.type(phone, input);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.PHONE.FORMAT));
    });

    test('11桁の数字（ハイフンあり）', async () => {
      renderComponent();

      const user = userEvent.setup();
      const phone = screen.getByRole('textbox', { name: '電話番号' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      const input = '090-1234-5678';
      expect(input.replaceAll('-', '').length).toBe(11);

      await user.clear(phone);
      await user.type(phone, input);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.PHONE.FORMAT));
    });

    test('非数値', async () => {
      renderComponent();

      const user = userEvent.setup();
      const phone = screen.getByRole('textbox', { name: '電話番号' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(phone);
      await user.type(phone, 'Not a number');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.PHONE.FORMAT));
    });
  });
});

// ------------------ 年齢 ------------------ //

describe('年齢', () => {
  describe('正常系', () => {
    test('6歳、100歳', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const age = screen.getByRole('spinbutton', { name: '年齢' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 6歳
      await user.clear(age);
      await user.type(age, '6');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 100歳
      await user.clear(age);
      await user.type(age, '100');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const age = screen.getByRole('spinbutton', { name: '年齢' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(age);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.AGE.REQUIRED));
    });

    test('5歳', async () => {
      renderComponent();

      const user = userEvent.setup();
      const age = screen.getByRole('spinbutton', { name: '年齢' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(age);
      await user.type(age, '5');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.AGE.MIN));
    });

    test('101歳', async () => {
      renderComponent();

      const user = userEvent.setup();
      const age = screen.getByRole('spinbutton', { name: '年齢' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(age);
      await user.type(age, '101');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.AGE.MAX));
    });

    test('非数値', async () => {
      renderComponent();

      const user = userEvent.setup();
      const age = screen.getByRole('spinbutton', { name: '年齢' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(age);
      await user.type(age, 'Not a number');
      await user.click(submitButton);

      // input type="number" に数値以外を入力するとブラウザは
      // 自動的に空白文字列として扱う
      expect(screen.getByText(ERROR.AGE.REQUIRED));
    });
  });
});

// ------------------ 参加人数 ------------------ //

describe('参加人数', () => {
  describe('正常系', () => {
    test('1名、10名', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const attendeeCount = screen.getByRole('combobox', { name: '参加人数' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 1名
      await user.selectOptions(attendeeCount, '1名');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 10名
      await user.selectOptions(attendeeCount, '10名');
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const attendeeCount = screen.getByRole('combobox', { name: '参加人数' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 値で選択
      await user.selectOptions(attendeeCount, '');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDEE_COUNT.REQUIRED));

      // 表示テキストで選択
      await user.selectOptions(attendeeCount, '選択してください');
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDEE_COUNT.REQUIRED));
    });
  });
});

// ------------------ 参加日 ------------------ //

describe('参加日', () => {
  describe('正常系', () => {
    test('明日、90日後', async () => {
      // 明日のISO日付
      const tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      const tomorrowIsoString = tomorrow.toISOString().split('T')[0];

      // 90日後のISO日付
      const ninetyDaysLater = new Date();
      ninetyDaysLater.setDate(new Date().getDate() + 90);
      const ninetyDaysLaterIsoString = tomorrow.toISOString().split('T')[0];

      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const attendanceDate = screen.getByLabelText('参加日');
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 明日
      await user.clear(attendanceDate);
      await user.type(attendanceDate, tomorrowIsoString);
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 90日後
      await user.clear(attendanceDate);
      await user.type(attendanceDate, ninetyDaysLaterIsoString);
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      renderComponent();

      const user = userEvent.setup();
      const attendanceDate = screen.getByLabelText('参加日');
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(attendanceDate);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDANCE_DATE.REQUIRED));
    });

    test('昨日', async () => {
      // 昨日のISO日付
      const testDate = new Date();
      testDate.setDate(new Date().getDate() - 1);
      const testDateIsoString = testDate.toISOString().split('T')[0];

      renderComponent();

      const user = userEvent.setup();
      const attendanceDate = screen.getByLabelText('参加日');
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(attendanceDate);
      await user.type(attendanceDate, testDateIsoString);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDANCE_DATE.PAST_DATE));
    });

    test('今日', async () => {
      // 今日のISO日付
      const testDate = new Date();
      const testDateIsoString = testDate.toISOString().split('T')[0];

      renderComponent();

      const user = userEvent.setup();
      const attendanceDate = screen.getByLabelText('参加日');
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(attendanceDate);
      await user.type(attendanceDate, testDateIsoString);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDANCE_DATE.PAST_DATE));
    });

    test('91日後', async () => {
      // 91日後のISO日付
      const testDate = new Date();
      testDate.setDate(new Date().getDate() + 91);
      const testDateIsoString = testDate.toISOString().split('T')[0];

      renderComponent();

      const user = userEvent.setup();
      const attendanceDate = screen.getByLabelText('参加日');
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(attendanceDate);
      await user.type(attendanceDate, testDateIsoString);
      await user.click(submitButton);

      expect(screen.getByText(ERROR.ATTENDANCE_DATE.OVER_DAYS));
    });
  });
});

// ------------------ 参加時間帯 ------------------ //

describe('参加時間帯', () => {
  describe('正常系', () => {
    test('午前、午後、夕方', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      const options = [/午前/, /午後/, /夕方/];

      for (const option of options) {
        await user.click(screen.getByRole('radio', { name: option }));
        await user.click(submitButton);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(spyLog).toHaveBeenCalledWith('送信成功');
      }
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      // ラジオボタンなので未入力のテストはスキップ
    });
  });
});

// ------------------ 食事の有無 ------------------ //

describe('食事の有無', () => {
  describe('正常系', () => {
    test('必要、不要', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      const options = [/必要/, /不要/];

      for (const option of options) {
        await user.click(screen.getByRole('radio', { name: option }));
        await user.click(submitButton);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(spyLog).toHaveBeenCalledWith('送信成功');
      }
    });
  });

  describe('異常系', () => {
    test('未入力', async () => {
      // ラジオボタンなので未入力のテストはスキップ
    });
  });
});

// ------------------ アレルギー情報 ------------------ //

describe('アレルギー情報', () => {
  describe('正常系', () => {
    test('未入力（食事なしの場合）', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const allergyInfo = screen.getByRole('textbox', {
        name: 'アレルギー情報',
      });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // アレルギー情報クリア
      await user.clear(allergyInfo);
      expect((allergyInfo as HTMLInputElement).value.length).toBe(0);

      // 食事不要
      await user.click(screen.getByRole('radio', { name: /不要/ }));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });

    test('2文字、200文字（食事ありの場合）', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const allergyInfo = screen.getByRole('textbox', {
        name: 'アレルギー情報',
      });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 食事必要
      await user.click(screen.getByRole('radio', { name: /必要/ }));
      await user.click(submitButton);

      // 2文字
      await user.clear(allergyInfo);
      await user.type(allergyInfo, 'あい');

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 200文字
      await user.clear(allergyInfo);
      await user.type(allergyInfo, 'あ'.repeat(200));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('未入力（食事ありの場合）', async () => {
      renderComponent();

      const user = userEvent.setup();
      const allergyInfo = screen.getByRole('textbox', {
        name: 'アレルギー情報',
      });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // アレルギー情報クリア
      await user.clear(allergyInfo);
      expect((allergyInfo as HTMLInputElement).value.length).toBe(0);

      // 食事必要
      await user.click(screen.getByRole('radio', { name: /必要/ }));

      await user.click(submitButton);
      expect(screen.getByText(ERROR.ALLERGY_INFO.REQUIRED));
    });

    test('1文字（食事ありの場合）', async () => {
      renderComponent();

      const user = userEvent.setup();
      const allergyInfo = screen.getByRole('textbox', {
        name: 'アレルギー情報',
      });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 食事必要
      await user.click(screen.getByRole('radio', { name: /必要/ }));

      // 1文字
      await user.clear(allergyInfo);
      await user.type(allergyInfo, 'あ');

      await user.click(submitButton);
      expect(screen.getByText(ERROR.ALLERGY_INFO.LENGTH));
    });

    test('201文字（食事ありの場合）', async () => {
      renderComponent();

      const user = userEvent.setup();
      const allergyInfo = screen.getByRole('textbox', {
        name: 'アレルギー情報',
      });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 食事必要
      await user.click(screen.getByRole('radio', { name: /必要/ }));

      // 201文字
      await user.clear(allergyInfo);
      await user.type(allergyInfo, 'あ'.repeat(201));

      await user.click(submitButton);
      expect(screen.getByText(ERROR.ALLERGY_INFO.LENGTH));
    });
  });
});

// ------------------ 連絡事項 ------------------ //

describe('連絡事項', () => {
  describe('正常系', () => {
    test('未入力、500文字', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const notice = screen.getByRole('textbox', { name: '連絡事項' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // 未入力
      await user.clear(notice);
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');

      // 500文字
      await user.clear(notice);
      await user.type(notice, 'あ'.repeat(500));
      await user.click(submitButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('501文字', async () => {
      renderComponent();

      const user = userEvent.setup();
      const notice = screen.getByRole('textbox', { name: '連絡事項' });
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      await user.clear(notice);
      await user.type(notice, 'あ'.repeat(501));
      await user.click(submitButton);

      expect(screen.getByText(ERROR.NOTICE.LENGTH));
    });
  });
});

// ------------------ プライバシーポリシー同意 ------------------ //

describe('プライバシーポリシー同意', () => {
  describe('正常系', () => {
    test('チェックON', async () => {
      const spyLog = spyOnConsoleLog();

      renderComponent();
      await inputValidData();

      const user = userEvent.setup();
      const agreeToPolicy = screen.getByRole('checkbox', {
        name: 'プライバシーポリシーに同意します',
      }) as HTMLInputElement;
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // チェックON
      if (!agreeToPolicy.checked) await user.click(agreeToPolicy);
      await user.click(submitButton);

      expect(agreeToPolicy).toBeChecked();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(spyLog).toHaveBeenCalledWith('送信成功');
    });
  });

  describe('異常系', () => {
    test('チェックOFF', async () => {
      renderComponent();

      const user = userEvent.setup();
      const agreeToPolicy = screen.getByRole('checkbox', {
        name: 'プライバシーポリシーに同意します',
      }) as HTMLInputElement;
      const submitButton = screen.getByRole('button', {
        name: '申し込みを確定する',
      });

      // チェックOFF
      if (agreeToPolicy.checked) await user.click(agreeToPolicy);
      await user.click(submitButton);

      expect(agreeToPolicy).not.toBeChecked();
      expect(screen.getByText(ERROR.AGREE_TO_POLICY.REQUIRED));
    });
  });
});
