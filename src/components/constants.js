export const visaTypes = [
  'ورود',
  'جهانگردی',
  'زیارتی',
  'سیاسی',
  'خدمت',
  'عبور',
  'مطبوعاتی',
  'خانواده',
  'تجاری',
  'بازدید بستگان',
  'جهانگردی (فوری)',
  'رانندگان',
];
export const passportTypes = [
  'عادی',
  'خدمت',
  'مدرک مسافرتی',
  'لسه پاسه',
  'رسمی',
];
export const nationality = ['افغان'];
export const visaCenterLocation = [
  'کابل',
  'هرات',
  'مزارشریف',
  'قندهار',
  'جلال آباد',
];

export const gender = ['مرد', 'زن'];
export const maritalStatus = ['مجرد', 'متاهل', 'طلاق'];
export const stayPeriod = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
];

export const entryType = ['یکبار', 'دوبار', 'چند بار'];
export const jobTitles = [
  'برنامه‌نویس وب',
  'مهندس نرم‌افزار',
  'مدیر پروژه',
  'متخصص سیستم‌های اطلاعاتی',
  'مهندس شبکه',
  'مدیر IT',
  'طراح UI/UX',
  'متخصص امنیت اطلاعاتی',
  'مدیر شبکه',
  'متخصص بانک اطلاعاتی',
  'متخصص ارتباطات',
  'توسعه‌دهنده نرم‌افزار',
  'تحلیلگر سیستم',
  'مدیر دیتابیس',
  'مهندس سخت‌افزار',
  'متخصص CRM',
  'متخصص ERP',
  'مدیر امور فناوری اطلاعات',
  'متخصص پشتیبانی فنی',
  'متخصص اپلیکیشن موبایل',
  'توسعه‌دهنده بازی‌های رایانه‌ای',
  'مهندس ارتباطات',
  'مدیر سیستم‌های اطلاعاتی',
  'توسعه‌دهنده وب‌سایت',
  'متخصص انفورماتیک پزشکی',
  'تحلیلگر داده',
  'مهندس رمزگشایی',
  'متخصص سیستم‌های مخابراتی',
  'مدیر امنیت اطلاعاتی',
  'مهندس رایانه',
  'توسعه‌دهنده اپلیکیشن وب',
  'متخصص شبکه',
  'توسعه‌دهنده بازی‌های موبایل',
  'متخصص ارتباطات نوری',
  'مدیر پشتیبانی فنی',
  'متخصص پایگاه داده',
  'مهندس کامپیوتر',
  'متخصص امنیت شبکه',
  'تحلیلگر سیستم‌های اطلاعاتی',
  'متخصص سرور',
  'مدیر سایبر',
  'توسعه‌دهنده اپلیکیشن موبایل',
  'متخصص ارتباطات بیسیم',
  'مدیر دیجیتال',
  'متخصص طراحی وب',
  'توسعه‌دهنده بازی‌های آنلاین',
];

export const birthLocations = [
  'کابل',
  'هرات',
  'مزار شریف',
  'کندهار',
  'بلخ',
  'بغلان',
  'پل خمری',
  'ننگرهار',
  'فاریاب',
  'غزنی',
  'پکتیا',
  'کونر',
  'زابل',
  'بامیان',
  'لغمان',
  'پنجشیر',
  'نیمروز',
  'هلمند',
  'بادغیس',
  'کاپیسا',
  'سمنگان',
  'خوست',
  'بدخشان',
  'جوزجان',
  'سرپل',
  'دایکندی',
  'تخار',
  'فراه',
  'نورستان',
  'بغداد',
];

export const instructions = [
  {
    id: 100,
    step: 'گام اول',
    title: 'اطلاعات شخصی',
    content: [
      `
    در صورتی که شما دارای ملیت دوگانه هستید، لطفا ملیت خود را بر اساس
    گذرنامه ای که قصد استفاده برای سفر به ایران را دارید انتخاب
    نمایید.`,
      ` در صورتی که ملیت چاپ شده بر روی ویزه ها با ملیت گذرنامه مغایرت
    داشته باشد، ویزه ها از ارزش اعتبار ساقط خواهد شد.`,
      `برای دریافت ویزه ها ارائه گذرنامه معتبر که حداقل شش ماه از اعتبار
    آن باقی مانده باشد الزامی است.`,
      `
    لطفا عکس پرسنلی را بر اساس استانداردهای مشخص شده بارگذاری
    نمایید.راهنمای استاندارد عکس پرسنلی`,
      ` لطفا اسکن صفحه اول گذرنامه خود را بر اساس استانداردهای مشخص شده
    بارگذاری نمایید. راهنمای استاندارد اسکن گذرنامه`,
    ],
  },
  {
    id: 200,
    step: 'گام دوم',
    title: 'اطلاعات تماس',
    content: [
      `
      لطفا نام خود را منطبق بر اطلاعات گذرنامه و یا سند مسافرتی خود وارد نمایید حتی اگر در دیگر مدارک شناسایی شما این نام متفاوت است.`,
      ` لطفا نام فامیلی خود را مطابق اطلاعات گذرنامه و یا سند مسافرتی خود وارد نمایید حتی اگر اطلاعات روی گذرنامه مطابق نام اصلی شما نباشد.`,
      `در صورتی که شما دارای نام میانی در گذرنامه خود می باشید آن را بعد از نام در فیلد نام وارد نمایید.`,
      `
      لطفا اطلاعات تماس خود را با دقت وارد کنید. از این
      اطلاعات جهت بررسی درخواست شما استفاده می گردد.
      .هر گونه اطلاعات نادرست منجر به رد درخواست خواهد
   `,
      ` در پایان فرایند ثبت درخواست یک ایمیل تایید برای
      آدرس ایمیلی که وارد کرده اید ارسال می شود اگر
      همچنین ایمیلی دریافت نکردید با ما تماس بگیرید`,
      `از آنجایی که کلیه مکاتبات از طریق آدرس پست الکترونیکی شما صورت می‌پذیرد، لذا در وارد کردن اطلاعات پست الکترونیکی خود دقت نمایید.`,
      `در پایان فرایند ثبت درخواست شما باید فرایند تایید پست الکترونیکی را تکمیل نمایید.`,
      `لطفا اطلاعات محل اقامت خود در ایران را به طور دقیق مشخص نمایید.`,
    ],
  },
  {
    id: 300,
    step: 'گام سوم',
    title: 'اطلاعات گذرنامه',
    content: [
      `
      لطفا اطلاعات گذرنامه خود را با دقت وارد کنید ویزه ها صادر شده بر اساس اطلاعات گذرنامه شما خواهد بود هرگونه مغایرت ویزه ها را از درجه اعتبار ساقط خواهد کرد`,
      ` فایل اسکن گذرنامه باید در فرمت JPG بوده و با حجم کمتر از ۵۰۰ کیلوبایت آپلود شود`,
      `برای دریافت ویزه ها ارائه گذرنامه معتبر که حداقل شش ماه از اعتبار آن باقی مانده باشد الزامی است`,
    ],
  },
  {
    id: 400,
    step: 'گام چهارم',
    title: 'اطلاعات ویزه ها',
    content: [
      `
      لطفا محل اخذ ویزه ها مورد نظر خود را از لیست نمایندگی
های وزارت امور خارجه جمهوری اسلامی ایران مشخص
نمایید. توجه داشته باشید که محل اخذ ویزه ها یکی از
نمایندگی جمهوری اسلامی ایران است که شما باید مدارک
خود را جهت دریافت ویزه ها تحویل دهید.`,
      ` مدت ویزه ها و نوع ورود ممکن است در طی فرایند بررسی
      تغییر نماید.`,
    ],
  },
  {
    id: 500,
    title: 'نکاتی که قبل از درخواست ویزه ها باید بدانید:',
    content: [
      `
    در صورتی که شما دارای ملیت دوگانه هستید، لطفا ملیت خود را بر اساس
    گذرنامه ای که قصد استفاده برای سفر به ایران را دارید انتخاب
    نمایید.`,
      ` در صورتی که ملیت چاپ شده بر روی ویزه ها با ملیت گذرنامه مغایرت
    داشته باشد، ویزه ها از ارزش اعتبار ساقط خواهد شد.`,
      `برای دریافت ویزه ها ارائه گذرنامه معتبر که حداقل شش ماه از اعتبار
    آن باقی مانده باشد الزامی است.`,
      `
    لطفا عکس پرسنلی را بر اساس استانداردهای مشخص شده بارگذاری
    نمایید.راهنمای استاندارد عکس پرسنلی`,
      ` لطفا اسکن صفحه اول گذرنامه خود را بر اساس استانداردهای مشخص شده
    بارگذاری نمایید. راهنمای استاندارد اسکن گذرنامه`,
    ],
  },
];
export const formFields = [
  {
    id: 1,
    type: 'InputField',
    props: {
      name: 'visaType',
      type: 'text',
      label: 'نوع ویزه ها',
      options: visaTypes,
      required: true,
    },
  },
  {
    id: 2,
    type: 'InputField',
    props: {
      name: 'nationality',
      type: 'text',
      label: 'ملیت',
      options: nationality,
      required: true,
    },
  },
  {
    id: 3,
    type: 'InputField',
    props: {
      name: 'passportType',
      type: 'text',
      label: 'نوع گذرنامه',
      options: passportTypes,
      required: true,
    },
  },
  {
    id: 4,
    type: 'InputField',
    props: {
      name: 'visaCenterLocation',
      type: 'text',
      label: 'مرکز مراجعه ویزه',
      options: visaCenterLocation,
      instruction:
        'سفارت یا نمایندگی ایران که قصد تحویل مدارک و یا دریافت ویزه را دارید',
      required: true,
    },
  },
  {
    id: 5,
    type: 'InputField',
    props: {
      name: 'nationalityDuplicate', 
      type: 'text',
      label: 'ملیت',
      options: nationality,
      required: true,
    },
  },
  {
    id: 6,
    type: 'InputField',
    props: {
      name: 'visaTypeDuplicate', 
      type: 'text',
      label: 'نوع ویزه ها',
      options: visaTypes,
      required: true,
    },
  },
  {
    id: 7,
    type: 'InputField',
    props: {
      name: 'firstName',
      type: 'text',
      label: 'نام',
      // instruction:
      //   'نام خود را به همان صورت که در گذرنامه درج شده است وارید نمایید',
      required: true,
    },
  },
  {
    id: 8,
    type: 'InputField',
    props: {
      name: 'lastName',
      type: 'text',
      label: 'نام خانوادگی',
      required: true,
    },
  },
  {
    id: 9,
    type: 'InputField',
    props: {
      name: 'fatherName',
      type: 'text',
      label: 'نام پدر',
      required: true,
    },
  },
  {
    id: 10,
    type: 'InputField',
    props: {
      name: 'gender',
      type: 'text',
      label: 'جنسیت',
      options: gender,
      required: true,
    },
  },
  {
    id: 11,
    type: 'InputField',
    props: {
      name: 'previousNationality',
      type: 'text',
      label: 'تابعیت قبلی',
      required: true,
    },
  },
  {
    id: 12,
    type: 'InputField',
    props: {
      name: 'birthLocation',
      type: 'text',
      label: 'محل تولد',
      options: birthLocations,
      required: true,
    },
  },
  {
    id: 13,
    type: 'CustomDatePicker',
    props: {
      name: 'birthDate',
      label: 'تاریخ تولد',
      required: 'true',
    },
  },
  {
    id: 14,
    type: 'InputField',
    props: {
      name: 'maritalStatus',
      type: 'text',
      label: 'وضعیت تاهل',
      options: maritalStatus,
      required: true,
    },
  },
  {
    id: 15,
    type: 'InputField',
    props: {
      name: 'jobTitle',
      type: 'text',
      label: 'شغل',
      options: jobTitles,
      required: true,
    },
  },
  {
    id: 16,
    type: 'CustomDropzone',
    props: {
      name: 'personalPhoto',
      required: true,
    },
    label: 'عکس شخصی', 
  },
  {
    id: 17,
    type: 'InputField',
    props: {
      name: 'applicantPhoneNumber',
      type: 'tel',
      label: 'شماره تلفن متقاضی',
      required: true,
    },
  },
  {
    id: 18,
    type: 'InputField',
    props: {
      name: 'applicantMobileNumber',
      type: 'tel',
      label: 'شماره همراه متقاضی',
      required: true,
    },
  },
  {
    id: 19,
    type: 'InputField',
    props: {
      name: 'email',
      type: 'email',
      label: 'ایمیل',
      required: true,
    },
  },
  {
    id: 20,
    type: 'InputField',
    props: {
      name: 'postalCode',
      type: 'text',
      label: 'کد پستی',
      required: false,
    },
  },
  {
    id: 21,
    type: 'InputField',
    props: {
      name: 'residenceAddress',
      type: 'textarea',
      label: 'آدرس محل اقامت',
      required: true,
    },
  },
  {
    id: 22,
    type: 'InputField',
    props: {
      name: 'phoneNumberInIran',
      type: 'tel',
      label: 'شماره تلفن در ایران',
      required: true,
    },
  },
  {
    id: 23,
    type: 'InputField',
    props: {
      name: 'addressInIran',
      type: 'textarea',
      label: 'آدرس در ایران',
      required: true,
    },
  },
  {
    id: 24,
    type: 'InputField',
    props: {
      name: 'passportNumber',
      type: 'number',
      label: 'شماره گذرنامه',
      required: true,
    },
  },
  {
    id: 25,
    type: 'InputField',
    props: {
      name: 'passportTypeDuplicate', 
      type: 'text',
      label: 'نوع گذرنامه',
      options: passportTypes,
      required: true,
    },
  },
  {
    id: 26,
    type: 'CustomDatePicker',
    props: {
      name: 'issueDate',
      label: 'تاریخ صدور',
      required: 'true',
    },
  },
  {
    id: 27,
    type: 'CustomDatePicker',
    props: {
      name: 'expirationDate',
      label: 'تاریخ انقضأ',
      required: 'true',
    },
  },
  {
    id: 28,
    type: 'CustomDropzone',
    props: {
      name: 'passportPhoto',
      required: true,
    },
    label: 'عکس گذرنامه', 
  },
  {
    id: 29,
    type: 'InputField',
    props: {
      name: 'stayPeriod',
      type: 'number',
      label: 'مدت(روز)',
      options: stayPeriod,
      required: true,
    },
  },
  {
    id: 30,
    type: 'InputField',
    props: {
      name: 'entryType',
      type: 'text',
      label: 'نوع ورود',
      options: entryType,
      required: true,
    },
  },
  {
    id: 31,
    type: 'InputField',
    props: {
      name: 'urgentRequest',
      type: 'checkbox',
      label: 'فوری',
      instruction:
        'در صورت انتخاب درخواست فوری 50% به هزینه ویزه ها اضافه میشود',
      required: false,
    },
  },
  {
    id: 32,
    type: 'CustomDropzone',
    props: {
      name: 'passportStampPhoto',
      required: false,
    },
    label: 'عکس مهر تمدید اعتبار گذرنامه', 
  },
  {
    id: 33,
    type: 'CustomDropzone',
    props: {
      name: 'residenceCard',
      required: false,
    },
    label: 'کارت اقامت', 
  },
  {
    id: 34,
    type: 'CustomDropzone',
    props: {
      name: 'backOfResidenceCard',
      required: false,
    },
    label: 'عکس پشت کارت اقامت', 
  },
  {
    id: 35,
    type: 'CustomDatePicker',
    props: {
      name: 'approximateEntryDate',
      label: 'تاریخ تقریبی ورود',
      required: 'true',
    },
  },
  {
    id: 36,
    type: 'CustomDatePicker',
    props: {
      name: 'approximateExitDate',
      label: 'تاریخ تقریبی خروج',
      required: 'true',
    },
  },
  {
    id: 37,
    type: 'CustomDropzone',
    props: {
      name: 'residenceCardIfNecessary',
      required: false,
    },
    label: 'کارت اقامت در صورت نیاز', 
  },
  {
    id: 38,
    type: 'InputField',
    props: {
      type: 'textarea',
      name: 'travelPurpose',
      label: 'هدف از سفر',
      required: true,
    },
  },
  {
    id: 39,
    type: 'InputField',
    props: {
      type: 'textarea',
      name: 'visaCost',
      label: 'هزینه ویزه',
      cost: 'visaType',
    },
  },
];
