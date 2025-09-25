import React from "react";

export const Contacts = () => {
  return (
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
  );
};
