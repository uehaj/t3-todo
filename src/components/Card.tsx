type Props = {
  children: React.ReactNode;
  actionArea: React.ReactNode;
};

export default function Card({ children, actionArea }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        {children}
        {actionArea}
      </div>
    </div>
  );
}
