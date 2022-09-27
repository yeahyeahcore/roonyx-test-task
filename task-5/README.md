# 5. Passing Data to Parent Component

Review following code snippet and answer questions:

1. What options do we have to get `open` value in Parent component?
2. What benefits and drawbacks of each method?

```
import React, { FC, useReducer } from "react";

export const Parent: FC = () => {
  return (
    <div>
      <Child>
        {/* How to get `open` value here and work with it? */}
        {/* e.g. open ?? <SomeOtherComponent/> */}
      </Child>
    </div>
  );
};

const Child: FC = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false);

  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
    </div>
  );
};
```

1. What options do we have to get `open` value in Parent component?

First option:

```
src/components/parent

import { Child } from "@/components/child"

export const Parent = () => (
  <div>
    <Child>{(open) => open && <SomeOtherComponent/>}</Child>
  </div>
);

src/components/child

import { useReducer, ReactNode } from "react";

type ChildProps = {
  children?: (open: boolean) => ReactNode;
};

const Child = ({ children }: ChildProps) => {
  const [open, toggleOpen] = useReducer((value) => !value, false);

  return (
    <div>
      {children && children(open)}
      <button onClick={toggleOpen}>Toggle</button>
    </div>
  );
};
```

Second option:

```
src/components/parent

import React, { useReducer } from "react";

import { Child } from "@/components/child"

export const Parent = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false);

  return (
    <div>
      <Child onClick={toggleOpen}>Toggle</Child>
      {open && <SomeOtherComponent/>}
    </div>
  );
}

src/components/child

type ChildProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: string;
};

const Child = ({ onClick, children }: ChildProps) => (
  <div>
    <button onClick={onClick}>{children}</button>
  </div>
);
```

2. What benefits and drawbacks of each method?

First option allows you implement buisness login inside a component.
Second option allows you extends logic of component with dependency injection.
