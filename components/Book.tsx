import { SquareMinus, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Mark from './Mark';
import MarkEditor from './MarkEditor';

// type BookType = {
//   id: number;
//   name: string;
// };
type Props = {
  id: number;
  name: string;
  // bookList: BookType[];
  // setBookList: (booklist: BookType[]) => void;
  deleteBook: (id: number) => void;
  //editBook: (id: number) => void;
  toggleBook: () => void;
  //saveBookList: (book: BookType) => void;
  // withDel:boolean;
};
type MarkType = {
  id: number;
  url: string;
  imgUrl: string;
  title: string;
  description: string;
};

//TODO: 길어지면 스크롤추가
export default function Book({
  id,
  name,
  // saveBookList,
  toggleBook,
  deleteBook,
}: Props) {
  const [markList, setMarkList] = useState<MarkType[]>([]);

  const [isEditingBook, setEditingBook] = useState(false);
  const [isAddingMark, setAddingMark] = useState(false);

  const editBook = (id: number) => {
    console.log('editBook now..');
    setEditingBook(true);
  };

  const toggleMark = () => setAddingMark((pre) => !pre);

  useEffect(() => {
    console.log('markList updated Book rendering now...');
  }, [markList]);

  return (
    <div className='flex flex-col gap-4 bg-neutral-200 text-black dark:text-gray-700 p-2 rounded-sm shadow-lg'>
      {/* {isEditingBook ? (
        <BookEditor toggleEditing={toggleBook} />
      ) : (
        <p onClick={() => editBook(id)} className='text-center m-2'>
          {id} {name}
        </p>
      )} */}

      {/* /* TODO: 누르면 book name수정 */}
      {/* {isEditingBook ? (
        <BookEditor
          book={{ id, name }}
          // saveBookList={saveBookList}
          toggleBook={toggleBook}
        />
      ) : (
        <p className='text-center m-2' onClick={() => editBook(id)}>
          {name}
        </p>
      )} */}
      <div className='flex ml-auto'>
        <SquareMinus className='cursor-pointer' />
        <SquareX className='cursor-pointer' onClick={() => deleteBook(id)} />
      </div>
      <p
        className='inline-block text-center m-2 text-xl font-bold'
        onClick={() => editBook(id)}
      >
        {name}
      </p>

      {markList.length > 0 ? (
        markList.map((mark) => (
          <Mark
            key={mark.id}
            id={mark.id}
            url={mark.url}
            title={mark.title}
            description={mark.description}
            imgUrl={mark.imgUrl}
          />
        ))
      ) : (
        <p>There is no mark here... (っ °Д °;)っ</p>
      )}

      {isAddingMark ? (
        <MarkEditor
          markList={markList}
          setMarkList={setMarkList}
          toggleEditing={toggleMark}
        />
      ) : (
        <Button onClick={toggleMark}>+ Add Mark</Button>
      )}
    </div>
  );
}
