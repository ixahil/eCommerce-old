const ProductCard = ({ children }) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl border">{children}</div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

const CardBody = ({ children }) => {
  return <div className="p-8 space-y-4">{children}</div>;
};

const Title = ({ children }) => {
  return <h2 className="flex gap-4 items-center">{children}</h2>;
};

const Content = ({ children }) => {
  return <div>{children}</div>;
};

const Footer = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

const Badges = ({ children }) => {
  return <div className="flex justify-end gap-2 text-xs px-4">{children}</div>;
};

const Actions = ({ children }) => {
  return <div className="flex border-t-2 border-accent">{children}</div>;
};

const Price = ({ children }) => {
  return children;
};

export {
  ProductCard,
  CardBody,
  CardHeader,
  Title,
  Content,
  Footer,
  Actions,
  Badges,
  Price,
};
