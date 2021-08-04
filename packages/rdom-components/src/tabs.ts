import type { Fn, Fn4 } from "@thi.ng/api";
import { Attribs, div, section } from "@thi.ng/hiccup-html";
import { $list, $switch, ComponentLike } from "@thi.ng/rdom";
import type { ISubscription } from "@thi.ng/rstream";
import { dedupe, map, range } from "@thi.ng/transducers";

export interface TabOpts {
    attribs?: Partial<{
        wrapper: Partial<Attribs>;
        tab: Partial<Attribs>;
        content: Partial<Attribs>;
    }>;
    head: Fn4<
        ISubscription<number, number>,
        string,
        number,
        boolean,
        ComponentLike
    >;
    sections: {
        title: string;
        content: Fn<number, Promise<ComponentLike>>;
    }[];
}

export const tabs = (src: ISubscription<number, number>, opts: TabOpts) => {
    const { attribs, head, sections } = <TabOpts>{ attribs: {}, ...opts };
    return div(
        attribs!.wrapper,
        $list(
            src.map((id) => [
                ...map((i) => <const>[i, i === id], range(sections.length)),
            ]),
            "div",
            attribs!.tab,
            ([i, sel]) => head(src, sections[i].title, i, sel)
        ),
        $switch<number>(
            src.transform(dedupe()),
            (x) => x,
            sections.reduce((acc, { content }, i) => {
                acc[i] = async (i) =>
                    section(attribs!.content, await content(i));
                return acc;
            }, <Record<number, Fn<number, Promise<ComponentLike>>>>{})
        )
    );
};
