"use client";

import React, { useState } from "react";
import { GroupTourHero } from "./group-tour-hero";
import { GroupTourForm } from "./group-tour-form";

export function GroupTourClientContent() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    const formElement = document.getElementById("form-tailor-made");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GroupTourHero onSelectTheme={handleSelectTheme} />
      <GroupTourForm selectedTheme={selectedTheme} />
    </>
  );
}
