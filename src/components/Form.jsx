import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextStep, prevStep } from "../state/formSlice";
import RequirementsCheckStep from "./RequirementsCheckStep";
import PersonalAndTravelInfoStep from "./PersonalAndTravelInfoStep";
import FormStepper from "./FormStepper";
import FormSuccessState from "./FormSuccessState";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressStep, setProgressStep] = useState(1);

  const step = useSelector((state) => state.form.step);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => setIsOpen(false);

  const handleNext = () => {
    dispatch(nextStep());
    setProgressStep(2);
  };
  const handlePrev = () => {
    dispatch(prevStep());
    setProgressStep(1);
  };

  const handleSubmissionComplete = () => {
    setIsOpen(false);
    setIsSubmitted(true);
  };

  const handleNewApplication = () => {
    setIsSubmitted(false);
    setProgressStep(1);
    if (step > 1) {
      dispatch(prevStep());
    }
  };

  const handleProgressStepChange = (nextStep) => {
    setProgressStep(nextStep);
  };

  const handleGoDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="rounded-3xl border border-[#00B8C833] bg-[#F5FEFF] p-3 shadow-[0_6px_24px_rgba(0,120,140,0.12)] sm:p-5">
      {isSubmitted ? (
        <FormSuccessState
          onGoDashboard={handleGoDashboard}
          onNewApplication={handleNewApplication}
        />
      ) : (
        <>
          <FormStepper currentStep={progressStep} />
          {step === 1 ? (
            <RequirementsCheckStep handleNext={handleNext} />
          ) : (
            <PersonalAndTravelInfoStep
              isOpen={isOpen}
              onClose={onClose}
              step={step}
              setIsOpen={setIsOpen}
              handlePrev={handlePrev}
              onFormSubmitted={handleSubmissionComplete}
              onProgressStepChange={handleProgressStepChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Form;
