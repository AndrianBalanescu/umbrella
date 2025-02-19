<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides both a customizable
[Markdown](https://en.wikipedia.org/wiki/Markdown)-to-[Hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
parser and an extensible Hiccup-to-Markdown converter.

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

## Parser

### Features

The parser itself is not aimed at supporting **all** of Markdown's
quirky syntax features, but restricts itself to a sane subset of
features:

| Feature     | Comments                                                                                            |
|-------------|-----------------------------------------------------------------------------------------------------|
| Heading     | ATX only (`#` line prefix), levels 1-6, then downgrade to paragraph                                 |
| Paragraph   | no support for `\` line breaks                                                                      |
| Blockquote  | Respects newlines                                                                                   |
| Format      | **bold**, _emphasis_, `code`, ~~strikethrough~~ in paragraphs, headings, lists, blockquotes, tables |
| Link        | no support for inline formats in label                                                              |
| Image       | no image links                                                                                      |
| List        | only unordered (`- ` line prefix), no nesting, supports line breaks                                 |
| Table       | no support for column alignment                                                                     |
| Code block  | GFM only (triple backtick prefix), w/ optional language hint                                        |
| Horiz. Rule | only dash supported (e.g. `---`), min 3 chars required                                              |

**Note: Because of MD's line break handling and the fact the parser only
consumes single characters from an iterable without knowledge of further
values, the last heading, paragraph, blockquote, list or table requires
an additional newline.**

### Current issues & limitations

Paragraphs, headings and blockquotes ending with a character involved w/
inline formatting (e.g. `!`, `~`, `*`, `_`) either require an additional
space or 2 empty lines (instead of just one) between the next paragraph.
See [#156](https://github.com/thi-ng/umbrella/issues/156) for details.

Also, these MD features (and probably many more) are currently **not**
supported:

- inline HTML
- nested inline formats (e.g. **bold** inside _italic_)
- inline formats within link labels
- image links
- footnotes
- link references
- nested / ordered / numbered / todo lists

Some of these are considered, though currently not high priority... Pull
requests are welcome, though!

### Other parser features

- **Functional:** parser entirely built using
  [transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
  (specifically those defined in
  [@thi.ng/fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm))
  & function composition. Use the parser in a transducer pipeline to
  easily apply post-processing of the emitted results
- **Declarative:** parsing rules defined declaratively with only minimal
  state/context handling needed
- **No regex:** consumes input character-wise and produces an iterator
  of hiccup-style tree nodes, ready to be used with
  [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom),
  [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
  or the serializer of this package for back conversion to MD
- **Customizable:** supports custom tag factory functions to override
  default behavior / representation of each parsed result element
- **Fast (enough):** parses this markdown file (5.9KB) in ~5ms on MBP2016 / Chrome 71
- **Small:** minified + gzipped ~2.5KB (parser sub-module incl. deps)

### Serializing to HTML

```ts
import { iterator } from "@thi.ng/transducers";
import { serialize } from "@thi.ng/hiccup";

import { parse } from "@thi.ng/hiccup-markdown";

const src = `
# Hello world

[This](http://example.com) is a _test_.

`;

// convert to hiccup tree
[...iterator(parse(), src)]
// [ [ 'h1', ' Hello world ' ],
//   [ 'p',
//     [ 'a', { href: 'http://example.com' }, 'This' ],
//     ' is a ',
//     [ 'em', 'test' ],
//     '. ' ] ]

// or serialize to HTML
serialize(iterator(parse(), src));

// <h1>Hello world</h1><p>
// <a href="http://example.com">This</a> is a <em>test</em>. </p>
```

### Customizing tags

The following interface defines factory functions for all supported
elements. User implementations / overrides can be given to the
`parse()` transducer to customize output.

```ts
interface TagFactories {
    blockquote(children: any[]): any[];
    code(body: string): any[];
    codeblock(lang: string, body: string): any[];
    em(body: string): any[];
    heading(level, children: any[]): any[];
    hr(): any[];
    img(src: string, alt: string): any[];
    li(children: any[]): any[];
    link(href: string, body: string): any[];
    list(type: string, items: any[]): any[];
    paragraph(children: any[]): any[];
    strike(body: string): any[];
    strong(body: string): any[];
    table(rows: any[]): any[];
    td(i: number, children: any[]): any[];
    tr(i: number, cells: any[]): any[];
}
```

Example with custom link elements:

```ts
const tags = {
    link: (href, body) => ["a.link.blue", { href }, body]
};

serialize(iterator(parse(tags), src));

// <h1>Hello world</h1>
// <p><a href="http://example.com" class="link blue">This</a> is a <em>test</em>. </p>
```

## Serializer (Hiccup to Markdown)

For the reverse operation, the `serialize()` function can be used to
convert an hiccup component tree into Markdown. Currently supports most
standard (applicable) Markdown features:

### Features

- ATX-style headings (level 1-6)
- Paragraphs
- Forced line breaks
- Inline styles: strong, italic, code
- Images (w/ optional alt attrib)
- Links, image links
- Code blocks w/ language hint (GFM output)
- Tables
- Blockquotes
- Nested lists (ordered & unordered)
- Horizontal rule / separator
- Inline HTML

Not (yet) supported:

- Nested blockquotes
- Link refs
- Wordwrapped output

### Behaviors

- Unless needed for serialization, all other hiccup element attribs are
  ignored
- Code blocks are always output in GFM flavor w/ optional language hint
  (via `lang` attrib)
- Images use the optional `alt` attrib as label
- Forced line breaks are realized via `["br"]` elements in the hiccup
  tree
- Headings, blockquotes, list items and link labels can contain inline
  formatting

Also, other element types can be supported by adding a new tag specific
implementation to the exported `serializeElement`
[multi-method](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).
See source code for reference.

### Usage examples

```ts
import { serialize } from "@thi.ng/hiccup-markdown";

// list component
// the 1st arg is the optional user context object
// passed to `serialize()` (ignored here)
// the 2nd arg is the list tag (ul/ol)
// rest args are converted to list items
const list = (_, type, ...xs) =>
    [type, ...xs.map((x) => Array.isArray(x) ? x : ["li", x])];

// code block component w/ lang hint
const codeblock = (_, lang, body) =>
    ["pre", { lang }, ["code", body]];

// link component for thi.ng URLs
const thingLink = (_, id, label) =>
    ["a", { href: `http://thi.ng/${id}` }, label];

// Note: the same hiccup tree can be serialized to HTML via @thi.ng/hiccup or
// used interactively in the browser w/ @thi.ng/hdom
serialize(
    ["div",
        ["h1", "Hello Markdown"],
        ["p",
            "This is a test: ",
            ["strong", "I am strong and ", ["em", "italic"]],
            "..."],
        // anon component fn to demo context lookup
        [(ctx) => ["p", `My magic number is: ${ctx.magic}`]],
        // codeblock w/ language hint
        [codeblock, "ts",
            `import { serialize } from "@thi.ng/hiccup-markdown";`],
        // nested lists
        [list, "ul",
            "foo",
            "bar",
            [list, "ol", "b1", "b2", "b3"],
            "baz"],
        ["blockquote",
            "So long and thanks for all the fish."],
        ["table",
            ["caption", ["em", "Table #1"]],
            ["thead",
                ["tr", ["th", "ID"], ["th", "Name"]]],
            ["tbody",
                ["tr", ["td", 1], ["td", "Alice B. Charles"]],
                ["tr", ["td", 2], ["td", "Bart Simpson"]]]],
        ["p",
            "More info ",
            [thingLink, "hiccup-markdown", "here"], "."]],
    // optional context object passed to all component functions
    { magic: 42 }
)
```

Resulting Markdown:

(Note: the GFM codeblock fences are only shown escaped here to avoid GH
layout breakage)

```md
# Hello Markdown

This is a test: **I am strong and _italic_**...

My magic number is: 42

\`\`\`ts
import { serialize } from "@thi.ng/hiccup-markdown";
\`\`\`

- foo
- bar
    1. b1
    2. b2
    3. b3
- baz

> So long and thanks for all the fish.

| **ID**  | **Name**         |
| ------- | ---------------- |
| 1       | Alice B. Charles |
| 2       | Bart Simpson     |

_Table #1_

More info [here](http://thi.ng/hiccup-markdown).
```

Realized result:

---

# Hello Markdown <!-- NOTOC -->

This is a test: **I am strong and _italic_**...

My magic number is: 42

```ts
import { serialize } from "@thi.ng/hiccup-markdown";
```

- foo
- bar
    1. b1
    2. b2
    3. b3
- baz

> So long and thanks for all the fish.

| **ID**  | **Name**         |
| ------- | ---------------- |
| 1       | Alice B. Charles |
| 2       | Bart Simpson     |

_Table #1_

More info [here](http://thi.ng/hiccup-markdown).

---

<!-- include ../../assets/tpl/footer.md -->
