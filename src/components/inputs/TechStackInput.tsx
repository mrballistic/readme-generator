import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { COMMON_TECH_STACK } from '../../constants/techStack';

interface TechStackInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const TechStackInput: React.FC<TechStackInputProps> = ({ value, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="tech-stack-input"
      options={COMMON_TECH_STACK}
      freeSolo
      value={value}
      onChange={(_event, newValue) => {
        onChange(newValue as string[]);
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              label={option}
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Technology Stack"
          placeholder="Add tools (e.g. React, Docker)"
          margin="normal"
        />
      )}
    />
  );
};

export default TechStackInput;
