export default function ({ initialStateScript, children }) {
  return (
    <html>
      <body>
        {initialStateScript}
        {children}
      </body>
    </html>
  );
}
