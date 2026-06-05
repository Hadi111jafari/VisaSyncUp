import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";

const CustomDatePicker = ({ value, name, label, required, onDateChange }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const handleDateChange = (date) => {
    if (date === null || date === undefined) {
      onDateChange(name, null);
      setError(null);
      return;
    }

    if (dayjs(date).isValid()) {
      onDateChange(name, date);
      setError(null);
    } else {
      setError("invalidDate");
    }
  };

  return (
    <div className="mb-5" dir={isRTL ? "rtl" : "ltr"}>
      <label className="mb-[6px] block text-[0.85rem] font-semibold text-[#0D3B42]">
        {required && <span className="mr-1 text-[#EF4444]">*</span>}
        {label}
      </label>
      <DatePicker
        views={["year", "month", "day"]}
        format="YYYY-MM-DD"
        openTo="year"
        onError={(newError) => setError(newError)}
        value={value || null}
        onChange={handleDateChange}
        name={name}
        slotProps={{
          textField: {
            size: "small",
            helperText: errorMessage,
            inputProps: {
              dir: isRTL ? "rtl" : "ltr",
            },
          },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            minHeight: "48px",
            borderRadius: "14px",
            backgroundColor: "#fff",
            color: "#0D3B42",
            boxShadow: "0 2px 8px rgba(0,120,140,0.08)",
            "& fieldset": {
              borderColor: "rgba(0,184,200,0.2)",
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: "#00B8C8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00B8C8",
            },
          },
          "& .MuiInputBase-input": {
            padding: "12px 14px",
            textAlign: isRTL ? "right" : "left",
            fontSize: "0.95rem",
          },
          "& .MuiFormHelperText-root": {
            marginTop: "5px",
            marginRight: 0,
            color: "#EF4444",
            fontSize: "0.78rem",
          },
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
