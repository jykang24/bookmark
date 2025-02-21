import { FormEvent, useRef } from 'react';

type BookType = {
  id: number;
  name: string;
  //   editBook?: (id: number) => void;
  //   toggleMark?: () => void;
  // withDel:boolean; //TODO:
};
type Props = {
  book: BookType | null;
  saveBookList: (book: BookType) => void;
  toggleBook: () => void;
};

export default function BookEditor({ saveBookList, book, toggleBook }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const BOOK_ID = book?.id || 0; //book있으면 id,없으면 0

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputRef) {
      alert('inputRef is null');
      return;
    }
    if (!inputRef.current?.value) {
      inputRef.current?.focus();
      return alert('please enter book name');
    }
    saveBookList({ id: BOOK_ID, name: inputRef.current.value });
    console.log('Book editor submit now!!');
    toggleBook(); //save버튼 눌러서 submit하면 toggle
  };

  return (
    <form
      id='container'
      className='flex flex-col gap-4 p-2 bg-slate-200 rounded-sm'
    >
      <p className='text-center'>Book Editor</p>

      <input
        ref={inputRef}
        type='text'
        placeholder='New Book...'
        className='rounded-sm'
      />
      <div className='flex gap-2'>
        <input type='checkbox' id='withdel' />
        <label htmlFor='withdel' className=''>
          이동시 자동 삭제
        </label>
      </div>
      <div className='flex justify-around'>
        <button onClick={toggleBook} className='rounded-md bg-green-200 p-1'>
          Close
        </button>
        <button
          type='submit'
          onClick={formSubmit}
          className='rounded-md bg-blue-200 p-1'
        >
          Save
        </button>
      </div>
    </form>
  );
}
