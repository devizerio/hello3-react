import React from "react";

export type Props = {
  name: string;
};

const SayHello: React.FC<Props> = ({ name }) => (
  <div>Hey {name}, say hello to TypeScript.</div>
);

export default SayHello;
