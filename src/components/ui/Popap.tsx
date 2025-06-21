import Image from "next/image";
import React from "react";

export default function Popap({ cloas }: { cloas: () => void }) {
  return (
    <div className="popap">
      <Image
        src="/icons/check-icon.png"
        alt="check-icon"
        width={100}
        height={100}
      />
      <button onClick={cloas}>закрыть</button>
    </div>
  );
}
