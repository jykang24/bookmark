'use server';

import prisma from '@/lib/db';

// type UserType = {
//   email: string;
//   nickname: string;
//   passwd?: string;
//   provider: string;
// };
type MarkType = {
  // book: number;
  url: string;
  title: string;
  image: string;
  descript: string;
};
type BookType = {
  id: number;
  title: string;
  owner?: number;
  withdel?: boolean;
  // User: { connect: { email: string } }; // 🔹 Prisma의 연결 방식 적용
  marks: MarkType[];
};
export const serverCreateBook = async ({
  id,
  title,
  owner,
  marks = [],
}: BookType) => {
  try {
    if (owner) {
      //로그인한 사용자일때만 db에 저장
      await prisma.book.create({
        data: {
          id,
          title,
          owner, // 사용자 id를 외래키로 사용, 전달시 user.id 로 줘야함
          Mark: { create: marks },
        },
      });
      console.log('createBook to DB');
    } else {
      console.log('createBook - Not logined user');
    }
  } catch (err) {
    console.log('createBook error', err);
  }
};

export const serverGetBook = async (id: number) => {
  const bookId = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return bookId;
};

export const serverDeleteBook = async (id: number) => {
  try {
    await prisma.book.delete({
      where: {
        id,
      },
    });
    console.log('deleteBook from DB');
    return true;
  } catch (err) {
    console.log('deleteBook error:', err);
    return false;
  }
};
