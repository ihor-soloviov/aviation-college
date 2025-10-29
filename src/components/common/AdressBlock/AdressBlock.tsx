import { MapPin } from "lucide-react";
import React from "react";
import { address_href } from "@/lib/utils";
const AdressBlock = () => {
  return (
    <div className="rounded-lg bg-white dark:bg-blue-900 p-8 text-center">
      <h3 className="text-xl font-bold mb-4">Поштова адреса</h3>
      <p className="text-lg text-muted-foreground">
        Криворізький фаховий коледж Державного некомерційного підприємства
        <br />
        «Державний університет «Київський авіаційний інститут»
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        <a
          href={address_href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          <span className="font-medium">
            50024 Україна, Дніпропетровська область, м. Кривий Ріг, вул. Олега
            Антонова, 1
          </span>
        </a>
      </div>
    </div>
  );
};

export default AdressBlock;
