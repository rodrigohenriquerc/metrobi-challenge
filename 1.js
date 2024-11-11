const findDuplicate = (arr) =>
  arr.reduce(
    (acc, item) => {
      if (acc.collected[item] && acc.collected[item].status === "unique") {
        return {
          ...acc,
          collected: { ...acc.collected, [item]: { status: "duplicate" } },
          duplicate: [...acc.duplicate, item],
        };
      }

      if (acc.collected[item] && acc.collected[item].status === "duplicate") {
        return acc;
      }

      return {
        ...acc,
        collected: { ...acc.collected, [item]: { status: "unique" } },
      };
    },
    { collected: {}, duplicate: [] }
  ).duplicate;
