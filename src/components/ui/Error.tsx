import React from "react";

export default function Error({ message }: { message: string }) {
  return <div className="error">{message}</div>;
}
