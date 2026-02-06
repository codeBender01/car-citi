import Report from "@/svgs/Report";
import Brochure from "@/svgs/Brochure";
import CheckGreen from "@/svgs/CheckGreen";
import SteeringWheel from "@/svgs/SteeringWheel";

export const getServiceOptions = (t: (key: string) => string) => [
  {
    id: 1,
    icon: <CheckGreen />,
    text: t("serviceOptions.verifiedByExperts"),
  },
  {
    id: 2,
    icon: <SteeringWheel />,
    text: t("serviceOptions.scheduleTestDrive"),
  },
  {
    id: 3,
    icon: <Brochure />,
    text: t("serviceOptions.carBrochure"),
  },
  {
    id: 4,
    icon: <Report />,
    text: t("serviceOptions.vinReport"),
  },
];
