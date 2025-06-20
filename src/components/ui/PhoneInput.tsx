import { useRef, useEffect } from "react";
import IMask from "imask";

const PhoneInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (a: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InstanceType<typeof IMask.InputMask> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      maskRef.current = IMask(inputRef.current, {
        mask: "+{7} (000) 000-00-00",
      });
      maskRef.current.on("accept", () => {
        if (maskRef.current) {
          onChange(maskRef.current.unmaskedValue);
        }
      });
    }

    return () => maskRef.current?.destroy();
  }, [onChange]);

  useEffect(() => {
    if (maskRef.current) {
      maskRef.current.value = value || "";
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="tel"
      placeholder="+7 (___) ___-__-__"
      className="phone-input"
    />
  );
};

export default PhoneInput;
