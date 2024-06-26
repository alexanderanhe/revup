import { Montserrat, Lusitana, Jersey_10, Poppins } from "next/font/google";

export const monserrat = Montserrat({ subsets: ["latin"] });
export const poppins = Poppins({
  style: "normal",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});
export const lusitana = Lusitana({
  style: "normal",
  weight: "400",
  subsets: ["latin"]
});
export const jersey10 = Jersey_10({
  style: "normal",
  weight: "400",
  subsets: ["latin"]
});