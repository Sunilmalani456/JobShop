import { useSearchTextContext } from "../hooks/hooks";

// type SearchFormProps = {
//   searchText: string;
//   setSearchText: (text: string) => void;
// };

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // window.location.href = `/search/${searchText}`;
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
