# One Document A Day (ODAD)

See title.

## Templates

**HTML Boilerplate**

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="description" content="odad">
    <meta name="keywords" content="odad">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>add title here</title>
    <style>
      /* add styles here */
    </style>
  </head>

  <body>
    <script type="module">
      import { Context2D } from 'https://unpkg.com/context2d';

      const draw =  ({ ctx, w, h, oscillate, memoize }) => {
        // add code here
      }

      const context2d = new Context2D()
      context2d.draw(draw)
    </script>
  </body>

</html>
```
