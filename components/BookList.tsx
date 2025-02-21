'use client';

import { serverCreateBook, serverDeleteBook } from '@/actions/db';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Book from './Book';
import BookEditor from './BookEditor';

type BookType = {
  id: number;
  name: string;
  // withDel:boolean;
};

export default function BookList() {
  const [book, setBook] = useState<BookType | null>(null);
  const [bookList, setBookList] = useState<BookType[]>([]); //books상태관리?
  const [isAddingBook, setAddingBook] = useState(false);

  const addBook = () => {
    setAddingBook(true);
  };
  const toggleBook = () => setAddingBook((pre) => !pre);

  // const editBook = (book: BookType) => {//TODO: book수정하기
  //   toggleBook();
  //   setBook(book);
  // };
  const deleteBook = async (id: number) => {
    const isDeleting = confirm('현재 book폴더를 삭제할까요?');
    if (isDeleting) {
      setBookList(bookList.filter((book) => book.id !== id));
      try {
        //TODO: get book id
        //await serverDeleteBook(BookIDfromDB);

        alert('book폴더를 삭제했습니다');
      } catch (err) {
        throw new Error('Book폴더 삭제실패');
      }
    }
  };

  const saveBookList = async ({ id, name }: { id: number; name: string }) => {
    const isEditing = id;
    if (isEditing != 0) {
      //edit모드
      console.log('Edit book, bookList edit>>', bookList);
      setBookList(
        bookList.map((book) => (book.id === id ? { id, name } : book))
      );
    } else {
      //add모드
      console.log('Add book now...', bookList);
      // const bookId = Date.now(); //book db에 id로 넣을수없는 값임
      const timestamp = Date.now().toString().slice(-8); // 마지막 8자리만 사용
      const random = Math.floor(Math.random() * 90) + 10; // 10~99 사이의 난수 추가
      const bookId = Number(timestamp + random); // 10자리 숫자로 변환

      setBookList([
        ...bookList,
        { id: bookId, name }, //newBook
      ]);
      //TODO: owner는 사용자의 db의 id여야함
      //get user id from db
      await serverCreateBook({ id: bookId, title: name, owner: 1, marks: [] });
    }
  };

  useEffect(() => {
    console.log('updated BookList, rendering page now...', bookList);
  }, [bookList]);

  return (
    <main className='flex gap-8 row-start-2 items-center sm:items-start'>
      {bookList.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          name={book.name}
          // saveBookList={saveBookList}
          toggleBook={toggleBook}
          deleteBook={deleteBook}
        />
      ))}

      {isAddingBook ? (
        <BookEditor
          book={book}
          saveBookList={saveBookList}
          toggleBook={toggleBook}
        />
      ) : (
        <Button onClick={addBook}>+ Add Book ({bookList.length})</Button>
      )}
    </main>
  );
}
