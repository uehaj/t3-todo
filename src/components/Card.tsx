type Props = {
  children: React.ReactNode;
  actionArea: React.ReactNode;
  className?: string;
};

export default function Card({ children, actionArea, className }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        {children}
        {actionArea}
      </div>
    </div>
  );
}
