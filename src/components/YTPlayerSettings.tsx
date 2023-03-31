import { z } from "zod";
import Form from "@components/Form";
import styles from "./Settings.module.css";

export default function YTSettings() {
  return <></>;
}

const FormSchema = z.object({
  "playlist id": z.string().describe(`Playlist ID`),
});

// PLT6yxVwBEbi22rbp2Mve4yEJVpSJFcC9g
// PLcMLmU-CYwGdOF5632N3feUuFeMcexytk
// PLBsP89CPrMeOpKhXiKyXg8AjiConuTXvI
// PLflqtq8EOGAJjAm4Y1E-GtCkWVSPlZ1gf
// PLYeOyMz9C9kZVnxBFqsYdh0PAs_kNR7mn
// PLYeOyMz9C9kaI5rZupjsj3d4Dkiky3y-e

const id1 = "PLT6yxVwBEbi22rbp2Mve4yEJVpSJFcC9g";
const id2 = "PLcMLmU-CYwGdOF5632N3feUuFeMcexytk";
const id3 = "PLBsP89CPrMeOpKhXiKyXg8AjiConuTXvI";
const id4 = "PLflqtq8EOGAJjAm4Y1E-GtCkWVSPlZ1gf";
const id5 = "PLYeOyMz9C9kZVnxBFqsYdh0PAs_kNR7mn";
const id6 = "PLYeOyMz9C9kaI5rZupjsj3d4Dkiky3y-e";

const regexPattern = /^PL.{32}$/;

console.log(regexPattern.test(id1)); // true
console.log(regexPattern.test(id2)); // false
console.log(regexPattern.test(id3)); // true
console.log(regexPattern.test(id4)); // true
console.log(regexPattern.test(id5)); // true
console.log(regexPattern.test(id6)); // true
