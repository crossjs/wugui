import { ICH, IMD, IPO } from "@spax/core";

export default ({ parse }: ICH) => {
  parse.tap("Level", (current: IMD, parent: IMD, option: IPO) => {
    return {
      ...current,
      level: parent.level ? parent.level + 1 : 1,
    };
  });
};
