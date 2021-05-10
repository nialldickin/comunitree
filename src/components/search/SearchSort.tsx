import { ChangeEvent, Dispatch, memo, SetStateAction } from 'react';

interface Props {
  sortEnum: string;
  setSortEnum: Dispatch<SetStateAction<string>>;
}

const SearchSort = ({ sortEnum, setSortEnum }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortEnum(event.target.value);
  };

  return (
    <span className="font-light ml-auto text-lg justify-self-end self-end">
      <span className="text-gray-400 pr-2">Sort by:</span>
      <select
        className="select pr-8 green-arrow"
        value={sortEnum}
        onChange={handleChange}
      >
        <option value="NEWEST">Newest Listed</option>
        <option value="OLDEST">Oldest Listed</option>
        <option value="CLOSEST">Closest First</option>
        <option value="FURTHEST">Furthest First</option>
      </select>
    </span>
  );
};

export default memo(SearchSort);
