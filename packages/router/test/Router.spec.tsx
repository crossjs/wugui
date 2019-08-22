import { usePathname } from "@spax/history";
import { act, render } from "@testing-library/react";
import { act as actHook, renderHook } from "@testing-library/react-hooks";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { MatchedChildBockOrChildren, Router } from "../src/components";

// tslint:disable: react-hooks-nesting

describe("Router", () => {
  test("no matched!", () => {
    const blocks = [];
    const { container } = render(
      <Router scope="test1" blocks={blocks}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("");
  });

  test("matching exactly", () => {
    const blocks = [
      { level: 1, path: "", pathRE: pathToRegexp(""), pathKeys: [] },
    ];
    const { container } = render(
      <Router scope="test2" blocks={blocks}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
  });

  test("matching ancestor", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father3/child");
    });
    const blocks = [
      {
        level: 1,
        path: "/father3",
        pathRE: pathToRegexp("/father3"),
        pathKeys: [],
      },
    ];
    const { container } = render(
      <Router scope="test3" blocks={blocks}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father3");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/child");
      });
    });
    expect(container.textContent).toBe("");
  });

  test("matching nested", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father4/child");
    });
    const nestedBlocks = [
      {
        level: 1,
        path: "/father4",
        pathRE: pathToRegexp("/father4"),
        pathKeys: [],
        component: (props: any) => (
          <div>
            /father4
            <MatchedChildBockOrChildren {...props} />
          </div>
        ),
        blocks: [
          {
            level: 2,
            path: "/father4/child",
            pathRE: pathToRegexp("/father4/child"),
            pathKeys: [],
            component: (props: any) => "/father4/child",
          },
        ],
      },
    ];
    const { container } = render(
      <Router scope="test4" blocks={nestedBlocks}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father4");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father4/child");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father4/child-no-exists");
      });
    });
    expect(container.textContent).toBe("test");
  });
});
