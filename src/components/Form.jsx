import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, prevStep } from '../state/formSlice';
import RequirementsCheckStep from './RequirementsCheckStep';
import PersonalAndTravelInfoStep from './PersonalAndTravelInfoStep';

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);

  const step = useSelector((state) => state.form.step);
  const dispatch = useDispatch();

  const onClose = () => setIsOpen(false);

  const handleNext = () => {
    dispatch(nextStep());
  };
  const handlePrev = () => {
    dispatch(prevStep());
  };

  return (
    <div>
      {step === 1 ? (
        <RequirementsCheckStep handleNext={handleNext} />
      ) : (
        <PersonalAndTravelInfoStep
          isOpen={isOpen}
          onClose={onClose}
          step={step}
          setIsOpen={setIsOpen}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default Form;
