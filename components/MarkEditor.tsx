import { fetchOG } from '@/actions/fetch';
import { RotateCcw, Save, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export type MarkType = {
  id: number;
  url: string;
  imgUrl: string;
  title: string;
  description: string;
};
type Props = {
  markList: MarkType[];
  setMarkList: (marklist: MarkType[]) => void;
  toggleEditing: () => void;
};

export default function MarkEditor({
  markList,
  setMarkList,
  toggleEditing,
}: Props) {
  const urlRef = useRef<HTMLInputElement>(null);
  // const titleRef = useRef<HTMLInputElement>(null);
  // const imgRef = useRef<HTMLInputElement>(null);
  // const descRef = useRef<HTMLInputElement>(null);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Mark Submit!!!');

    if (!urlRef) {
      return alert('Ref is null');
    }

    //TODO:save눌렀을때 저장되는것 처리
    //setMarkList([...markList, { id: Math.max(...markList.map((mark) => mark.id), 0) + 1, title, imgUrl, description }]);
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Fetch Button clicked!!');

    if (!urlRef) return alert('urlRef is null');

    if (urlRef.current) {
      // urlRef.current!= null && urlRef.current != undefined
      const { title, imgUrl, description } = await fetchOG(
        urlRef.current.value || ' '
      );

      console.log('title', title);
      console.log('description', description);
      console.log('imgUrl', imgUrl);
      console.log('url', urlRef.current.value); //Test용
      //TODO: fetch로 가져온데이터를 입력창에 바로 입력되도록 변경
      setMarkList([
        ...markList,
        {
          id: Math.max(...markList.map((mark) => mark.id), 0) + 1,
          url: urlRef.current.value,
          title,
          imgUrl,
          description,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log('markList updated, MarkEditor rendering..');
  }, [markList]);

  return (
    <form className='flex flex-col gap-12'>
      <div className='flex gap-2 justify-between'>
        <input
          type='text'
          placeholder='저장할 URL을 입력해주세요'
          className='flex-1'
          ref={urlRef}
        />

        <Button onClick={handleClick}>
          <Send />
        </Button>
      </div>
      <div className='flex gap-2 justify-end'>
        <button
          onClick={toggleEditing}
          className='rounded-md bg-neutral-300 p-1'
        >
          <X />
        </button>
        <button type='reset' className='rounded-md bg-neutral-300 p-1'>
          <RotateCcw />
        </button>
        <button
          onClick={formSubmit}
          type='submit'
          className='rounded-md bg-neutral-300 p-1'
        >
          <Save />
        </button>
      </div>
    </form>
  );
}
