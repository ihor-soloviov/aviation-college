import Link from "next/link";
import React from "react";
import { links } from "@/lib/navigation";
import { Socials } from "../common/Footer/Socials";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 dark:bg-blue-900/10">
      <div className="container py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Socials />

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Навігація
            </h4>
            <ul className="space-y-2 text-sm">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Ресурси
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Admissions",
                "Financial Aid",
                "Career Services",
                "Student Life",
                "Alumni Network",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Контакти
            </h4>
            <address className="not-italic">
              <a
                href="https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
              >
                вулиця Олега Антонова, 1
              </a>
              <br />
              <a
                href="https://maps.app.goo.gl/UzDMeywUZNE1dkKv5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
              >
                Кривий Ріг, 50024
              </a>
              <br />
              <a
                href="mailto:pochta@krfk.kai.edu.ua"
                className="mt-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
              >
                pochta@krfk.kai.edu.ua
              </a>
              <br />
              <a
                href="tel:+380678241414"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
              >
                067-824-14-14
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <div className="text-xs text-muted-foreground">
            <span className="font-bold">&copy; {new Date().getFullYear()}</span>{" "}
            <span>
              Криворізький фаховий коледж державного некомерційного підприємства
              «Державний університет «Київський авіаційний інститут»
            </span>
            <span />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
