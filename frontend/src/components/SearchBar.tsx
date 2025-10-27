import React, { FC } from 'react';
import { Search } from 'lucide-react';
import { Autocomplete, TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  placeholder?: string;
  maxWidth?: string | number;
  suggestion?: string[];
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  maxWidth = '400px',
  suggestion = [],
}) => {
  return (
    <div
      style={{
        width: '70%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
        }}
      >
        <Autocomplete
          freeSolo
          options={suggestion}
          inputValue={value}
          onInputChange={(_, val) => onChange(val)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                style: {
                  borderRadius: '15px',
                  padding: '0.5rem 2.5rem 0.5rem 0.8rem',
                },
                endAdornment: (
                  <span
                    onClick={onSearch}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Search size={20} color="#000" />
                  </span>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SearchBar;
