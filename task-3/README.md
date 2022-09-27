# 3. Key Prop

Review following code snippet and answer questions:

1. What’s wrong with this code snippet?
2. How can we improve it?
3. Are there any cases when this code can be used with no modification?

Example:

```
export interface Book {
  id: string;
  name: string;
}

export const BooksList: FC<{ books: Book[] }> = ({ books }) => {
  return (
    <ul>
      {books.map((book, i) => (
        <li key={i}>{book.name}</li>
      ))}
    </ul>
  );
};
```

Answers:

1. What’s wrong with this code snippet?

- First of all, i would note the use "FC" instead of "JSX.Element". In my opinion, JSX.Element is the safer choice because it guarantees that the component will definitely return JSX.
- I would replace an interface with type. After all, an interface in many programming languages ​​is a contract that guarantees an object executes certain methods. In my preference, structures with fields are better described as a type, and the description of the object's actions through an interface.
- And I don't think that using an arrow function in this case needs "return" so much. It can be removed.
- Also, if possible, it's better to use unique values ​​for the "key prop" instead of an index. The book structure has an id, you can use it.
- I would also like to note about the use of "FC" or "JSX.Element" in components. In most cases, typescript itself will return the required type. You can just write a type of props. But since React version 18, using "FC" or "JSX.Element" is a matter of preference.
- To make component more flexible, I would expect the value of prop "books" can be undefined.

2. How can we improve it?

```
src/types/models/book.ts

export type Book {
  id: string;
  name: string;
}
```

```
src/components/ui/books-list.tsx

import type { Book } from "@/types/models/book.ts"

type BooksListProps = {
  books?: Book[]
}

export const BooksList = ({ books }: BooksListProps) => (
  <ul>
    {books?.map(({ name, id }) => (
      <li key={id}>{book.name}</li>
    ))}
  </ul>
);
```

3. Are there any cases when this code can be used with no modification?

This code may well exist in the project, but if possible, it will better to refactor this component.
