import React from "react";

export type Props = {
  name: string;
};

export const SayHello: React.FC<Props> = ({ name }) => {
  return <div>Hey {name}, say hello to TypeScript.</div>;
};
