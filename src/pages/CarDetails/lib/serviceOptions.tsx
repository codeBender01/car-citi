import CheckGreen from "@/svgs/CheckGreen";

export const getServiceOptions = (
  t: (key: string) => string,
  verifiedStatus?: string,
) => {
  const options = [];

  if (verifiedStatus === "verified") {
    options.push({
      id: 1,
      icon: <CheckGreen />,
      text: t("serviceOptions.verifiedByExperts"),
    });
  }

  return options;
};
