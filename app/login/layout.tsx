import '@/app/globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <div>login</div>
    <div>{children}</div>
  </>
  );
}
