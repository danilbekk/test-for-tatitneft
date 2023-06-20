import React from 'react';
import styles from './select.module.css';

interface DataItem {
  id: string;
  name?: string;
  text?: string;
}

interface SelectProps {
  data: DataItem[];
  value: string;
  valueKey: keyof DataItem;
  onChange: (value: string) => void;
  allOptionText: string;
}

const Select: React.FC<SelectProps> = ({ data, value, valueKey, onChange, allOptionText }) => {
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allOptionText}</option>
        {data?.map((data) => (
          <option key={data[valueKey]} value={data[valueKey]}>
            {data[valueKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
