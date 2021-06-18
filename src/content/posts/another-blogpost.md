---
layout: post
title: 'Something great!'
author: triszt4n
lead: 'This is a lead, also known as excerpt'
date: '2019-11-30'
featuredImage: ../images/posts/docker.jpg
---

# Table test

| Tables   |      Are      |   Cool |
| -------- | :-----------: | -----: |
| col 1 is | left-aligned  | \$1600 |
| col 2 is |   centered    |   \$12 |
| col 3 is | right-aligned |    \$1 |

---

# List test

- List1
  - A
    - a
    - b
    - c
  - B
  - C
- List2

1. List3
2. List4

# Quote test

> My Best Friend is a person who will give me a book I have not read.
>
> -- Abraham Lincoln

# Header test

## Header2

### Header3

#### Header4

##### Header5

###### Header6 - next up: paragraph tests

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate urna in est convallis, in viverra elit accumsan. Donec ac.

_Lorem ipsum dolor sit amet._

**Lorem ipsum dolor sit amet**

# Emoji test

:heart: :ok_hand: :metal: 🚨

# Code test

- Javascript and `inline();` code

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

```bash
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

# Image test

![cat.jpeg](https://i.imgur.com/RtC6c01.jpeg)

# Link test

[GitHub](http://github.com)
