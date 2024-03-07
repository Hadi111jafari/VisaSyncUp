import React from 'react';
import InputElement from './InputElement';
import {
  nationality,
  visaTypes,
  gender,
  maritalStatus,
  jobTitles,
  passportTypes,
  stayPeriod,
  entryType,
  birthLocations,
} from './constants';
import CustomDatePicker from './DatePicker';
import CustomDropzone from './Dropzone';
import SaveButton from './Button';
import { Link } from 'react-router-dom';
import { GrRevert } from 'react-icons/gr';
import CustomLabel from './CustomLabel';
import Instructions from './Instructions';

const FillVisaInformationForm = () => {
  const hr = (
    <>
      <hr className="w-3/4 h-px mx-auto my-4 bg-gray-100 border-0 rounded md:my-4" />
      <hr className="w-3/4 h-px mx-auto my-4 bg-gray-100 border-0 rounded md:my-4" />
    </>
  );
  return (
    <div className="flex justify-around">
      <div>
        <InputElement
          type="text"
          label="ملیت"
          options={nationality}
          defaultValue="افغان"
          required={true}
        />
        <InputElement
          type="text"
          label="نوع ویزه ها"
          options={visaTypes}
          required={true}
        />
        <InputElement
          type="text"
          label="نام"
          instruction="نام خود را به همان صورت که در گذرنامه درج شده است وارید نمایید"
          required={true}
        />
        <InputElement type="text" label="نام خانوادگی" required={true} />
        <InputElement type="text" label="نام پدر" required={true} />
        <InputElement
          type="text"
          label="جنسیت "
          options={gender}
          required={true}
        />
        <InputElement
          type="text"
          label="تابعیت قبلی"
          defaultValue=""
          required={true}
        />
        <InputElement
          type="text"
          label="تابعیت فعلی"
          defaultValue=""
          required={true}
        />
        <InputElement
          type="text"
          label="محل تولد"
          options={birthLocations}
          defaultValue="افغانستان"
          required={true}
        />
        <CustomDatePicker label="تاریخ تولد" required={true} />
        <InputElement
          type="text"
          label="وضعیت تاهل"
          options={maritalStatus}
          required={true}
        />
        <InputElement
          type="text"
          label="شغل"
          options={jobTitles}
          required={true}
        />
        <div>
          <CustomDropzone required={true} />
          <CustomLabel label="عکس شخصی" />
        </div>
        {hr}
        <InputElement type="tel" label="شماره تلفن متقاضی" required={true} />
        <InputElement type="tel" label="شماره همراه متقاضی" required={true} />
        <InputElement type="email" label="ایمیل" required={true} />
        <InputElement type="text" label="کد پستی" required={false} />
        <InputElement type="textarea" label="آدرس محل اقامت" required={true} />
        <InputElement type="tel" label="شماره تلفن در ایران" required={true} />
        <InputElement type="textarea" label="آدرس در ایران" required={true} />
        {hr}
        <InputElement type="number" label="شماره گذرنامه" required={true} />

        <InputElement
          type="text"
          label="نوع گذرنامه"
          options={passportTypes}
          required={true}
        />
        <CustomDatePicker label="تاریخ صدور" required={true} />
        <CustomDatePicker label="تاریخ انقضا" required={true} />
        <div>
          <CustomDropzone required={true} />
          <CustomLabel label="عکس گذرنامه" />
        </div>
        {hr}
        <InputElement
          type="number"
          label="مدت(روز)"
          options={stayPeriod}
          required={true}
        />
        <InputElement
          type="text"
          label="نوع ورود"
          options={entryType}
          required={true}
        />
        <InputElement
          type="checkbox"
          label="فوری"
          instruction="در صورت انتخاب درخواست فوری 50% به هزینه ویزه ها اضافه میشود"
          required={false}
        />
        <div>
          <CustomDropzone required={false} />
          <CustomLabel label="عکس مهر تمدید اعتبار گذرنامه" />
        </div>
        <div>
          <CustomDropzone required={false} />
          <CustomLabel label="کارت اقامت" />
        </div>
        <div>
          <CustomDropzone required={false} />
          <CustomLabel label="عکس پشت کارت اقامت" />
        </div>
        <CustomDatePicker label="تاریخ تقریبی ورود" required={true} />
        <CustomDatePicker label="تاریخ تقریبی خروج" required={true} />
        <div>
          <CustomDropzone required={false} />
          <CustomLabel label="کارت اقامت در صورت نیاز" />
        </div>
        <InputElement type="textarea" label="هدف از سفر" required={true} />

        <div className="flex">
          <SaveButton link="/next" />
          <Link
            to="/request"
            className="mt-10 ml-2 inline-block  hover:bg-gray-500 hover:text-white text-gray-500 border font-bold py-2 px-4 rounded flex items-center"
          >
            برگشت به صفحه قبل
            <span className="ml-2">
              <GrRevert />
            </span>
          </Link>
        </div>
      </div>
      <div>
        <Instructions step="گام اول" title="اطلاعات شخصی" />
        <Instructions step="گام دوم" title="اطلاعات تماس" />
        <Instructions step="گام سوم" title="اطلاعات گذرنامه" />
        <Instructions step="گام چهارم" title="اطلاعات ویزه ها" />
      </div>
    </div>
  );
};

export default FillVisaInformationForm;
