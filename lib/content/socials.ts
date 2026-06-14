import type { SocialLink } from "./types";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/jeetsh4h",
    icon: IconBrandGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeetsh4h",
    icon: IconBrandLinkedin,
  },
  {
    label: "Email",
    href: "mailto:jeetsh4h@gmail.com",
    icon: IconMail,
  },
];
