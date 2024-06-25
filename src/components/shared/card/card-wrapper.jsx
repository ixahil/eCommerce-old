import { Card, CardBody, CardFooter, CardHeader } from "./card";

const CardWrapper = ({
  children,
  headerTitle,
  backButtonLabel,
  backButtonHref,
}) => {
  return (
    <Card>
      <CardHeader>{headerTitle}</CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardWrapper;
