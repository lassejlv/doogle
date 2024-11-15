const SearchForm = document.getElementById('SearchForm') as HTMLFormElement;
const Err = document.getElementById('error') as HTMLParagraphElement;

let searchEngine = 'https://www.google.com/search?q=';

SearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const searchTerm = formData.get('search') as string;
  if (!searchTerm) return (Err.innerText = 'Please enter a search term');

  Err.innerText = '';

  window.open(searchEngine + searchTerm, '_blank');
  console.log(`opening ${searchEngine + searchTerm}`);
});
