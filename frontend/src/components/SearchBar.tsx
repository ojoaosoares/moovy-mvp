import React, { FC } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  placeholder?: string;
  maxWidth?: string | number;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  maxWidth = '400px',
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
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder={placeholder}
          style={{
            width: '100%',
            borderRadius: '15px',
            border: '1px solid #dedede',
            padding: '0.5rem 2.5rem 0.5rem 0.8rem',
            boxSizing: 'border-box',
          }}
        />
        <span
          onClick={onSearch}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Search size={20} color="#000" />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
