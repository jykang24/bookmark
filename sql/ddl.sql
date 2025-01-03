create table User(
 id mediumint unsigned not null auto_increment,
 nickname varchar(31) not null comment '이름',
 email varchar(200) not null,
 passwd varchar(128) null,
 primary key (id)
);

create table Book(
id int unsigned not null auto_increment,
title varchar(36) not null comment '북 이름',
withdel boolean not null default 0 comment '방문과 동시에 삭제',
owner mediumint unsigned not null comment '소유자',
primary key (id),
foreign key fk_Book_owner_User (owner)
            references User(id) on delete cascade
);

create table Mark(
id int unsigned not null auto_increment,
book int unsigned not null,
url varchar(1024) not null,
title varchar(255) not null,
image varchar(500) not null,
descript varchar(1000) not null,
primary key (id),
foreign key fk_Mark_book (book)
             references Book(id) on delete cascade
);