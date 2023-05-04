type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div className="card m-2 flex flex-row rounded-lg p-2 shadow-xl">
      {children}
    </div>
  );
}
