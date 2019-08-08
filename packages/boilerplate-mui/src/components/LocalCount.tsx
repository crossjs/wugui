import { Badge, Button, Container, Typography } from "@material-ui/core";
import { Add, Favorite, Remove } from "@material-ui/icons";
import React, { ReactElement, useState} from "react";

export default function LocalCount({children, ...props}: any): ReactElement<void> {
  const [count, setCount] = useState(0);
  return (
    <>
      <Container className={props.className}>
        <Typography variant="h1">{props.title}</Typography>
        <Button
          color="primary"
          onClick={() => setCount(prevCount => prevCount - 1)}
        ><Remove /></Button>
        <Badge badgeContent={count} max={10} color="primary">
          <Favorite />
        </Badge>
        <Button
          color="primary"
          onClick={() => setCount(prevCount => prevCount + 1)}
        ><Add /></Button>
      </Container>
      {children}
    </>
  );
}