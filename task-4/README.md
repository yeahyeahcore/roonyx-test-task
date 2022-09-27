# 4. Props Drilling

Review following code snippet and answer questions:

1. What’s wrong with this code snippet?
2. How can we improve it?
3. What benefits and drawbacks of each method?

Code:

```
import React, { FC, useState } from "react";

export const Parent: FC = () => {
  const [count, setCount] = useState(0);
  const [extraA, setExtraA] = useState(1);
  const [extraB, setExtraB] = useState(2);

  return <LayerA count={count} setCount={setCount} extraA={extraA} extraB={extraB} />;
};

/**
 * LAYER A -------------------------------------------------
 */

type LayerAProps = {
  count: number;
  setCount: (value: number) => void;
  extraA: number;
  extraB: number;
};

const LayerA: FC<LayerAProps> = ({ count, setCount, extraA, extraB }) => (
  <div>
    <LayerB count={count} setCount={setCount} extraB={extraB} />
    <div>{extraA}</div>
  </div>
);

/**
 * LAYER B -------------------------------------------------
 */

type LayerBProps = {
  count: number;
  setCount: (value: number) => void;
  extraB: number;
};

const LayerB: FC<LayerBProps> = ({ count, setCount, extraB }) => (
  <div>
    <Child count={count} setCount={setCount} />
    <div>{extraB}</div>
  </div>
);

/**
 * LAST CHILD ----------------------------------------------
 */

type ChildProps = {
  count: number;
  setCount: (value: number) => void;
};

const Child: FC<ChildProps> = ({ count, setCount }) => (
  <>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Inc</button>
  </>
);
```

1. What’s wrong with this code snippet?

- Overengineering. I think, in this case, it makes no sense to create most these components. They can all exist in the one component, as long as no child component is reused.
- If some components can be reused, it's best to avoid creating components only for props anyway.
- "setCount" is best execute based on past state using a callback function. It's just safer to change state of counter.
- Some components can be more flexible accepting useful options in props.
- The extraA/extraB state makes no sense, because the state should be mutable. The function to change these states are never used, which means it's only constant.

2. How can we improve it?

```
import React, { useState } from "react";

import { Button } from "@/components/ui/button"

export const Parent = () => {
  const [count, setCount] = useState(0);

  const onIncrementButtonClick = () => {
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <main>
      <div>
        <p>{count}</p>
        <Button onClick={onIncrementButtonClick} />
        <span>2</span>
      </div>
      <p>1</p>
    </main>
  );
};
```

```
type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ onClick }: ButtonProps) => (
  <button
    onClick={() => setCount(count + 1)}
  >
    Inc
  </button>
);
```

3. What benefits and drawbacks of each method?
