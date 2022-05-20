import React, { useEffect, useState } from "react";

import { InputRadioOption } from "../../../types/InputRadioOption";
import { Container, Title, Field, Label, Buttom } from "./styles";

type InputRadioProps = {
  options: InputRadioOption[];
  onChange(prop: any): void;
  value: string | number;
  label?: string;
};

export const InputRadio = ({
  label,
  options,
  value,
  onChange,
}: InputRadioProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<string | number>();

  useEffect(() => {
    setSelectedOption(value || options[0].value);
    onChange(value || options[0].value);
  }, [value, options[0].value]);

  const onSelectOption = (option: string | number) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Container>
      {!!label && <Title>{label}</Title>}

      {options.map((option) => (
        <Field key={String(option.value)}>
          <Buttom
            $isSelected={option.value === selectedOption}
            onPress={() => onSelectOption(option.value)}
          />
          <Label>{option.label}</Label>
        </Field>
      ))}
    </Container>
  );
};