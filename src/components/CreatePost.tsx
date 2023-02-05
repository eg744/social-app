// User post creation

import { useState } from "react";

export function createPost() {
  // Form  Validated manually
  // If using multiple forms, use https://react-hook-form.com/

  const [text, setText] = useState("");

  return (
    <form>
      <textarea
        onChange={(event) => {
          setText(event.target.value);
        }}
      ></textarea>
    </form>
  );
}
