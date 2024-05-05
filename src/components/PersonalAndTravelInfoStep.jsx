import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InputField from './InputField';
import CustomDatePicker from './DatePicker';
import CustomDropzone from './Dropzone';
import Instructions from './Instructions';
import { formFields, instructions } from './constants';
import { updateFormData, uploadImage } from '../state/formSlice';
import { toggleCheckbox } from '../state/formSlice';
import FinalCheckModal from './FinalCheckModal';
import { VscChecklist } from 'react-icons/vsc';
import { GrRevert } from 'react-icons/gr';
import { IoIosSave } from 'react-icons/io';

const PersonalAndTravelInfoStep = ({
  isOpen,
  onClose,
  step,
  setIsOpen,
  handlePrev,
}) => {
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  // const [preview, setPreview] = useState('');
  const formData = useSelector((state) => state.form.formData);
  const isChecked = formData.urgentRequest;
  const photo = formData.photo
  console.log("🚀 ~ photo:", photo)
  const dispatch = useDispatch();

  const handlePreview1 = (name, files) => {
    // dispatch(uploadImage({name, files}));
    setSelectedFiles1(files)
  };

  const handleChange = (name, value) => {
    dispatch(updateFormData({ name, value }));
  };

  const handleCheckboxChange = () => {
    dispatch(toggleCheckbox());
  };
  const instructionIdMap = { 16: 100, 23: 200, 28: 300, 38: 400 };
  const idsToRenderHrAfter = Object.keys(instructionIdMap).map(Number);

  let costAndLocationInModal = [];
  let otherFieldsInModal = [];

  const renderFieldComponent = (fieldDetail) => {
    switch (fieldDetail.type) {
      case 'InputField':
        return (
          <InputField
            key={fieldDetail.id}
            value={formData[fieldDetail.props.name]}
            isChecked={isChecked}
            onInputChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            {...fieldDetail.props}
          />
        );
      case 'CustomDatePicker':
        return (
          <CustomDatePicker
            key={fieldDetail.id}
            value={formData[fieldDetail.props.name]}
            name={fieldDetail.props.name}
            onDateChange={handleChange}
            {...fieldDetail.props}
          />
        );
      case 'CustomDropzone':
        return (
          <CustomDropzone
            key={fieldDetail.id}
            selectedFiles={selectedFiles1}
            // setSelectedFiles={setSelectedFiles}
            handlePreview={handlePreview1}
            label={fieldDetail.label}
            {...fieldDetail.props}
          />
        );
      default:
        return null;
    }
  };

  const renderSections = () => {
    let sections = [];
    let currentSectionFields = [];

    formFields.forEach((field, index) => {
      if (field.id >= 5 && field.id <= 38) {
        currentSectionFields.push(
          <div key={`currentSectionFields-${field.id}`}>
            {renderFieldComponent(field)}
          </div>
        );
      }
      if (idsToRenderHrAfter.includes(field.id)) {
        const instruction = instructions.find(
          (instr) => instr.id === instructionIdMap[field.id]
        );
        sections.push(
          <div
            key={`section-${field.id}`}
            className="grid grid-cols-1 sm:grid-cols-12 gap-10 m-5 sm:m-10 text-sm z-10 relative "
          >
            <div className="sm:col-start-2 sm:col-span-5">
              {currentSectionFields}
            </div>
            <Instructions
              key={instruction.id}
              title={instruction.title}
              id={instruction.id}
              step={instruction.step}
              instructions={instruction.content}
            />
          </div>
        );

        if (index < formFields.length - 2) {
          sections.push(
            <div key={`hr-${field.id}`} className="w-5/6 mr-auto ml-auto">
              <hr className="w-full h-px my-3 bg-gray-500 border-0 rounded" />
              <hr className="w-full h-px my-3 bg-gray-500 border-0 rounded" />
            </div>
          );
        }

        currentSectionFields = [];
      }
      // Modal
      let fieldValuesInModal;
      let checkboxValue;
      let type;
      let visaCost;
      if (formData[field.props.name] === null) {
        return null;
      }
      if (formData[field.props.name] instanceof dayjs) {
        const formattedDate = formData[field.props.name].format('YYYY-MM-DD');
        fieldValuesInModal = formattedDate;
      } else {
        fieldValuesInModal = formData[field.props.name];
      }
      if (isChecked) {
        checkboxValue = 'بلی';
      } else {
        checkboxValue = 'خیر';
      }
      if (field.id === 31) {
        fieldValuesInModal = checkboxValue;
      }

      if (field.id >= 5 && field.id <= 37) {
        otherFieldsInModal.push(
          <div
            className="flex mt-4 text-slate-100"
            key={`111field-${field.id}`}
          >
            <p className="flex-1" key={`label-${field.id}`}>
              {field.props.label}
            </p>
            <p className="flex-1 mr-5" key={`value-${field.id}-${index}`}>
              {fieldValuesInModal}
            </p>
          </div>
        );
      }

      if (field.id === 1) {
        type = formData.visaType;
      }

      if (field.id === 4 || field.id === 39) {
        let i;
        switch (type) {
          case 'ورود':
            i = 0;
            break;
          case 'جهانگردی':
            i = 1;
            break;
          case 'زیارتی':
            i = 2;
            break;
          case 'سیاسی':
            i = 3;
            break;
          case 'عبور':
            i = 4;
            break;
          case 'تجاری':
            i = 5;
            break;
          case 'بازدید':
            i = 6;
            break;
          case 'جهانگردی (فوری)':
            i = 7;
            break;
          default:
            i = -1;
        }
        if (i !== -1) {
          visaCost = formData.visaCost[i];
          return;
        }
        costAndLocationInModal.push(
          <div className="flex mt-4 relative">
            <p key={`costAndLocation-${field.id}-label`}>{field.props.label}</p>
            <p
              key={`costAndLocation-${field.id}-value`}
              className={`mr-8 font-semibold ${
                field.id === 39 ? 'text-green-500' : null
              }`}
            >
              {field.id === 4 ? formData[field.props.name] : visaCost}
            </p>
          </div>
        );
      }
    });

    return sections;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col ">
        {renderSections()}
        {step === 2 && (
          <>
            <div className="sm:flex sm:gap-4 sm:mr-5 sm:mb-10 sm:ml-20 sm:mt-0 gap-4 mr-auto mb-10 ml-auto mt-0">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex sm:w-[197px] justify-center mt-2 w-full bg-gray-100 hover:text-white text-blue-600 font-bold border rounded-full py-2 px-4  hover:bg-blue-600  transition duration-300 ease-in-out transform hover:scale-105"
              >
                ثبت و ادامه
                <span className="ml-2 mt-1">
                  <IoIosSave />
                </span>
              </button>
              <div className="mt-2 hover:bg-gray-500 hover:text-white text-gray-500 border font-bold py-2 px-4 rounded-full  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                <button className="flex" type="button" onClick={handlePrev}>
                  برگشت به صفحه قبل
                  <span className="ml-2 mt-1.5">
                    <GrRevert />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex">
        <div className="z-10 relative ">
          <FinalCheckModal
            open={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
          >
            <div className="bg-slate-500">
              <div className="m-12">
                <p
                  dir="ltr"
                  onClick={onClose}
                  className="cursor-pointer text-slate-200"
                >
                  X
                </p>
                <div className="flex">
                  {selectedFiles1.map((file, index) => (
                    <img
                      className='w-20 h-20'
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview 1 - ${index}`}
                    />
                  ))}
                  <h1 className="mr-4 mt-5 text-slate-100 font-bold">
                    اطلاعات وارده شده مورد تائید شما می باشد ؟
                  </h1>
                </div>
                <hr />
                {otherFieldsInModal}
              </div>
            </div>
            <div className="ml-12 mr-12 mt-2 relative">
              <div key={`keysss-${Math.random()}`} className="flex flex-col">
                {costAndLocationInModal}
                <div className="">
                  <VscChecklist
                    key={1}
                    size={70}
                    className="absolute top-4 left-0 text-slate-500"
                  />
                </div>
              </div>
              <div className="flex-wrap border mt-4 text-center bg-slate-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
                odio a? Alias quo sit cum nobis placeat nam, voluptate error
                doloremque, suscipit dignissimos eos fugiat distinctio nihil.
              </div>
            </div>
          </FinalCheckModal>
        </div>
      </div>
    </>
  );
};

export default PersonalAndTravelInfoStep;
