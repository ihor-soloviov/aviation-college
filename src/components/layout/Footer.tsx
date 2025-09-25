import React from "react";

import { Socials } from "../common/Footer/Socials";
import { FooterNavigation } from "../common/Footer/FooterNavigation";
import { Contacts } from "../common/Footer/Contacts";
import { Resourses } from "../common/Footer/Resourses";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 dark:bg-blue-900/10">
      <div className="container py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Socials />

          <FooterNavigation />

          <Resourses />

          <Contacts />
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
