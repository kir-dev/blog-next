---
layout: post
title: 'Something great!'
lead: 'This is a lead, also known as excerpt'
date: '2019-11-30'
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac.

_Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac._

**Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac.**

## Quote examples

> My Best Friend is a person who will give me a book I have not read.
>
> Abraham Lincoln

## Code examples using `gatsby-remark-vscode` plugin

- Javascript

```js
// Nice little javascript code
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

- Dockerfile

```Dockerfile
# Nice little Dockerfile
RUN echo hello
RUN echo world
```

- Python

```py
# Nice python code
for count, value in enumerate(values):
  print(count, value)
```

- Bash

```shell
yarn add gatsby-remark-vscode plugin
```

- Cpp

```cpp
for (std::vector<int>::iterator ptr = ar.begin(); ptr < ar.end(); ptr++)
  cout << *ptr << " ";
```

- C#

```cs
private delegate void Del(string message);
public Message() {
  get { return message; }
  set { message = value; }
}
```

- Markdown

```md
## Hello there

1. This and that
2. Wow
3. Hello

> Quotes. Yes.
```

## Images & Links

- An image from the internet
  ![cat.jpeg](https://i.imgur.com/RtC6c01.jpeg)
- Link: [GitHub](http://github.com)
