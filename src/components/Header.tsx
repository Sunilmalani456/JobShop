import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

// type HeaderProps = {
//   searchText: string;
//   setSearchText: (text: string) => void;
// };

export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm />
    </header>
  );
}
