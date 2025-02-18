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
  title: string;
  owner?: number;
  // User: { connect: { email: string } }; // 🔹 Prisma의 연결 방식 적용
  marks: MarkType[];
};
export const createBook = async ({ title, owner, marks = [] }: BookType) => {
  try {
    if (owner) {
      //로그인한 사용자일때만 db에 저장
      await prisma.book.create({
        data: {
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
//TODO:
export const deleteBook = async (id: number) => {};
