// app/layout.tsx
export const metadata = {
  title: "My App",
  description: "A description of my app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
